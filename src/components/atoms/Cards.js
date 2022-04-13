import { useState } from "react";
import Modal from "./Modal";

const Cards = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});

  const showBookDetails = (e, book) => {
    setSelectedBook(book);
    setShowModal(!showModal);
  };
  return (
    <>
      <ul className="card-wrap">
        {books.length !== 0 &&
          books.map((book, index) => {
            const { book_image, title } = book;

            return (
              <li
                className="card"
                key={index}
                onClick={(e) => showBookDetails(e, book)}
              >
                <img src={book_image} alt={title} />
              </li>
            );
          })}
      </ul>
      {showModal && (
        <Modal
          selectedBook={selectedBook}
          setShowModal={setShowModal}
          similarBooks={books}
        />
      )}
    </>
  );
};

export default Cards;
