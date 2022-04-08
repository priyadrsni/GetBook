import { useEffect, useState } from "react";
import axios from 'axios';

const Reviews = ({isbn}) => {
    const [reviews, setReviews] = useState([]);
    const getReviewsForABook = () => {
        axios.get(`https://api.nytimes.com/svc/books/v3/reviews.json?api-key=${process.env.REACT_APP_API_KEY}&isbn=${isbn}`)
        .then(res => {
            setReviews([...res.data.results]);
        })
        
    }

    useEffect(() => {
        getReviewsForABook();
    }, []);

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