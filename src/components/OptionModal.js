import React from "react";
import Modal from "react-modal";

Modal.setAppElement('#app');

const OptionModal = (props) => {

    //aca tengo solo un return, podria usar el shorthand de hacer => ()
    return(
        <Modal
          isOpen={!!props.selectedOption}
          onRequestClose={props.handleClearSelected} //esto se activa cuando alguien aprieta escape o clickea fuera
          contentLabel={"Selected Option"}
          closeTimeoutMS={200}
          className="modal" // esto se va a agregar a ReactModal__Content y ReactModal__Content--after-open
        >
            <h3 className="modal__title">Selected Option</h3>
            {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
            <button className="button" onClick={props.handleClearSelected} >Ok</button>
            {/* esto va a llamar a handler que limpia el selectedOption del state en el parent */}
        </Modal>
    )

}

export default OptionModal;