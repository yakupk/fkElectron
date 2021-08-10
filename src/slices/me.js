import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const initialState = {
    hasErrors: false,
    profile: {},
};
export const fetchProfile = createAsyncThunk("me",()=>{
    return fetch(`${process.env.REACT_APP_API_URL_PATTERN}/me`,{})
        .then(response => {
            if (!response.ok) throw Error(response.error);
            return response.json();
        })
        .then(json => json);
});

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: {
        [fetchProfile.fulfilled]: (state, action) => {
            state.profile = action.payload;
            state.hasErrors = false;
        },
        [fetchProfile.rejected]: (state) => {
            state.hasErrors = true;
        }
    }
});

export const profileSelector = state => state.profile;
export default profileSlice.reducer
