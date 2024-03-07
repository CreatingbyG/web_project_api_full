import React from "react";
import successfulIcon from "../images/succesful.svg";
import errorIcon from "../images/failedicon.svg"
import closeButton from "../images/close_button.svg";

const InfoTooltip = ({ isOpen, onClose, isSuccess, message }) => {
    return (
      <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <img
            src={isSuccess ? successfulIcon : errorIcon}
            alt={isSuccess ? "Registro exitoso" : "Error de registro"}
            className="popup__container-img popup__container-img-register"
          />
          <p className="popup__container-register_text">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="popup__container-btn-closed popup__container-btn-closed_register"
          >
            <img src={closeButton} alt="botón de cerrar" />
          </button>
        </div>
      </div>
    );
  };
export default InfoTooltip;
