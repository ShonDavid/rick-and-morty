import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Character } from "../../types/Character";
import RickAndMortyApiService, {
  type ApiError,
} from "../../services/rickAndMortyApi";
import type { RootState } from "..";

type CharactersState = {
  characters: Character[];
  loading: boolean;
  error: ApiError | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  searchQuery: string;
};

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  searchQuery: "",
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async ({ page }: { page: number }, { getState }) => {
    const searchQuery = (getState() as RootState).characters.searchQuery;
    if (searchQuery) {
      const data = await RickAndMortyApiService.searchCharacters(
        searchQuery,
        page
      );
      return { data, page };
    }
    const data = await RickAndMortyApiService.getCharacters(page);
    return { data, page };
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      state.characters = [];
      state.loading = true;
    },
    goToPage: (state, action: PayloadAction<number>) => {
      const page = action.payload;
      if (
        page >= 1 &&
        page <= state.totalPages &&
        page !== state.currentPage &&
        !state.loading
      ) {
        state.currentPage = page;
      }
    },
    refresh: (state) => {
      state.currentPage = 1;
      state.characters = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        const { data, page } = action.payload;
        state.loading = false;
        state.characters = data.results;
        state.totalPages = data.info.pages;
        state.totalItems = data.info.count;
        state.currentPage = page;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as ApiError;
        if (action.meta.arg.page === 1) {
          state.characters = [];
        }
      });
  },
});

export const { goToPage, refresh, setSearchQuery } = charactersSlice.actions;
export type { CharactersState };

export default charactersSlice.reducer;
