import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ISwipe = null | 'left' | 'right';

export type IStage = 'swipe' | 'view';

interface IApp {
  swipeType: ISwipe;
  swipeIndex: number;
  stage: IStage;
}

const initialState: IApp = {
  swipeType: null,
  swipeIndex: 0,
  stage: 'swipe',
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSwipeTypeAction: (state, action: PayloadAction<ISwipe>) => {
      state.swipeType = action.payload;
    },
    setSwipeIndexAction: (state, action: PayloadAction<number>) => {
      state.swipeIndex = action.payload;
    },
    setStageAction: (state, action: PayloadAction<IStage>) => {
      state.stage = action.payload;
    },
  },
});

const { actions, reducer } = slice;

export const { setSwipeTypeAction, setSwipeIndexAction, setStageAction } = actions;

export default reducer;
