import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Character } from "../../types/Character";

interface FavoritesState {
  favoriteCharacters: Character[];
  favoriteIds: number[];
  favoriteColor: string;
}

const FAVORITES_STORAGE_KEY = "rick-and-morty-favorites";
const FAVORITES_COLOR_STORAGE_KEY = "rick-and-morty-favorites-color";

const loadFavoritesFromStorage = (): Character[] => {
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Failed to load favorites from localStorage:", error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites: Character[]) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites to localStorage:", error);
  }
};

const initialState: FavoritesState = {
  favoriteCharacters: loadFavoritesFromStorage(),
  favoriteIds: loadFavoritesFromStorage().map((char) => char.id),
  favoriteColor: localStorage.getItem(FAVORITES_COLOR_STORAGE_KEY) || "red",
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      if (!state.favoriteIds.includes(character.id)) {
        state.favoriteCharacters.push(character);
        state.favoriteIds.push(character.id);
        saveFavoritesToStorage(state.favoriteCharacters);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      state.favoriteCharacters = state.favoriteCharacters.filter(
        (char) => char.id !== character.id
      );
      state.favoriteIds = state.favoriteIds.filter((id) => id !== character.id);
      saveFavoritesToStorage(state.favoriteCharacters);
    },
    toggleFavorite: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      if (state.favoriteIds.includes(character.id)) {
        state.favoriteCharacters = state.favoriteCharacters.filter(
          (char) => char.id !== character.id
        );
        state.favoriteIds = state.favoriteIds.filter(
          (id) => id !== character.id
        );
      } else {
        state.favoriteCharacters.push(character);
        state.favoriteIds.push(character.id);
      }
      saveFavoritesToStorage(state.favoriteCharacters);
    },
    clearFavorites: (state) => {
      state.favoriteCharacters = [];
      state.favoriteIds = [];
      saveFavoritesToStorage([]);
    },
    setFavoriteColor: (state, action: PayloadAction<string>) => {
      state.favoriteColor = action.payload;
      localStorage.setItem(FAVORITES_COLOR_STORAGE_KEY, action.payload);
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
  setFavoriteColor,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
