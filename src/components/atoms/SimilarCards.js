const SimilarCards = ({ data }) => {
  return (
    <div className="similar-cards-wrap">
      <h3>
        <b>Similar Books</b>
      </h3>
      <ul className="similar-cards card-wrap">
        {data.length >= 2 ? (
          data.map((item, index) => {
            return (
                <li
                  className="card"
                  key={index}
                  data-isbn={item.primary_isbn10}
                >
                  <img src={item.book_image} alt={item.title} />
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

export default SimilarCards;
