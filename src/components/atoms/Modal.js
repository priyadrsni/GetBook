import BookDetails from "./BookDetails";
import SimilarBooks from "./SimilarBooks";
import Reviews from "./Reviews";
import { fetchReviews } from "../../services/BookService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Modal = ({ setShowModal, similarBooks }) => {
  const [reviews, setReviews] = useState([]);
  const {selectedBook} = useSelector(state => state.selectedBook);

  const getReviewsForABook = () => {
    fetchReviews(selectedBook.primary_isbn10).then((response) => {
      setReviews([...response]);
    })
  }

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getReviewsForABook();
  }, [selectedBook]);
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="btn closeBtn" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="modal-body">
          <div className="left">
            <BookDetails />
            <Reviews reviews={reviews} />
          </div>
          <div className="right">
            <SimilarBooks
              similarBooks={similarBooks.filter(
                (similarBook) => similarBook.primary_isbn10 !== selectedBook.primary_isbn10
              )}
            />
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default Modal;
