import BookDetails from "./BookDetails";
import SimilarCards from "./SimilarCards";
import Reviews from "./Reviews";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Modal = ({ data, setShow, similarCards }) => {
  data = data.card[0];
  const [reviews, setReviews] = useState([]);

  const getReviewsForABook = useCallback(() => {
    axios
      .get(
        `https://api.nytimes.com/svc/books/v3/reviews.json?api-key=${process.env.REACT_APP_API_KEY}&isbn=${data.primary_isbn10}`
      )
      .then((res) => {
        setReviews([...res.data.results]);
      });
  }, [data.primary_isbn10]);
  const closeModal = () => {
    setShow(false);
  };
  
  useEffect(() => {
    getReviewsForABook();
  }, [reviews, getReviewsForABook]);

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
            <BookDetails data={data} />
            <Reviews reviews={reviews} />
          </div>
          <div className="right">
            <SimilarCards
              data={similarCards.filter(item => item.primary_isbn10 !== data.primary_isbn10)}
            />
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default Modal;
