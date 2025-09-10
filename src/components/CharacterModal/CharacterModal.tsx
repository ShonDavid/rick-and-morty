import { type FunctionComponent } from "react";
import { FiX } from "react-icons/fi";
import "./CharacterModal.scss";
import type { Character } from "../../types/Character";

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

const CharacterModal: FunctionComponent<CharacterModalProps> = ({
  character,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !character) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="character-modal__backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="character-modal">
        <div className="character-modal__header">
          <h2 className="character-modal__title">{character.name}</h2>
          <button
            className="character-modal__close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="character-modal__content">
          <div className="character-modal__image">
            <img src={character.image} alt={character.name} />
          </div>

          <div className="character-modal__details">
            <div className="character-modal__detail-item">
              <span className="character-modal__label">Status:</span>
              <span
                className={`character-modal__value character-modal__status character-modal__status--${character.status.toLowerCase()}`}
              >
                {character.status}
              </span>
            </div>

            <div className="character-modal__detail-item">
              <span className="character-modal__label">Species:</span>
              <span className="character-modal__value">
                {character.species}
              </span>
            </div>

            <div className="character-modal__detail-item">
              <span className="character-modal__label">Gender:</span>
              <span className="character-modal__value">{character.gender}</span>
            </div>

            <div className="character-modal__detail-item">
              <span className="character-modal__label">Episodes:</span>
              <span className="character-modal__value">
                {character.episode.length} episodes
              </span>
            </div>

            <div className="character-modal__detail-item">
              <span className="character-modal__label">Origin:</span>
              <div className="character-modal__origin-details">
                <span className="character-modal__value">
                  {character.origin.name}
                </span>
                {character.type && (
                  <span className="character-modal__origin-type">
                    Type: {character.type}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
