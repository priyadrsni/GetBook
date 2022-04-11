import { useEffect, useState } from "react";

const InputDropdown = ({
  defaultOption,
  bestSellerOptions,
  searchParam,
  setSearchValue,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  let filteredInput = [...bestSellerOptions];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const updateDropdownValue = (e) => {
    setSelectedOption(e.target.innerText);
    if (isDropdownOpen) toggleDropdown();
  };

  const emptyText = (e) => {
    setSelectedOption("");
    if (!isDropdownOpen) toggleDropdown();
  };

  const searchValuesBasedOnOption = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    setSearchValue(selectedOption);
  }, [selectedOption, setSearchValue]);

  return (
    <div className="dropdown-wrap ip-dropdown-wrap">
      <input
        type="text"
        className="ip-dropdown"
        onClick={emptyText}
        onChange={searchValuesBasedOnOption}
        value={selectedOption}
      />
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          <li onClick={updateDropdownValue}>all</li>
          {filteredInput.map((item) => {
            return item.books.map((book, index) => {
              return (
                <li onClick={updateDropdownValue} key={index}>
                  {book[searchParam.toLowerCase()]}
                </li>
              );
            });
          })}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
