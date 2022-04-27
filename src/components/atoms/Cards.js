import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedBook } from "../../redux/selectedBookSlice";
import Modal from "./Modal";

const Cards = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const showBookDetails = (e, book) => {
    dispatch(setSelectedBook(book));
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
          setShowModal={setShowModal}
          similarBooks={books}
        />
      )}
    </>
  );
};

export default Cards;
