import Hero from "../organisms/Hero";
import Filter from "../organisms/Filter";
import Genres from "../organisms/Genres";
import axios from "axios";
import { Component } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: {
        category: "",
        categoryValue: "",
        genre: "All",
        date: "current",
      },
      bestSellers: [],
      bestSellerOptions: [],
      bestSellersByDate: [],
      booksToBeDisplayed: [],
    };
  }

  setCategoryAndSearchValue = (category, categoryValue) => {
    this.setState({
      ...this.state,
      filterBy: {
        ...this.state.filterBy,
        category: category,
        categoryValue: categoryValue,
      },
    });
  };

  setGenreAndDate = (genre, date) => {
    this.setState({
      ...this.state,
      filterBy: {
        ...this.state.filterBy,
        genre: genre,
        date: date,
      },
    });
  };

  setBooksToBeDisplayed = (newItems) => {
    console.log(newItems)
    this.setState(prevState => ({ ...prevState, booksToBeDisplayed: newItems }));
  };

  fetchOverviewLists = async () => {
    const res = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/overview.json`,
      {
        params: {
          "api-key": API_KEY,
        },
      }
    );
    this.setState({
      ...this.state,
      bestSellers: res.data.results.lists,
      bestSellerOptions: res.data.results.lists,
    });
  };

  getBestSellersByDate = async () => {
    const { genre, date } = this.state.filterBy;
    const currentGenre = genre === "All" ? "Hardcover fiction" : genre;
    const res = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/${date}/${currentGenre
        .toLowerCase()
        .split(" ")
        .join("-")}.json`,
      {
        params: {
          "api-key": API_KEY,
        },
      }
    );
    this.setState({ ...this.state, bestSellersByDate: [res.data.results] });
  };

  updateByGenre = (data) => {
    const { genre, date } = this.state.filterBy;
    let newArray = [];
    if (genre !== "All") {
      if(!(date === "current")) {
        console.log(data);
        this.setBooksToBeDisplayed(data);
      }
      else {
        newArray = data.filter(
          (item) => genre.toLowerCase() === item.list_name.toLowerCase()
        );
      }
      this.setBooksToBeDisplayed(newArray);
    }
  };

  filterByCategoryAndValue = () => {
    const { bestSellers, booksToBeDisplayed, bestSellersByDate } = this.state;
    const { category, categoryValue, date } = this.state.filterBy;

    if (
      !(category === "" && categoryValue === "") &&
      !(category === "all" && categoryValue === "all") &&
      !(date === "current")
    ) {
      const newArray = bestSellersByDate.map((option) => {
        return {
          ...option,
          books: option.books.filter(
            (item) =>
              item[category.toLowerCase()].toLowerCase() ===
              categoryValue.toLowerCase()
          ),
        };
      });
      this.setState((prevState) => ({
        ...prevState,
        booksToBeDisplayed: newArray,
      }));
      this.updateByGenre(booksToBeDisplayed);
    } else if (
      !(category === "" && categoryValue === "") &&
      !(category === "all" && categoryValue === "all")
    ) {
      const newArray = bestSellers.map((option) => {
        return {
          ...option,
          books: option.books.filter(
            (item) =>
              item[category.toLowerCase()].toLowerCase() ===
              categoryValue.toLowerCase()
          ),
        };
      });
      this.setState((prevState) => ({
        ...prevState,
        booksToBeDisplayed: newArray,
      }));
      this.updateByGenre(booksToBeDisplayed);
    } else if (!(date === "current")) {
      console.log("date ....")
      this.setState((prevState) => ({
        ...prevState,
        booksToBeDisplayed: [...bestSellersByDate],
      }));
      this.updateByGenre(bestSellersByDate);
    } else {
      this.setState((prevState) => ({
        ...prevState,
        booksToBeDisplayed: bestSellers,
      }));
      this.updateByGenre(bestSellers);
    }
  };

  fetchData = async () => {
    await this.fetchOverviewLists();
    await this.getBestSellersByDate();
    this.filterByCategoryAndValue();
  };

  fetchByDate = async () => {
    await this.getBestSellersByDate();
    this.filterByCategoryAndValue();
  };

  componentDidUpdate(prevProps, prevState) {
    const { category, categoryValue, genre, date } = this.state.filterBy;
    if (date !== prevState.filterBy.date) {
      this.fetchByDate();
    }
    if (
      category !== prevState.filterBy.category ||
      categoryValue !== prevState.filterBy.categoryValue
    ) {
      this.filterByCategoryAndValue();
    }
    if (genre !== prevState.filterBy.genre) {
      this.fetchByDate().then((res) => console.log(res));
    }
  }

  componentDidMount() {
    this.fetchData().then((res) => console.log(res));
  }

  render() {
    const { bestSellerOptions, booksToBeDisplayed } = this.state;
    return (
      <>
        <Hero
          bestSellerOptions={bestSellerOptions}
          setSelectedSearchPair={this.setCategoryAndSearchValue}
        />
        <Filter
          bestSellerOptions={bestSellerOptions}
          setGenreAndDate={this.setGenreAndDate}
        />
        <Genres booksToBeDisplayed={booksToBeDisplayed} />
      </>
    );
  }
}

export default Home;
