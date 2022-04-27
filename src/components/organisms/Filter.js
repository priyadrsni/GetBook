import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "../atoms/Dropdown";

const Filter = ({ setGenreAndDate }) => {
  const [filteredOption, setFilteredOption] = useState("All");
  const [filteredDate, setFilteredDate] = useState("current");
  const { bestSellerOptions } = useSelector(state => state.bestSellers);

  const isFixed = (e) => {
    const filterSection = document.querySelector(".filter-wrap");
    const scrollTop = window.scrollY;
    scrollTop >= 600
      ? filterSection.classList.add("is-fixed")
      : filterSection.classList.remove("is-fixed");
  };

  const updateDate = (e) => {
    let date = e.target.value === "" ? "current" : e.target.value;
    setFilteredDate(date);
  };

  useEffect(() => {
    setGenreAndDate(filteredOption, filteredDate);
    window.addEventListener("scroll", isFixed);
    return () => {
      window.removeEventListener("scroll", isFixed);
    };
  }, [bestSellerOptions, filteredOption, filteredDate, setGenreAndDate]);

  return (
    <section className="filter-wrap">
      <div className="filter">
        <form>
          <label>Genre: </label>
          <Dropdown
            defaultOption="All"
            options={["All", ...bestSellerOptions]}
            setFilteredOption={setFilteredOption}
          />
          <label>
            Published date:
            <input type="date" onChange={updateDate} />
          </label>
        </form>
      </div>
    </section>
  );
};

export default Filter;
