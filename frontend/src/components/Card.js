import React, { useContext } from "react";
import trash from "../images/Trash.svg";
import iconLike from "../images/Group.svg"
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onDeleteCard, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButton = `card__delete-button ${
    isOwn ? "icons__delete" : "icons__delete_hide"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButton = `card__like-button ${
    isLiked ? "icons__liked" : "icons__dislike"
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onDeleteCard(card);
  };

  return (
    <div className="card" onClick={() => onCardClick(card)}>
      <div className="card__image">
        <img
          className="card-photo"
          src={card.link}
          alt={card.name}
          style={{ backgroundImage: `url(${card.link})` }}
        />
      </div>
      <div className="icons">
        <img
          className={cardDeleteButton}
          src={trash}
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteClick()
          }}
          alt="icono para eliminar imagen o modificar"
        />
        <img
          className={cardLikeButton}
          src={iconLike} 
          onClick={(event) => {
            event.stopPropagation();
            handleLikeClick();
          }}
          alt="icono de like"
        />
      </div>
      <p className="card__image-text">{card.name}</p>
      <div className="icons__like_number">
        {card.likes.length > 0 ? card.likes.length : [""]}
      </div>
    </div>
  );
}

export default Card;
