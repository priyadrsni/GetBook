import Hero from "../organisms/Hero";
import Filter from "../organisms/Filter";
import Genres from "../organisms/Genres";
import axios from "axios";
import { useState, useEffect } from "react";

// const API_KEY = process.env.REACT_APP_API_KEY


const Home = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [selectedDate, setSelectedDate] = useState('current');

    const fetchData = async () => {
        // const getAllData = [];

        const res = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=aJfUEi9sfn270VuLKZdWYsJ5b794S2zr`);
        console.log(res);
        setBestSellers(res.data.results.lists);

        // listOfGenres.slice(0, 7).forEach(item => {
        //     getAllData.push(axios.get(`https://api.nytimes.com/svc/books/v3/lists.json?api-key=${API_KEY}&list=${item.list_name_encoded}`));
        // });

        // axios.all(getAllData).then(
        //     axios.spread((...allData) => {
        //         setBestSellers(...allData);
        //     })
        // )
    }

    useEffect(()=> {
        fetchData();
        // console.log(listOfGenres);
        console.log(bestSellers );
    }, [])

    return (
        <>
            <Hero bestSellers={bestSellers}/>
            <Filter options={bestSellers} setSelectedGenre={setSelectedGenre} setSelectedDate={setSelectedDate}/>
            <Genres genre={selectedGenre} selectedDate={selectedDate} bestSellers={bestSellers}/>
        </>
    )
}

export default Home;