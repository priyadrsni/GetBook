import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import debounce from 'lodash.debounce';

const InputDropdown = ({
  searchParam,
  setSearchValue,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchText, setSearchText] = useState("");
  const {bestSellerOptions} = useSelector(state => state.books);

  let filteredInput = [];
  if(searchParam !== "all") {
    bestSellerOptions.forEach((item) => {
      item.books.forEach((book) => {
        if(!filteredInput.includes(book[searchParam.toLowerCase()])) filteredInput.push(book[searchParam.toLowerCase()]);
      });
    });
  }

  const debouncedSearch = debounce((value, cb) => {
    cb(value);
  }, 1000);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeIfEmpty = () => {
    if(searchText === "" && isDropdownOpen) toggleDropdown();
  }

  const updateValue = (e) => {
    setSelectedOption(e.target.innerText);
    if (isDropdownOpen) toggleDropdown();
  };

  const updateDropdown = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    debouncedSearch(value, searchBook);
  };

  const searchBook = (value) => {
    setSearchText(value);
    if (!isDropdownOpen) toggleDropdown();
  }

  useEffect(() => {
    setSearchValue(selectedOption);
  }, [selectedOption, setSearchValue]);
  
  return (
    <div className="dropdown-wrap ip-dropdown-wrap">
      <input
        type="text"
        className="ip-dropdown"
        onClick={closeIfEmpty}
        onChange={updateDropdown}
        value={selectedOption}
      />
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          <li onClick={updateValue}>all</li>
          {filteredInput.filter(book => book.toLowerCase().includes(searchText.toLowerCase())).map((book, index) => {
            return (
              <li onClick={updateValue} key={index}>
                {book}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
