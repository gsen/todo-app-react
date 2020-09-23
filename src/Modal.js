import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./modal.css"




const Modal = ({ open, onClose, onDismiss }) => {

    const onModalClose = () => {
        onClose();
    }
    const [input, setInput] = useState('');

    return open ? ReactDOM.createPortal(<div id="myModal" className="modal">
        <div className="modal-content">
            <div class="modal-header">
                <span className="close" onClick={onDismiss}>&times;</span>
                <h2 className="modal-title">Add a todo</h2>
            </div>
            <div class="modal-body">
                <form className="form-container" name="todo">
                    <input type="text" name="todoTitle" id="todoTitle" value={input} onChange={e => setInput(e.target.value)} />
                </form>
            </div>
            <div class="modal-footer">
                <div className="action-buttons">
                    <button disabled={!input} onClick={onModalClose}>+</button>
                </div>
            </div>
        </div>
    </div>,
        document.querySelector("#modal")) : null;
}


export default Modal;