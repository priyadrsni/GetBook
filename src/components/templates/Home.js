import Hero from "../organisms/Hero";
import Filter from "../organisms/Filter";
import Genres from "../organisms/Genres";
import { Component } from "react";
import {
  fetchBestSellers,
  fetchBestSellersByGenreAndDate,
  fetchAllBestSellersByDate,
} from "../../services/BookService";
import { connect } from 'react-redux';
import { setBestSellers, setBestSellerOptions, setBestSellersByDate, setBooksToBeDisplayed } from "../../redux/bestSellersSlice";
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
      this.getBooksBasedOnFilter(this.props.bestSellers);
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

  filterBooks = (arrayToFilter) => {
    const { category, categoryValue } = this.state.filters;

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
    const { setBestSellersByDate, setBooksToBeDisplayed} = this.props;

    if (genre !== "All") {
      fetchBestSellersByGenreAndDate(
        date,
        genre.toLowerCase().split(" ").join("-")
      ).then((result) => {
        setBestSellersByDate([result]);
        if (this.isCategoryAndValuePresent()) {
          const booksToBeDisplayedByDate = this.filterBooks([result]);
          setBooksToBeDisplayed(booksToBeDisplayedByDate);
        } else {
          setBooksToBeDisplayed([result]);
        }
      });
    } else if (date !== "current") {
      fetchAllBestSellersByDate(date).then((result) => {
        if (this.isCategoryAndValuePresent()) {
          const booksToBeDisplayed = this.filterBooks(result);
          setBooksToBeDisplayed(booksToBeDisplayed);
        } else {
          setBooksToBeDisplayed(result);
        }
      });
    } else {
      if (this.isCategoryAndValuePresent()) {
        const booksToBeDisplayed = this.filterBooks(bestSellers);
        setBooksToBeDisplayed(booksToBeDisplayed);
      } else {
        setBooksToBeDisplayed(bestSellers);
      }
    }
  };

  fetchData = () => {
    //  true
    const { setBestSellers, setBestSellerOptions, setBooksToBeDisplayed } = this.props;
    fetchBestSellers().then((data) => {
      setBestSellers(data);
      setBestSellerOptions(data);
      setBooksToBeDisplayed(data);
    });
  };

  render() {
    return (
      <>
        <Hero
          setSelectedSearchPair={this.setCategoryAndSearchValue}
        />
        <Filter
          setGenreAndDate={this.setGenreAndDate}
        />
        <Genres />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { bestSellers } = state;
  return {
    bestSellers: bestSellers.bestSellers,
    bestSellerOptions: bestSellers.bestSellerOptions,
    bestSellersByDate: bestSellers.bestSellersByDate,
    booksToBeDisplayed: bestSellers.booksToBeDisplayed
  };
}

const mapDispatchToProps = () => ({ 
  setBestSellers,
  setBestSellerOptions,
  setBestSellersByDate,
  setBooksToBeDisplayed
}); 

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(Home);
