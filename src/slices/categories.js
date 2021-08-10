import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const initialState = {
  loading: true,
  hasErrors: false,
  categories: [],
};
export const fetchCategories = createAsyncThunk("categories/getCaterigories",()=>{
    return fetch(`${process.env.REACT_APP_API_URL_PATTERN}/institution`,{})
      .then(response => {
        if (!response.ok) throw Error(response.error);
        return response.json();
      })
      .then(json => json);
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      console.log(action.payload);
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchCategories.rejected]: (state, action) => {
      console.log(action);
      console.log(action.payload);
      console.log(state);
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

export const categoriesSelector = state => state.categories;
export default categoriesSlice.reducer

