import React, { useEffect, useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = useRef();
  const linkRef = useRef();
  const [linkError, setLinkError] = useState(''); // Estado para el mensaje de error del link


  useEffect(() => {
    if (!isOpen) {
      nameRef.current.value = '';
      linkRef.current.value = '';
      setLinkError('');
    }
  }, [isOpen]);

  function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const link = linkRef.current.value;

    // Validación del link
    if (!isValidHttpUrl(link)) {
      setLinkError('El enlace ingresado no es una URL válida.'); // Detiene la ejecución si el link no es válido
    } else {
      setLinkError(''); // Limpia el mensaje de error si el link pasa la validación
    }

    onAddPlace({
      name,
      link,
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
      {linkError && <span className="form__input-error url-input-error">{linkError}</span>}
    </PopupWithForm>
  );
}

export default AddPlacePopup;