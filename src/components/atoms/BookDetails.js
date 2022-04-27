import { useSelector } from "react-redux";

const BookDetails = () => {
  const {selectedBook} = useSelector(state => state.selectedBook);
  const {title, book_image, author, publisher, description, buy_links} = selectedBook;
  return (
    <>
      <article className="book-details">
        <div className="left"> 
        <h2>{title}</h2>
        <picture>
          <img src={book_image} alt="Book cover" />
        </picture>
        </div>
       <div className="right">
       <p className="author">
          <span>Author:</span> {author}
        </p>
        <p className="publisher">
          <span>Published by:</span> {publisher}
        </p>
        <p className="descp">
          <span>Description:</span>
          {description}
        </p>
        <p className="buy-links">
          <span>Purchase links:</span>
          {buy_links.length !== 0 &&
            buy_links.map((link, index) => {
              return (
                <a href={link.url} target="_blank" rel="noreferrer" key={index}>
                  {link.name}
                </a>
              );
            })}
        </p>
        <p className="date">
          {selectedBook.created_date && selectedBook.updated_date && (
            <>
              <span>
                <b>Created:</b> {selectedBook.created_date}
              </span>
              <span>
                <b>Updated:</b> {selectedBook.updated_date}
              </span>
            </>
          )}
        </p>
       </div>
      </article>
    </>
  );
};

export default BookDetails;
