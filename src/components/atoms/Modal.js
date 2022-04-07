import BookDetails from "./BookDetails";

const Modal = ({data, setShow}) => {
    data = data.card[0];

    const closeModal = () => {
        setShow(false);
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                   <h2>{data.title}</h2>
                </div>
                <div className="modal-body">
                    {BookDetails && <BookDetails data={data}/>}
                </div>
                <div className="modal-footer">

                </div>
                <button className="btn closeBtn" onClick={closeModal}>X</button>
            </div>
        </div>
    )
}

export default Modal;