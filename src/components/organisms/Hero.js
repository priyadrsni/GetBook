import Dropdown from "../atoms/Dropdown";
import InputDropdown from "../atoms/InputDropdown";
import { useState } from "react";

const Hero = ({ bestSellerOptions, setSelectedSearchPair }) => {
  const [searchOption, setSearchOption] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const updateBestSellers = (e) => {
    e.preventDefault();
    setSelectedSearchPair(searchOption, searchValue);
  };

  return (
    <section className="hero">
      <picture>
        <img src="./images/book-store.png" alt="Book store" />
      </picture>
      <article>
        <h1 className="title-2xl">NYT Book Store</h1>
        <form onSubmit={(e) => updateBestSellers(e)}>
          <Dropdown
            defaultOption="Search by"
            options={["all", "Author", "Title", "Publisher"]}
            setSearchOption={setSearchOption}
          />
          <InputDropdown
            bestSellerOptions={bestSellerOptions}
            searchParam={searchOption}
            setSearchValue={setSearchValue}
          />
          <button type="submit" className="btn btn-secondary">
            Search
          </button>
        </form>
      </article>
    </section>
  );
};

export default Hero;
