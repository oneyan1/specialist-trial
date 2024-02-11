import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Specialist, UpdateSpecialist } from "../../types";
import mock from "../../../MOCK.json";

type SpecialistsState = {
  specialistsList?: Specialist[];
  favoriteSpecialistList?: Specialist[];
  searchKey?: string;
};

const initialState: SpecialistsState = {
  specialistsList: mock,
  favoriteSpecialistList: [],
};

const specialistsSlice = createSlice({
  name: "specialists",
  initialState,
  reducers: {
    updateSpecialist: (state, action: PayloadAction<UpdateSpecialist>) => {
      state.specialistsList = state.specialistsList.map((item) =>
        item.id === action.payload.id ? action.payload.newValue : item
      );
    },
    setFavorites: (state, action: PayloadAction<Specialist>) => {
      const isFav = state.favoriteSpecialistList.find(
        (item) => item.id === action.payload.id
      );

      if (isFav) {
        state.favoriteSpecialistList = state.favoriteSpecialistList.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.favoriteSpecialistList.push(action.payload);
      }
    },
    setSearchElement: (state, action: PayloadAction<string>) => {
      if (action.payload === "") {
        state.searchKey = undefined;
        state.specialistsList = mock;
      } else {
        state.searchKey = action.payload;
        specialistsSlice.caseReducers.filteredList(state);
      }
    },

    filteredList: (state) => {
      state.specialistsList = mock.filter((item) =>
        item.fullName.includes(state.searchKey)
      );
    },
  },
});

export const { updateSpecialist, setFavorites, setSearchElement } =
  specialistsSlice.actions;

export default specialistsSlice.reducer;
