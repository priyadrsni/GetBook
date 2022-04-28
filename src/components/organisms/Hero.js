import Dropdown from "../atoms/Dropdown";
import InputDropdown from "../atoms/InputDropdown";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory, setCategoryValue } from "../../redux/filterSlice";

const Hero = () => {
  const [searchOption, setSearchOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const updateBestSellers = (e) => {
    e.preventDefault();
    dispatch(setCategory(searchOption));
    dispatch(setCategoryValue(searchValue));
  };

  return (
    <section className="hero">
      <picture>
        <img src="./images/book-store.png" alt="Book store" />
      </picture>
      <article>
        <h1 className="title-2xl">NYT Book Store</h1>
        <form onSubmit={updateBestSellers}>
          <Dropdown
            defaultOption="Search by"
            options={["all", "Author", "Title", "Publisher"]}
            setSearchOption={setSearchOption}
          />
          <InputDropdown
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
