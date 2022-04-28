import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGenre } from "../../redux/filterSlice";

const Dropdown = ({
  defaultOption,
  options,
  setSearchOption,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const updateDropdownValue = (e) => {
    setSelectedOption(e.target.innerText);
    if(setSearchOption) setSearchOption(e.target.innerText);
    else dispatch(setGenre(e.target.innerText));
    toggleDropdown();
  };

  return (
    <div className="dropdown-wrap">
      <div className="dropdown" onClick={toggleDropdown}>
        {selectedOption}
      </div>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => {
            return (
              <li onClick={updateDropdownValue} key={index}>
                {option.list_name ? option.list_name : option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
