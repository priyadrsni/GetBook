import axios from "axios";
import { useState, useEffect } from "react";
import Cards from "../atoms/Cards";

const Genres = ({ genre, selectedDate, bestSellers, items, setItems, selectedSearchPair }) => {
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
      console.log("update best sellers");
    let newArray = []
    
    if(selectedSearchPair.category !== 'all' && selectedSearchPair.value !== 'all') {
        console.log("category ", bestSellers)
        if(genre !== "All") {
            newArray =bestSellers.filter(bestSeller => genre.toLowerCase() === bestSeller.list_name.toLowerCase())
            .map((option) => {
                return {...option, books: option.books.filter(item => item[selectedSearchPair.category.toLowerCase()].toLowerCase() === selectedSearchPair.value.toLowerCase())}
            });
            setItems([...newArray]);
        }
        else {
            newArray = bestSellers.map((option) => {
                return {...option, books: option.books.filter(item => item[selectedSearchPair.category.toLowerCase()].toLowerCase() === selectedSearchPair.value.toLowerCase())}
            })
            setItems([...newArray]);
        }
    }
    else {
        
        if(genre !== "All") {
            newArray = bestSellers.filter(bestSeller => genre.toLowerCase() === bestSeller.list_name.toLowerCase());
            setItems([...newArray]);
        }
        else {
            console.log(bestSellers);
            setItems([...bestSellers]);
        }
    }
  };

  useEffect(() => {
    console.log("ff");
    updateBestSellers();
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [bestSellers, genre, selectedDate]);
 console.log(items);
  return (
    <section className="genres">
      {items.map((item, index) => {
        return (
          item.books.length !== 0 && (
            <div className="genre" key={index}>
              <div className="genre-heading">
                <h2>{item.list_name}</h2>
              </div>

              <Cards data={item.books} />
            </div>
          )
        );
      })}
    </section>
  );
};

export default Genres;
