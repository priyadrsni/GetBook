import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../atoms/Cards";
import {
  setBestSellersByDate,
  setBooksToBeDisplayed,
} from "../../redux/bestSellersSlice";
import { toggleLoader } from "../../redux/loaderSlice";
import {
  fetchBestSellersByGenreAndDate,
  fetchAllBestSellersByDate,
} from "../../services/BookService";
import Loader from "../atoms/Loader";

const Genres = () => {
  const { filters, books, loader } = useSelector((state) => state);
  const { bestSellers, booksToBeDisplayed } = books;
  const { category, categoryValue, genre, date } = filters;
  const { isLoading } = loader;
  const dispatch = useDispatch();

  const filterBooks = (arrayToFilter) => {
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

  const isCategoryAndValuePresent = () => {
    return (
      !["all", ""].includes(category) && !["all", ""].includes(categoryValue)
    );
  };

  const getBooksBasedOnFilter = (bestSellers) => {
    dispatch(toggleLoader());
    if (genre !== "All") {
      fetchBestSellersByGenreAndDate(
        date,
        genre.toLowerCase().split(" ").join("-")
      ).then((result) => {
        dispatch(toggleLoader());
        dispatch(setBestSellersByDate([result]));
        if (isCategoryAndValuePresent()) {
          const booksToBeDisplayedByDate = filterBooks([result]);
          dispatch(setBooksToBeDisplayed(booksToBeDisplayedByDate));
        } else {
          dispatch(setBooksToBeDisplayed([result]));
        }
      });
    } else if (date !== "current") {
      fetchAllBestSellersByDate(date).then((result) => {
        dispatch(toggleLoader());

        if (isCategoryAndValuePresent()) {
          const booksToBeDisplayed = filterBooks(result);
          dispatch(setBooksToBeDisplayed(booksToBeDisplayed));
        } else {
          dispatch(setBooksToBeDisplayed(result));
        }
      });
    } else {
      dispatch(toggleLoader());
      if (isCategoryAndValuePresent()) {
        const booksToBeDisplayed = filterBooks(bestSellers);
        dispatch(setBooksToBeDisplayed(booksToBeDisplayed));
      } else {
        dispatch(setBooksToBeDisplayed(bestSellers));
      }
    }
  };

  useEffect(() => {
    getBooksBasedOnFilter(bestSellers);
  }, [category, categoryValue, genre, date]);

  return (
    <section className="genres">
      {isLoading ? (
        <Loader />
      ) : booksToBeDisplayed.length !== 0 &&
        booksToBeDisplayed[0].books.length !== 0 ? (
        booksToBeDisplayed.map((genre, index) => {
          const { list_name, books } = genre;
          return (
            books.length !== 0 && (
              <div className="genre" key={index}>
                <div className="genre-heading is-sticky">
                  <h2>{list_name}</h2>
                </div>
                <Cards books={books} />
              </div>
            )
          );
        })
      ) : (
        <div className="genre">
          <p className="no-books">No results</p>
        </div>
      )}
    </section>
  );
};

export default Genres;
