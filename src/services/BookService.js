// const API_KEY = process.env.REACT_APP_API_KEY;

// export const getListOfGenres = async () => {
//     const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`);
//     const result = await response.json();
//     return await result.results;
// }

// export const getAllBestSellers = async (genre) => {
//     const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists.json?api-key=${API_KEY}&list=${genre}`);
//     return await response.json();
// }

// export const getBestSellerHistory = async () => {
//     const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${API_KEY}`);
//     return await response.json();
// }