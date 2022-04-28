import Hero from "../organisms/Hero";
import Filter from "../organisms/Filter";
import Genres from "../organisms/Genres";
import { Component } from "react";
import { fetchBestSellers } from "../../services/BookService";
import { connect } from "react-redux";
import {
  setBestSellers,
  setBestSellerOptions,
  setBestSellersByDate,
  setBooksToBeDisplayed,
} from "../../redux/bestSellersSlice";
import { toggleLoader } from "../../redux/loaderSlice";

class Home extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    //  true
    const {
      setBestSellers,
      setBestSellerOptions,
      setBooksToBeDisplayed,
      toggleLoader,
    } = this.props;
    toggleLoader();
    fetchBestSellers().then((data) => {
      toggleLoader();
      setBestSellers(data);
      setBestSellerOptions(data);
      setBooksToBeDisplayed(data);
    });
  };

  render() {
    return (
      <>
        <Hero />
        <Filter />
        <Genres />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { books, filters } = state;
  return {
    books,
    filters,
  };
};

const mapDispatchToProps = () => ({
  setBestSellers,
  setBestSellerOptions,
  setBestSellersByDate,
  setBooksToBeDisplayed,
  toggleLoader,
});

export default connect(mapStateToProps, mapDispatchToProps())(Home);
