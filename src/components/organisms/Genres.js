import { useEffect } from "react";
import Cards from "../atoms/Cards";

const Genres = ({ booksToBeDisplayed }) => {
  const isSticky = (e) => {
    const genreHeading = document.querySelectorAll(".genre-heading");
    genreHeading.forEach((item) => {
      const scrollTop = window.scrollY;
      scrollTop >= item.getBoundingClientRect().top
        ? item.classList.add("is-sticky")
        : item.classList.remove("is-sticky");
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);
  return (
    <section className="genres">
      {booksToBeDisplayed.map((item, index) => {
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
