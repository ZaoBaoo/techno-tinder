import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ISwipe = null | 'left' | 'right';

interface IPopup {
  isPopupOpen: boolean;
  popupType: string;
  swipeType: ISwipe;
  swipeIndex: number;
}

const initialState: IPopup = {
  isPopupOpen: false,
  popupType: '',
  swipeType: null,
  swipeIndex: 0,
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
    setSwipeTypeAction: (state, action: PayloadAction<ISwipe>) => {
      state.swipeType = action.payload;
    },
    setSwipeIndexAction: (state, action: PayloadAction<number>) => {
      state.swipeIndex = action.payload;
    },
  },
});

const { actions, reducer } = slice;

export const { setIsPopupOpenAction, setPopupTypeAction, setSwipeTypeAction, setSwipeIndexAction } = actions;

export default reducer;
