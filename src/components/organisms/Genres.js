import Cards from "../atoms/Cards";

const showNoBooksWhenEmpty = () => {
  let emptyData = "Loading...";
  setTimeout(() => {
    emptyData = "No Books to display";
  }, 3000);
  return emptyData
};
const Genres = ({ booksToBeDisplayed }) => {
  return (
    <section className="genres">
      {booksToBeDisplayed.length !== 0 ? (
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
          <p className="no-books">{showNoBooksWhenEmpty()}</p>
        </div>
      )}
    </section>
  );
};

export default Genres;
