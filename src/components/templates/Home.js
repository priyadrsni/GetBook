import Hero from "../organisms/Hero";
import Filter from "../organisms/Filter";
import Genres from "../organisms/Genres";
import { Component } from "react";
import {
  fetchBestSellers,
  fetchBestSellersByGenreAndDate,
  fetchAllBestSellersByDate,
} from "../../services/BookService";
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
    const { filters } = this.state;
    const { category, categoryValue, genre, date } = filters;
    if (
      date !== prevState.filters.date ||
      category !== prevState.filters.category ||
      categoryValue !== prevState.filters.categoryValue ||
      genre !== prevState.filters.genre
    ) {
      this.getBooksBasedOnFilter(this.state.bestSellers);
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

  setBooksToBeDisplayed = (newBooks) => {
    this.setState((prevState) => ({
      ...prevState,
      booksToBeDisplayed: newBooks,
    }));
  };

  filterBooks = (arrayToFilter) => {
    const { category, categoryValue } = this.state.filters;

    console.log(arrayToFilter);

    const newArray = arrayToFilter.map((option) => {
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

  isCategoryAndValuePresent = () => {
    return (
      !["all", ""].includes(this.state.filters.category) &&
      !["all", ""].includes(this.state.filters.categoryValue)
    );
  };

  getBooksBasedOnFilter = (bestSellers) => {
    const { filters } = this.state;
    const { genre, date } = filters;

    if (genre !== "All") {
      fetchBestSellersByGenreAndDate(
        date,
        genre.toLowerCase().split(" ").join("-")
      ).then((result) => {
        this.setState({ bestSellersByDate: [result] });
        if (this.isCategoryAndValuePresent()) {
          const booksToBeDisplayedByDate = this.filterBooks([result]);
          this.setState({ booksToBeDisplayed: booksToBeDisplayedByDate });
        } else {
          this.setState({ booksToBeDisplayed: [result] });
        }
      });
    } else if (date !== "current") {
      fetchAllBestSellersByDate(date).then((result) => {
        if (this.isCategoryAndValuePresent()) {
          const booksToBeDisplayed = this.filterBooks(result);
          this.setState({ booksToBeDisplayed: booksToBeDisplayed });
        } else {
          this.setState({ booksToBeDisplayed: result });
        }
      });
    } else {
      if (this.isCategoryAndValuePresent()) {
        const booksToBeDisplayed = this.filterBooks(bestSellers);
        this.setState({ booksToBeDisplayed: booksToBeDisplayed });
      } else {
        this.setState({ booksToBeDisplayed: bestSellers });
      }
    }
  };

  fetchData = () => {
    //  tru
    fetchBestSellers().then((data) => {
      this.setState({
        bestSellers: data,
        bestSellerOptions: data,
        booksToBeDisplayed: data,
        // fa
      });
    });
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
