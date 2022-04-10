import Hero from "../organisms/Hero";
import Filter from "../organisms/Filter";
import Genres from "../organisms/Genres";
import axios from "axios";
import { useState, useEffect, Component } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      searchValue: "",
      genre: "All",
      date: "current",
      bestSellers: [],
      bestSellerOptions: [],
      bestSellersByDate: [],
      items: [],
    };
  }

  setCategoryAndSearchValue = (category, searchValue) => {
    this.setState({
      ...this.state,
      category: category,
      searchValue: searchValue,
    });
  };

  setGenreAndDate = (genre, date) => {
    this.setState({ ...this.state, genre: genre, date: date });
  };

  setItems = (newItems) => {
    this.setState({ ...this.state, items: newItems });
  };

  fetchOverviewLists = async () => {
    const res = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/overview.json`,
      {
        params: {
          "api-key": API_KEY,
        },
      }
    );
    this.setState({
      ...this.state,
      bestSellers: res.data.results.lists,
      bestSellerOptions: res.data.results.lists,
    });
  };

  getBestSellersByDate = async () => {
    const genre =
      this.state.genre === "All" ? "Hardcover fiction" : this.state.genre;
    const res = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/${this.state.date}/${genre
        .toLowerCase()
        .split(" ")
        .join("-")}.json`,
      {
        params: {
          "api-key": API_KEY,
        },
      }
    );

    this.setState({ ...this.state, bestSellersByDate: [res.data.results] });
  };

  updateByGenre = (data) => {
    if (this.state.genre !== "All") {
      this.setItems(
        data.filter(
          (item) =>
            this.state.genre.toLowerCase() === item.list_name.toLowerCase()
        )
      );
    }
  };

  filterByCategoryAndValue = () => {
    if (
      this.state.category !== "" &&
      this.state.searchValue !== "" &&
      (this.state.category !== "all" && this.state.searchValue !== "all") &&
      this.state.date !== "current"
    ) {
      const newArray = this.state.bestSellersByDate.map((option) => {
        return {
          ...option,
          books: option.books.filter(
            (item) =>
              item[this.state.category.toLowerCase()].toLowerCase() ===
              this.state.searchValue.toLowerCase()
          ),
        };
      });
      this.setState((prevState) => ({ ...prevState, items: newArray }));
      this.updateByGenre(this.state.items);
    } else if ((this.state.category !== "" && this.state.searchValue !== "") && (this.state.category !== "all" && this.state.searchValue !== "all")) {
      const newArray = this.state.bestSellers.map((option) => {
        return {
          ...option,
          books: option.books.filter(
            (item) =>
              item[this.state.category.toLowerCase()].toLowerCase() ===
              this.state.searchValue.toLowerCase()
          ),
        };
      });
      this.setState((prevState) => ({ ...prevState, items: newArray }));
      this.updateByGenre(this.state.items);
    } else if (this.state.date !== "current"){
        console.log("inside current");
        this.setState((prevState) => ({
            ...prevState,
            items: [...this.state.bestSellersByDate],
          }));
          this.updateByGenre(this.state.bestSellersByDate);
    } else {
      this.setState((prevState) => ({
        ...prevState,
        items: this.state.bestSellers,
      }));
      this.updateByGenre(this.state.bestSellers);
    }
  };

  fetchData = async () => {
    await this.fetchOverviewLists();
    await this.getBestSellersByDate();
    this.filterByCategoryAndValue();
    console.log(this.state);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.category !== "all" &&
      this.state.searchValue !== "all" &&
      (this.state.category !== prevState.category ||
        this.state.searchValue !== prevState.searchValue)
    ) {
      console.log("calling first if");
      this.filterByCategoryAndValue();
    }
    if (this.state.date !== prevState.date) {
      console.log("calling second if");
      this.getBestSellersByDate();
      this.filterByCategoryAndValue();
    }
    if ((this.state.genre !== prevState.genre) || (this.state.category !== prevState.category ||
        this.state.searchValue !== prevState.searchValue)) {
        console.log("calling third if");
        this.filterByCategoryAndValue();
      }
  }

  componentDidMount() {
    this.fetchData().then((res) => console.log(res));
  }

  render() {
    return (
      <>
        <Hero
          bestSellerOptions={this.state.bestSellerOptions}
          setSelectedSearchPair={this.setCategoryAndSearchValue}
        />
        <Filter
          options={this.state.bestSellerOptions}
          setGenreAndDate={this.setGenreAndDate}
          getBestSellersByDate={this.getBestSellersByDate}
        />
        <Genres
          items={this.state.items}
        />
      </>
    );
  }
}

const Home1 = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [bestSellerOptions, setBestSellerOptions] = useState([]);
  const [selectedSearchPair, setSelectedSearchPair] = useState({
    category: "all",
    searchValue: "all",
  });
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedDate, setSelectedDate] = useState("current");
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    // const getAllData = [];

    const res = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=aJfUEi9sfn270VuLKZdWYsJ5b794S2zr`
    );
    console.log(res);
    setBestSellers(res.data.results.lists);
    setBestSellerOptions(res.data.results.lists);

    // listOfGenres.slice(0, 7).forEach(item => {
    //     getAllData.push(axios.get(`https://api.nytimes.com/svc/books/v3/lists.json?api-key=${API_KEY}&list=${item.list_name_encoded}`));
    // });

    // axios.all(getAllData).then(
    //     axios.spread((...allData) => {
    //         setBestSellers(...allData);
    //     })
    // )
  };

  const getBestSellersByDate = () => {
    console.log("get best sellers");

    console.log(selectedDate);
    if (selectedGenre !== "All") {
      axios
        .get(
          `https://api.nytimes.com/svc/books/v3/lists/${selectedDate}/${selectedGenre
            .toLowerCase()
            .split(" ")
            .join("-")}.json?api-key=${API_KEY}`
        )
        .then((res) => {
          console.log(res);
          setBestSellers([res.data.results]);
        });
      if (selectedSearchPair.category !== "all") {
        console.log("hi");
        const newArray = bestSellers.map((option) => {
          return {
            ...option,
            books: option.books.filter(
              (item) =>
                item[
                  selectedSearchPair.category.toLowerCase()
                ].toLowerCase() === selectedSearchPair.searchValue.toLowerCase()
            ),
          };
        });
        setBestSellers([...newArray]);
      }
      console.log(selectedSearchPair.category);
    }
  };

  useEffect(() => {
    if (selectedDate === "current" || selectedDate === "") fetchData();
    if (selectedDate !== "") getBestSellersByDate();
    console.log(bestSellers);
  }, [selectedGenre, selectedDate]);

  return (
    <>
      <Hero
        bestSellers={bestSellers}
        bestSellerOptions={bestSellerOptions}
        setBestSellers={setBestSellers}
        setSelectedSearchPair={setSelectedSearchPair}
        items={items}
        setItems={setItems}
      />
      <Filter
        options={bestSellerOptions}
        setSelectedGenre={setSelectedGenre}
        setSelectedDate={setSelectedDate}
        getBestSellersByDate={getBestSellersByDate}
      />
      <Genres
        genre={selectedGenre}
        selectedDate={selectedDate}
        bestSellers={bestSellers}
        selectedSearchPair={selectedSearchPair}
        items={items}
        setItems={setItems}
      />
    </>
  );
};

export default Home;
