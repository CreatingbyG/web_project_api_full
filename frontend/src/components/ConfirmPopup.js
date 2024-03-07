import React from "react";
import PopupWithForm from './PopupWithForm.js';

function ConfirmPopup({isOpen, onClose, onDeleteCard, cardToDelete}){
    const handleSubmit = (event) => {
        event.preventDefault();
        onDeleteCard(cardToDelete);
    }

    return (
        <PopupWithForm
          name="deleting"
          title="¿Estás seguro/a?"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          nameButton="Si"
        ></PopupWithForm> 
      )
}

export default ConfirmPopup;