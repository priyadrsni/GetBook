const SimilarBooks = ({ similarBooks }) => {
  return (
    <div className="similar-cards-wrap">
      <h3>
        <b>Similar Books</b>
      </h3>
      <ul className="similar-cards card-wrap">
        {similarBooks.length >= 2 ? (
          similarBooks.map((book, index) => {
            const {book_image, title} = book;
            return (
                <li
                  className="card"
                  key={index}
                >
                  <img src={book_image} alt={title} />
                </li>
            );
          })
        ) : (
          <li className="card">No similar books</li>
        )}
      </ul>
    </div>
  );
};

export default SimilarBooks;
