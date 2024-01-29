import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IFetchData {
  data: {};
  status: string;
}

const initialState: IFetchData = {
  data: {},
  status: '',
};

// export const fetching = createAsyncThunk('')

export const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
});

const { actions, reducer } = slice;

export const {} = actions;

export default reducer;
