import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      nameRef.current.value = '';
      linkRef.current.value = '';
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="place"
      title="Nuevo lugar"
      isOpen={isOpen}
      onClose={onClose}
      nameButton="Crear"
      onSubmit={handleSubmit}
    >
      <input
        ref={nameRef}
        type="text"
        id="title-input"
        name="name"
        className="popup__container-texts-input-title form__input"
        placeholder="Titulo"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="form__input-error title-input-error"></span>
      <input
        ref={linkRef}
        type="url"
        id="url-input"
        name="link"
        className="popup__container-texts-input-link form__input"
        placeholder="Enlace a la imagen"
        required
      />
      <span className="form__input-error url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;