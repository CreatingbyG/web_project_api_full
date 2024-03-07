import React, { useContext } from "react";

import vector from "../images/Vector (3).svg";
import addButton from "../blocks/button/add-button/add-button.css";
import editButton from "../blocks/button/edit-button/edit-button.css";
import Card from "./Card.js";
import ImagePopup from "./ImagePopup.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";



function Main({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleCardClick,
  handleCardLike,
  selectedCard,
  closeAllPopups,
  handleTrashClick,
  cards
}) {
  const currentUser = useContext(CurrentUserContext);



  return (
    <main className="content">
      <section className="profile">
        <img
          className="avatar"
          src={currentUser?.avatar}
          alt="imagen del rostro del determinado perfil"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        />
        <div className="profile__vector">
          <img
            className="vector"
            src={vector}
            alt="imagen del rostro del determinado perfil"
            onClick={handleEditAvatarClick}
          />
        </div>
        <div className="profile__description">
          <h2 className="profile__description-name">{currentUser?.name}</h2>
          <h3 className="profile__description-info">{currentUser?.about}</h3>
        </div>
        <button
          className="edit-button"
          src={editButton}
          onClick={handleEditProfileClick}
        ></button>
        <button
          className="add-button"
          src={addButton}
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      <section className="cardelements">
        {cards && cards.map((card) => (
        <Card
        key={card._id}
          card={card}
          onCardClick={handleCardClick}
          onDeleteCard={() => handleTrashClick(card)}
          onCardLike={handleCardLike}
        />
        ))}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </section>
    </main>
  );
}

export default Main;