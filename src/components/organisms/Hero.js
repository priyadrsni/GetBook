import Dropdown from "../atoms/Dropdown";
import InputDropdown from "../atoms/InputDropdown";
import {useEffect, useState} from "react";

const Hero = ({bestSellers, bestSellerOptions, setBestSellers, setSelectedSearchPair, items, setItems}) => {
    // const [inputDropdownOptions, setInputDropdownOptions] = useState([]);
    const [searchOption, setSearchOption] = useState("");
    const [searchValue, setSearchValue] = useState('');

    const updateBestSellers = (e) => {
        e.preventDefault();
        console.log(bestSellers);
        if(setSelectedSearchPair.category !== '' && setSelectedSearchPair.value !== '') {
            const newArray = bestSellers.map((option) => {
                return {...option, books: option.books.filter(item => item[searchOption.toLowerCase()].toLowerCase() === searchValue.toLowerCase())}
            });
            console.log(newArray);
            setItems([...newArray]);
        }
        setSelectedSearchPair((prevState) => {
            return {...prevState, category: searchOption, value: searchValue}
        });
    }

    // useEffect(() => {
    //     // setInputDropdownOptions(bestSellers);
    // }, [searchOption]);

    return (
        <section className="hero">
            <picture>
                <img src="./images/book-store.png" alt="Book store" />
            </picture>
            <article>
                <h1 className="title-2xl">NYT Book Store</h1>
                <form onSubmit={(e) => updateBestSellers(e)}>
                    <Dropdown defaultOption="Search by" options={["all", "Author", "Title", "Publisher"]} setSearchOption={setSearchOption} />
                    <InputDropdown defaultOption="" options={bestSellerOptions} searchParam={searchOption} setSearchValue={setSearchValue}/>
                    <button type="submit" className="btn btn-secondary">Search</button>
                </form>
            </article>
        </section>
    )
}

export default Hero;

// e07a5f