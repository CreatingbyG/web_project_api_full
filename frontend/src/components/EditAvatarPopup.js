import React, { useEffect, useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const [avatarError, setAvatarError] = useState(''); // Estado para el mensaje de error del avatar


  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = '';
      setAvatarError('');
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
    const avatarUrl = avatarRef.current.value;

    // Validación del enlace del avatar
    if (!isValidHttpUrl(avatarUrl)) {
      setAvatarError('El enlace ingresado no es una URL válida.');
    } else {
      setAvatarError(''); // Limpia el mensaje de error si el enlace pasa la validación
    }

    onUpdateAvatar({
      avatar: avatarUrl,
    });
  }

  return (
    <PopupWithForm
        name="avatar"
        title="Cambiar foto de perfil"
        isOpen={isOpen}
        onClose={onClose}
        nameButton="Cambiar"
        onSubmit={handleSubmit}
      >
        <input
        ref={avatarRef}
          type="url"
          id="avatar-input"
          name="link"
          className="popup__container-texts-input-link form__input"
          placeholder="Enlace a la url"
          required
        />
         {avatarError && <span className="form__input-error avatar-url-input-error">{avatarError}</span>}
      </PopupWithForm>
  );
}

export default EditAvatarPopup;