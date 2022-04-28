import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../atoms/Dropdown";
import {setDate} from "../../redux/filterSlice";

const Filter = () => {
  const { bestSellerOptions } = useSelector(state => state.books);
  const dispatch = useDispatch();

  const isFixed = (e) => {
    const filterSection = document.querySelector(".filter-wrap");
    const scrollTop = window.scrollY;
    scrollTop >= 600
      ? filterSection.classList.add("is-fixed")
      : filterSection.classList.remove("is-fixed");
  };

  const updateDate = (e) => {
    let date = e.target.value === "" ? "current" : e.target.value;
    dispatch(setDate(date));
  };

  useEffect(() => {
    window.addEventListener("scroll", isFixed);
    return () => {
      window.removeEventListener("scroll", isFixed);
    };
  }, [bestSellerOptions]);

  return (
    <section className="filter-wrap">
      <div className="filter">
        <form>
          <label>Genre: </label>
          <Dropdown
            defaultOption="All"
            options={["All", ...bestSellerOptions]}
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
