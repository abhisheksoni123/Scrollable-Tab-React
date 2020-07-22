import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose={props.handleClearSelectedOption}
        closeTimeoutMS={200}
        className= "modal"
        message={props.modalMessage}>
        <h3 >{props.modalMessage}</h3>
        <button className="modal_button" onClick={props.handleClearSelectedOption}>Okay</button>
    </Modal>
);;

export default OptionModal;

