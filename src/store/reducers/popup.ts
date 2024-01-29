import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IPopup {
  isPopupOpen: boolean;
  popupType: string;
}

const initialState: IPopup = {
  isPopupOpen: false,
  popupType: '',
};

export const slice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setIsPopupOpenAction: (state, action: PayloadAction<boolean>) => {
      state.isPopupOpen = action.payload;
    },
    setPopupTypeAction: (state, action: PayloadAction<string>) => {
      state.popupType = action.payload;
    },
  },
});

const { actions, reducer } = slice;

export const { setIsPopupOpenAction, setPopupTypeAction } = actions;

export default reducer;
