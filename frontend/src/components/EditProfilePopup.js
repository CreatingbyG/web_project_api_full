import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';


function EditProfilePopup({isOpen, onClose, onUpdateUser}){
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '') ;
      setJob(currentUser.about || '');
    }
  }, [currentUser]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: job,
    });
    }

return (
    <PopupWithForm
        name="profile"
        title="Editar perfil"
        isOpen={isOpen}
        onClose={onClose}
        nameButton="Guardar"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="name-input"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="popup__container-texts-input-name form__input"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error name-input-error"></span>
        <input
          type="text"
          id="about-input"
          name="job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          className="popup__container-texts-input-info form__input"
          placeholder="Acerca de mi"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__input-error about-input-error"></span>
      </PopupWithForm>
)
}

export default EditProfilePopup;