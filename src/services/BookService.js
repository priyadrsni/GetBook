import {
  GET_BEST_SELLERS,
  GET_BEST_SELLERS_BY_GENRE_AND_DATE,
  GET_BEST_SELLERS_BY_DATE,
  GET_REVIEWS,
} from "../constants/API";

const API_KEY = process.env.REACT_APP_API_KEY;

const fetchBestSellers = () => {
  return fetch(GET_BEST_SELLERS.replace("{api-key}", API_KEY))
    .then((res) => res.json())
    .then((data) => data.results.lists);
};

const fetchBestSellersByGenreAndDate = (date, genre) => {
  return fetch(
    GET_BEST_SELLERS_BY_GENRE_AND_DATE.replace("{api-key}", API_KEY)
      .replace("{genre}", genre)
      .replace("{date}", date)
  )
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((error) => {
      console.log("No data for thi url");
    });
};

const fetchAllBestSellersByDate = (date) => {
  return fetch(
    GET_BEST_SELLERS_BY_DATE.replace("{api-key}", API_KEY).replace(
      "{date}",
      date
    )
  )
    .then((res) => res.json())
    .then((data) => data.results.lists)
    .catch((error) => {
      console.log("No data for thi url");
    });
};

const fetchReviews = (isbn) => {
  return fetch(
    GET_REVIEWS.replace("{api-key}", API_KEY).replace("{isbn}", isbn)
  )
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((error) => {
      console.log("No data for thi url");
    });
};

export {
  fetchBestSellers,
  fetchBestSellersByGenreAndDate,
  fetchAllBestSellersByDate,
  fetchReviews,
};
