import { useState } from "react";

const Dropdown = ({ defaultOption, options, setFilteredOption, setSearchOption }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultOption);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const updateDropdownValue = (e) => {
    setSelectedOption(e.target.innerText);
    setFilteredOption && setFilteredOption(e.target.innerText);
    setSearchOption && setSearchOption(e.target.innerText);
    toggleDropdown();
  };

  return (
    <div className="dropdown-wrap">
      <div className="dropdown" onClick={toggleDropdown}>
        {selectedOption}
      </div>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          {
              options.map((option, index) => {
                return <li onClick={updateDropdownValue} key={index}>{ option.list_name ? option.list_name : option}</li>
              })
          }
        </ul>
      )}
    </div>
  );
};

export default Dropdown;