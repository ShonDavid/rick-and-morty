import { useState, type FunctionComponent } from "react";
import "./CharacterList.scss";
import CharacterCard from "../CharacterCard/CharacterCard";
import CharacterModal from "../CharacterModal/CharacterModal";
import type { Character } from "../../types/Character";

interface CharacterListProps {
  characters: Character[];
  onToggleFavorite: (character: Character) => void;
  favoriteIds: number[];
}

const CharacterList: FunctionComponent<CharacterListProps> = ({
  characters,
  onToggleFavorite,
  favoriteIds,
}) => {
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

  return (
    <div className="character-list">
      <h2 className="character-list__title">All Characters</h2>
      <div className="character-list__grid">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            variant="default"
            onToggleFavorite={onToggleFavorite}
            onCardClick={handleCardClick}
            isFavorite={favoriteIds.includes(character.id)}
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

export default CharacterList;
