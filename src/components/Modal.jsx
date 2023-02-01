
const Modal = ({open, onClose})=>{
    if(!open) return null;

    return(
        <div onClick={onClose} className="overlay">
            <div onClick={(e) => {
                e.stopPropagation();
            }}
            className='modalContainer'></div>
            <div><p>Helleoo</p></div>
        </div>
    )
}
export default Modal;