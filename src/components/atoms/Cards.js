import { useEffect, useState } from "react";
import Modal from "./Modal";

const Cards = ({ data }) => {

  const [show, setShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState({card: []});

  const showCardDetails = (e) => {
    const cardData = data.filter(item => e.target.closest('li').getAttribute('data-isbn') === item.primary_isbn10);
    // setSelectedCard(prevState => ([...prevState, ...card]));
    console.log(cardData);
    setSelectedCard(prevState => ({...prevState, card: cardData}));
    setShow(!show);
    console.log(selectedCard.card);

  }

  return (
    <>
    <ul className="card-wrap">
      {data.length !== 0 && data.map((item, index) => {
        return (
          <li className="card" key={index} onClick={showCardDetails} data-isbn={item.primary_isbn10}>
            <img src={item.book_image} alt={item.title}/>
          </li>
        );
      })}
    </ul>
    {show && <Modal data={selectedCard} setShow={setShow} similarCards={data} setSelectedCard={setSelectedCard}/>}
    </>
  );
};

export default Cards;
