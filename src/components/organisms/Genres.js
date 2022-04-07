import axios from "axios";
import { useState, useEffect } from "react";
import Cards from "../atoms/Cards";

const API_KEY = process.env.REACT_APP_API_KEY;

const Genres = ({ genre, selectedDate, bestSellers }) => {
  const [items, setItems] = useState([]);

  const isSticky = (e) => {
    const genreHeading = document.querySelectorAll(".genre-heading");
    genreHeading.forEach((item) => {
      const scrollTop = window.scrollY;
      scrollTop >= item.getBoundingClientRect().top
        ? item.classList.add("is-sticky")
        : item.classList.remove("is-sticky");
    });
  };

  const updateBestSellers = () => {
    genre !== "All"
      ? setItems(
          bestSellers.filter(
            (bestSeller) =>
              genre.toLowerCase() === bestSeller.list_name.toLowerCase()
          )
        )
      : setItems([...bestSellers]);
  };

  const getBestSellersByDate = () => {
    console.log(selectedDate);
    console.log(`https://api.nytimes.com/svc/books/v3/lists/${selectedDate}/${genre.toLowerCase().split(" ").join("-")}.json?api-key=${API_KEY}`);
    if (genre !== 'All') {
      axios
        .get(
          `https://api.nytimes.com/svc/books/v3/lists/${selectedDate}/${genre.toLowerCase().split(" ").join("-")}.json?api-key=${API_KEY}`
        )
        .then((res) => {
          console.log(res);
          setItems([res.data.results]);
        });

      console.log(items);
    }
  };

  useEffect(() => {
    console.log("ff");

    getBestSellersByDate();
    updateBestSellers();

    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [bestSellers, genre, selectedDate]);

  return (
    <section className="genres">
      {items.map((item, index) => {
        return (
          <div className="genre" key={index}>
            <div className="genre-heading">
              <h2>{item.list_name}</h2>
            </div>

            <Cards data={item.books} />
          </div>
        );
      })}
    </section>
  );
};

export default Genres;
