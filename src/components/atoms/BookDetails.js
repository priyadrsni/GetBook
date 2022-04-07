const BookDetails = ({ data }) => {
  return (
    <>
      <article className="book-details">
        <picture>
          <img src={data.book_image} alt="Book cover" />
        </picture>
        <p className="author">
          <b>Author:</b> {data.author}
        </p>
        <p className="publisher">
          <b>Published by:</b> {data.publisher}
        </p>
        <p className="descp">{data.description}</p>
        <p className="buy-links">
          <b>Purchase links:</b>
          {data.buy_links.length !== 0 &&
            data.buy_links.map((link, index) => {
              return (
                <a href={link.url} target="_blank" key={index}>
                  {link.name}
                </a>
              );
            })}
        </p>

        <p className="date">
          {data.created_date && data.updated_date && (
            <>
              <span>
                <b>Created:</b> {data.created_date}
              </span>
              <span>
                <b>Updated:</b> {data.updated_date}
              </span>
            </>
          )}
        </p>
      </article>
      <article className="book-reviews"></article>
    </>
  );
};

export default BookDetails;
