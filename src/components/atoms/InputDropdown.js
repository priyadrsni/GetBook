import { useEffect, useState } from "react";

const InputDropdown = ({ defaultOption, options, searchParam }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [searchText, setSearchText] = useState('');
  let filteredInput = [];


  options = options.list_name ? options.list_name : options;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const updateDropdownValue = (e) => {
    setSelectedOption(e.target.innerText);
    if(isDropdownOpen) toggleDropdown();
  };

  const emptyText = (e) => {
    setSelectedOption('');
    if(!isDropdownOpen) toggleDropdown();
  };

  const searchValuesBasedOnOption = (e) => {
      console.log(e.target.value);
    setSearchText(e.target.value);
    setSelectedOption(e.target.value);
    // options.forEach((option) => {
    //     console.log("option:", option);
    //     console.log(searchText);
    //    filteredInput.push(option.books.filter(book => book[searchParam.toLowerCase()].toLowerCase().includes(e.target.value.toLowerCase())));
    //    console.log(filteredInput);
    // });
    filteredInput = [...options];
    filteredInput.map((option) => {
        return {...options, books: option.books.filter((book) => book.author.includes(e.target.value))}
    });

    if(!isDropdownOpen) toggleDropdown();
  };

  useEffect(() => {
      console.log(options);
  }, [options])

  return (
    <div className="dropdown-wrap ip-dropdown-wrap">
      <input type="text" className="ip-dropdown" onClick={emptyText} onChange={searchValuesBasedOnOption} value={selectedOption}/>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          {
              filteredInput.length !== 0 ? (options.map((option) => {
                    return option.books.map((item, index) => <li onClick={updateDropdownValue} key={index}>{ item[searchParam.toLowerCase()] }</li>)
              })) : (
                <li onClick={toggleDropdown}>{ filteredInput.length }</li>
              )
        }
        </ul>
      )}
    </div>
  );
}

export default InputDropdown;