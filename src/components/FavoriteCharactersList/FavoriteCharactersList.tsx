import { useState, type FunctionComponent } from "react";
import "./FavoriteCharactersList.scss";
import CharacterCard from "../CharacterCard/CharacterCard";
import CharacterModal from "../CharacterModal/CharacterModal";
import type { Character } from "../../types/Character";

interface FavoriteCharactersListProps {
  favoriteCharacters: Character[];
  onRemoveFavorite: (character: Character) => void;
}

const FavoriteCharactersList: FunctionComponent<
  FavoriteCharactersListProps
> = ({ favoriteCharacters, onRemoveFavorite }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  if (favoriteCharacters.length === 0) {
    return (
      <div className="favorite-characters-list">
        <h2 className="favorite-characters-list__title">Favorite Characters</h2>
        <div className="favorite-characters-list__empty">
          <p>No favorite characters yet. Add some from the character list!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorite-characters-list">
      <h2 className="favorite-characters-list__title">
        Favorite Characters ({favoriteCharacters.length})
      </h2>
      <div className="favorite-characters-list__grid">
        {favoriteCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            variant="favorite"
            onRemoveFavorite={onRemoveFavorite}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default FavoriteCharactersList;
