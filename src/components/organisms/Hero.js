import Dropdown from "../atoms/Dropdown";
import InputDropdown from "../atoms/InputDropdown";
import {useEffect, useState} from "react";

const Hero = ({bestSellers}) => {
    // const [inputDropdownOptions, setInputDropdownOptions] = useState([]);
    const [searchOption, setSearchOption] = useState("");

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
                <form>
                    <Dropdown defaultOption="Search by" options={["Author", "Title", "Publisher"]} setSearchOption={setSearchOption} />
                    <InputDropdown defaultOption="" options={bestSellers} searchParam={searchOption}/>
                    <button type="submit" className="btn btn-secondary">Search</button>
                </form>
            </article>
        </section>
    )
}

export default Hero;

// e07a5f