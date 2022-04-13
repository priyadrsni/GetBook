import BookDetails from "./BookDetails";
import SimilarBooks from "./SimilarBooks";
import Reviews from "./Reviews";
import { fetchReviews } from "../../services/BookService";
import { useCallback, useEffect, useState } from "react";

const Modal = ({ selectedBook, setShowModal, similarBooks }) => {
  const [reviews, setReviews] = useState([]);

  const getReviewsForABook = useCallback(() => {
    fetchReviews(selectedBook.primary_isbn10).then((response) => {
      setReviews([...response]);
    });
  }, [selectedBook.primary_isbn10]);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getReviewsForABook();
  }, [selectedBook.primary_isbn10, getReviewsForABook]);
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
            <BookDetails selectedBook={selectedBook} />
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
