import { useEffect, useState } from "react";
import Dropdown from "../atoms/Dropdown";

const Filter = ({ options, setSelectedGenre, setSelectedDate }) => {
  const [filteredOption, setFilteredOption] = useState("All");
  const [filteredDate, setFilteredDate] = useState('current');
  const date = new Date();
  const today = [date.getFullYear(), date.getMonth(), date.getDate()].join('-');

  const isFixed = (e) => {
    const filterSection = document.querySelector(".filter-wrap");
    const scrollTop = window.scrollY;
    scrollTop >= 600
      ? filterSection.classList.add("is-fixed")
      : filterSection.classList.remove("is-fixed");
  };

  const updateDate = (e) => {
      console.log(e.target.value);
    if(e.target.value !== '') setFilteredDate(e.target.value);
  }

  useEffect(() => {
    console.log(options);
    setSelectedGenre(filteredOption);
    setSelectedDate(filteredDate);
    window.addEventListener("scroll", isFixed);
    return () => {
      window.removeEventListener("scroll", isFixed);
    };
  }, [options, filteredOption, filteredDate, setSelectedGenre, setSelectedDate]);

  return (
    <section className="filter-wrap">
      <div className="filter">
      <form>
        <label>Genre: </label>
        <Dropdown
          defaultOption="All"
          options={["All", ...options]}
          setFilteredOption={setFilteredOption}
        />
        <label>
          Published date:
          <input type="date" onChange={updateDate}/>
        </label>
      </form>
      </div>
    </section>
  );
};

export default Filter;
