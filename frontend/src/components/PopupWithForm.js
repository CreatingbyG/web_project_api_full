
import React from "react";
import closeButton from "../images/close_button.svg";

function PopupWithForm({ name, title, children, isOpen, onClose, nameButton, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <form
        className={`popup__container ${
          name === "avatar" ? "popup__container-texts-edit" : ""
        } ${name === "deleting" ? "popup__container_deleting" : ""}`}
        noValidate
        onSubmit={onSubmit}
      >
        <fieldset
          className={`popup__container-texts ${
            name === "deleting" ? "popup__container-texts-deleting" : ""
          }`}
        >
          <h3 className="popup__container-title">{title}</h3>
          {children}
          <button
            type="button"
            className={`popup__container-btn-closed ${
              name === "avatar" ? "popup__container-btn-closed-edit" : ""
            } ${
              name === "deleting" ? "popup__container-btn-closed-deleting" : ""
            }`}
            onClick={onClose}
          >
            <img src={closeButton} alt="boton de cerrar" />
          </button>
        </fieldset>
        <fieldset className="popup__handlers">
          <button 
            type="submit"
            className="popup__handlers-button form__submit"
          >
            {nameButton}
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default PopupWithForm;
