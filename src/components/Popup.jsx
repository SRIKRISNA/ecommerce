import Modal  from "react-bootstrap/Modal";

const PopUp = ({description, category, image, popShow, setPopShow}) => {
    const handleClose = () =>{
        setPopShow(false);
    }
    return(
        <div className="mainPopup">
            <Modal popShow={popShow} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{category}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{display:"flex", gap:"20px"}}>
                        <div className="imagePop1">
                            <img src={image} width="200px" height="200px" alt="productimage" />
                        </div>
                        <div className="description">
                            {description}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default PopUp;