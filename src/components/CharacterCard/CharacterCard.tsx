import React, { type FunctionComponent } from "react";
import { FiHeart, FiPlus, FiX } from "react-icons/fi";
import "./CharacterCard.scss";
import type { Character } from "../../types/Character";

interface CharacterCardProps {
  character: Character;
  variant?: "default" | "favorite";
  onToggleFavorite?: (character: Character) => void;
  onRemoveFavorite?: (character: Character) => void;
  onCardClick?: (character: Character) => void;
  isFavorite?: boolean;
}

const CharacterCard: FunctionComponent<CharacterCardProps> = ({
  character,
  variant = "default",
  onToggleFavorite,
  onRemoveFavorite,
  onCardClick,
  isFavorite = false,
}) => {
  const isFavoriteVariant = variant === "favorite";
  const baseClass = "character-card";

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavoriteVariant && onRemoveFavorite) {
      onRemoveFavorite(character);
    } else if (!isFavoriteVariant && onToggleFavorite) {
      onToggleFavorite(character);
    }
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(character);
    }
  };

  const getActionIcon = () => {
    if (isFavoriteVariant) {
      return <FiX size={20} />;
    }
    return isFavorite ? <FiHeart size={20} /> : <FiPlus size={20} />;
  };

  const getActionButtonClass = () => {
    if (isFavoriteVariant) {
      return `${baseClass}__remove-btn`;
    }
    return `${baseClass}__favorite-btn${isFavorite ? " favorited" : ""}`;
  };

  return (
    <div
      className={`${baseClass} ${
        onCardClick ? "character-card--clickable" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className={`${baseClass}__image`}>
        <img src={character.image} alt={character.name} />
      </div>
      <div className={`${baseClass}__content`}>
        <h3 className={`${baseClass}__name`}>{character.name}</h3>
        <button className={getActionButtonClass()} onClick={handleAction}>
          {getActionIcon()}
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
