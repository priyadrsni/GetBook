import Hero from "../organisms/Hero";
import Filter from "../organisms/Filter";
import Genres from "../organisms/Genres";
import axios from "axios";
import { useState, useEffect, Component } from "react";

const API_KEY = process.env.REACT_APP_API_KEY

const Home = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [bestSellerOptions, setBestSellerOptions] = useState([]);
    const [selectedSearchPair, setSelectedSearchPair] = useState({category: 'all', value: 'all'});
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [selectedDate, setSelectedDate] = useState('current');
    const [items, setItems] = useState([]);


    const fetchData = async () => {
        // const getAllData = [];

        const res = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=aJfUEi9sfn270VuLKZdWYsJ5b794S2zr`);
        console.log(res);
        setBestSellers(res.data.results.lists);
        setBestSellerOptions(res.data.results.lists);

        // listOfGenres.slice(0, 7).forEach(item => {
        //     getAllData.push(axios.get(`https://api.nytimes.com/svc/books/v3/lists.json?api-key=${API_KEY}&list=${item.list_name_encoded}`));
        // });

        // axios.all(getAllData).then(
        //     axios.spread((...allData) => {
        //         setBestSellers(...allData);
        //     })
        // )
    }

    const getBestSellersByDate = () => {
      console.log("get best sellers");

        console.log(selectedDate);
        if (selectedGenre !== "All") {
          axios
            .get(
              `https://api.nytimes.com/svc/books/v3/lists/${selectedDate}/${selectedGenre
                .toLowerCase()
                .split(" ")
                .join("-")}.json?api-key=${API_KEY}`
            )
            .then((res) => {
              console.log(res);
              setBestSellers([res.data.results]);
            });
            if(selectedSearchPair.category !== 'all') {
                console.log("hi")
                const newArray = bestSellers.map((option) => {
                    return {...option, books: option.books.filter(item => item[selectedSearchPair.category.toLowerCase()].toLowerCase() === selectedSearchPair.value.toLowerCase())}
                });
                setBestSellers([...newArray]);
            }
          console.log(selectedSearchPair.category);
        }
      };

    useEffect(()=> {
        if(selectedDate === 'current' || selectedDate === '') fetchData();
        if(selectedDate !== '') getBestSellersByDate()
        console.log(bestSellers );
    }, [selectedGenre, selectedDate])

    return (
        <>
            <Hero bestSellers={bestSellers} bestSellerOptions={bestSellerOptions} setBestSellers={setBestSellers} setSelectedSearchPair={setSelectedSearchPair} items={items} setItems={setItems}/>
            <Filter options={bestSellerOptions} setSelectedGenre={setSelectedGenre} setSelectedDate={setSelectedDate} getBestSellersByDate={getBestSellersByDate}/>
            <Genres genre={selectedGenre} selectedDate={selectedDate} bestSellers={bestSellers} selectedSearchPair={selectedSearchPair} items={items} setItems={setItems}/>
        </>
    )
}

export default Home;