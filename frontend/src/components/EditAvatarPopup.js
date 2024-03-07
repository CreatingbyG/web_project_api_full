import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
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
        <span className="form__input-error url-input-error"></span>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;