

import React from "react";
import closeButton from "../images/close_button.svg";

function ImagePopup({ card, onClose }) {
  return (
    card && (
      <div
        className={`popup popup_preview_images ${card ? "popup_opened" : ""}`}
      >
        <div className="popup__container">
          <button
            type="button"
            onClick={onClose}
            className="popup__container-btn-closed popup__container-btn-closed_images"
          >
            <img src={closeButton} alt="boton de cerrar" />
          </button>
          <div className="popup__container-img">
            <img id="img-card-popup" src={card.link} alt={card.name} />
          </div>
          <h3 className="img-card-name">{card.name}</h3>
        </div>
      </div>
    )
  );
}

export default ImagePopup;
