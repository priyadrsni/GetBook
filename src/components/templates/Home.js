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
      filters: {
        category: "all",
        categoryValue: "all",
        genre: "All",
        date: "current",
      },
      bestSellers: [],
      bestSellerOptions: [],
      bestSellersByDate: [],
      booksToBeDisplayed: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { category, categoryValue, genre, date } = this.state.filters;
    if (
      date !== prevState.filters.date ||
      category !== prevState.filters.category ||
      categoryValue !== prevState.filters.categoryValue ||
      genre !== prevState.filters.genre
    ) {
      this.applyFilter();
    }
  }

  setCategoryAndSearchValue = (category, categoryValue) => {
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        category: category,
        categoryValue: categoryValue,
      },
    });
  };

  setGenreAndDate = (genre, date) => {
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        genre: genre,
        date: date,
      },
    });
  };

  setBooksToBeDisplayed = (newItems) => {
    console.log("3");
    console.log(newItems);
    this.setState((prevState) => ({
      ...prevState,
      booksToBeDisplayed: newItems,
    }));
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

    return {
      bestSellers: res.data.results.lists,
      bestSellerOptions: res.data.results.lists,
    };
  };

  getBestSellersByDate = async () => {
    const { genre, date } = this.state.filters;
    const res = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/${date}/${genre
        .toLowerCase()
        .split(" ")
        .join("-")}.json`,
      {
        params: {
          "api-key": API_KEY,
        },
      }
    );
    return [res.data.results];
  };

  getBooks = (bestSellers) => {
    const { category, categoryValue } = this.state.filters;

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
    return newArray;
  };

  getBooksByDate = (bestSellersByDate) => {
    const { category, categoryValue } = this.state.filters;

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
    return newArray;
  };

  getBooksBasedOnFilter = async (bestSellers) => {
    const { category, categoryValue, genre } = this.state.filters;

    let data = {};
    if (genre === "All") {
      if (
        !["all", ""].includes(category) &&
        !["all", ""].includes(categoryValue)
      ) {
        const booksToBeDisplayed = this.getBooks(bestSellers);
        data.booksToBeDisplayed = booksToBeDisplayed;
      } else {
        data.booksToBeDisplayed = bestSellers;
      }
    } else {
      const bestSellersByDate = await this.getBestSellersByDate();
      data.bestSellersByDate = bestSellersByDate;
      if (
        !["all", ""].includes(category) &&
        !["all", ""].includes(categoryValue)
      ) {
        const booksToBeDisplayedByDate = this.getBooksByDate(bestSellersByDate);
        data.booksToBeDisplayed = booksToBeDisplayedByDate;
      } else {
        data.booksToBeDisplayed = bestSellersByDate;
      }
    }
    return data;
  };

  fetchData = async () => {
    const overiewLists = await this.fetchOverviewLists();
    const data = await this.getBooksBasedOnFilter(overiewLists.bestSellers);
    this.setState((prevState) => ({
      ...prevState,
      ...overiewLists,
      ...data,
    }));
  };

  applyFilter = async () => {
    const data = await this.getBooksBasedOnFilter(this.state.bestSellers);
    this.setState((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

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
