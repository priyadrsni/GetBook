import { useSelector } from "react-redux";

const Reviews = () => {
  const { reviews } = useSelector(state => state.selectedBook)
  return (
    <div className="reviews">
      <h3>
        <b>Reviews</b>
      </h3>
      <ul>
        {
          reviews.map((review, index) => {
            const {byline, summary, url} = review;
            return (
              <li key={index}>
                <h4>{byline.slice(2)}</h4>
                <p>
                  {summary}
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary"
                  >
                    Read More...
                  </a>
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Reviews;
