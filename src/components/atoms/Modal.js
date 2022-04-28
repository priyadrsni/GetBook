import BookDetails from "./BookDetails";
import SimilarBooks from "./SimilarBooks";
import Reviews from "./Reviews";
import { fetchReviews } from "../../services/BookService";
import { setReviews } from "../../redux/selectedBookSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Modal = ({ setShowModal, similarBooks }) => {
  const dispatch = useDispatch();
  const { book } = useSelector(state => state.selectedBook);

  const getReviewsForABook = () => {
    fetchReviews(book.primary_isbn10).then((response) => {
      dispatch(setReviews([...response]));
    })
  }

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getReviewsForABook();
  }, [book]);
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
            <Reviews />
          </div>
          <div className="right">
            <SimilarBooks
              similarBooks={similarBooks.filter(
                (similarBook) => similarBook.primary_isbn10 !== book.primary_isbn10
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
