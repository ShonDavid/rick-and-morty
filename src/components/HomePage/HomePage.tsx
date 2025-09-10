import { useEffect, type ChangeEvent, type FunctionComponent } from "react";
import "./HomePage.scss";
import CharacterList from "../CharacterList/CharacterList";
import FavoriteCharactersList from "../FavoriteCharactersList/FavoriteCharactersList";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import {
  fetchCharacters,
  goToPage,
  refresh,
  setSearchQuery,
} from "../../store/slices/charactersSlice";
import {
  toggleFavorite,
  removeFromFavorites,
  setFavoriteColor,
} from "../../store/slices/favoritesSlice";
import type { CharactersState } from "../../store/slices/charactersSlice";
import type { Character } from "../../types/Character";

const Main: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, totalPages, totalItems, characters, loading, error } =
    useSelector((state: RootState) => state.characters as CharactersState);

  const { favoriteCharacters, favoriteIds, favoriteColor } = useSelector(
    (state: RootState) => (state as RootState).favorites
  );

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(fetchCharacters({ page: 1 }));
  };

  const handleGoToPage = (page: number) => {
    dispatch(goToPage(page));
    dispatch(fetchCharacters({ page }));
  };

  const handleRefresh = () => {
    dispatch(refresh());
    dispatch(fetchCharacters({ page: 1 }));
  };

  const handleToggleFavorite = (character: Character) => {
    dispatch(toggleFavorite(character));
  };

  const handleRemoveFromFavorites = (character: Character) => {
    dispatch(removeFromFavorites(character));
  };

  const handleFavoriteColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFavoriteColor(e.target.value));
  };

  useEffect(() => {
    dispatch(fetchCharacters({ page: 1 }));
  }, [dispatch]);

  return (
    <main className="main">
      <div className="main__container">
        <SearchBar onSearch={handleSearch} />
        <div className="main__content">
          <div className="main__characters">
            {error ? (
              <div className="main__error">
                <h2>Error loading characters</h2>
                <p>{error.message}</p>
                <button onClick={handleRefresh}>Try Again</button>
              </div>
            ) : loading && characters.length === 0 ? (
              <div className="loading">
                <h2>Loading characters...</h2>
              </div>
            ) : (
              <CharacterList
                characters={characters}
                onToggleFavorite={handleToggleFavorite}
                favoriteIds={favoriteIds}
              />
            )}
          </div>
          <div className={`main__favorites main__favorites--${favoriteColor}`}>
            <select
              className="main__favorites-select"
              onChange={handleFavoriteColorChange}
              value={favoriteColor}
            >
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
            <FavoriteCharactersList
              favoriteCharacters={favoriteCharacters}
              onRemoveFavorite={handleRemoveFromFavorites}
            />
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={handleGoToPage}
          loading={loading}
        />
      </div>
    </main>
  );
};

export default Main;
