const GET_BEST_SELLERS = 'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key={api-key}';
const GET_BEST_SELLERS_BY_GENRE_AND_DATE = "https://api.nytimes.com/svc/books/v3/lists/{date}/{genre}?api-key={api-key}";
const GET_BEST_SELLERS_BY_DATE = "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key={api-key}&published_date={date}";
const GET_REVIEWS = "https://api.nytimes.com/svc/books/v3/reviews.json?api-key={api-key}&isbn={isbn}"

export {
    GET_BEST_SELLERS, GET_BEST_SELLERS_BY_GENRE_AND_DATE, GET_BEST_SELLERS_BY_DATE, GET_REVIEWS
}