const Reviews = ({reviews}) => {

    return (
        <div className="reviews">
            <h3>
                <b>Reviews</b>
            </h3>
            <ul>
                {
                    reviews.length !== 0 ? reviews.map((item, index) => {
                        return <li key={index}>
                            <h4>{item.byline.slice(2)}</h4>
                            <p>{item.summary} <a href={item.url} target="_blank" className="link link-primary">Read More...</a></p>
                            
                        </li>
                    }) : (
                        <li>
                            <p>No reviews</p>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default Reviews;