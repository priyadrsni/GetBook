import BookDetails from "./BookDetails";
import SimilarCards from "./SimilarCards";
import Reviews from "./Reviews";

const Modal = ({data, setShow, similarCards, setSelectedCard}) => {
    data = data.card[0];

    const closeModal = () => {
        setShow(false);
    }
    return (
        <div className="modal">
            <div className="modal-content">
            <div className="modal-header">
            <button className="btn closeBtn" onClick={closeModal}>X</button>
                </div>
                <div className="modal-body">
                    <div className="left">
                    <BookDetails data={data}/>
                    <Reviews isbn={data.primary_isbn10}/>
                    </div>
                    <div className="right">
                    <SimilarCards data={similarCards} selectedCardIsbn={data.primary_isbn10} setSelectedCard={setSelectedCard}/>
                    </div>
                </div>
                <div className="modal-footer">

                </div>
               
            </div>
        </div>
    )
}

export default Modal;