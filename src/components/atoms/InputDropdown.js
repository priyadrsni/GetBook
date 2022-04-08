import { useEffect, useState } from "react";

const InputDropdown = ({ defaultOption, options, searchParam, setSearchValue }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [searchText, setSearchText] = useState('');
  let filteredInput = [...options];


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
    options.forEach((option) => {
        console.log("option:", option);
        console.log(searchText);
       filteredInput.push(option.books.filter(book => book[searchParam.toLowerCase()].toLowerCase().includes(e.target.value.toLowerCase())));
       console.log(filteredInput);
    });
    console.log(options);

    if(!isDropdownOpen) toggleDropdown();
  };

  useEffect(() => {
      console.log(filteredInput);
      setSearchValue(selectedOption);
  }, [selectedOption]);

  return (
    <div className="dropdown-wrap ip-dropdown-wrap">
      <input type="text" className="ip-dropdown" onClick={emptyText} onChange={searchValuesBasedOnOption} value={selectedOption}/>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
           <li onClick={updateDropdownValue}>all</li>
          {
              filteredInput.map(item => {
                  return item.books.map((book, index) => {
                      return <li onClick={updateDropdownValue} key={index}>{book[searchParam.toLowerCase()]}</li>
                  })
              })
        }
        </ul>
      )}
    </div>
  );
}

export default InputDropdown;