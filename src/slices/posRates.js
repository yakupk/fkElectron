import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const initialState = {
    loading: true,
    hasErrors: false,
    posRates: {},
};
export const fetchPosRates = createAsyncThunk("posRates/getPosRates",()=>{
    return fetch(`${process.env.REACT_APP_API_URL_PATTERN}/invoice/pos-rates`,{})
        .then(response => {
            if (!response.ok) throw Error(response.error);
            return response.json();
        })
        .then(json => json);
});

const posRatesSlice = createSlice({
    name: 'posRates',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchPosRates.pending]: (state) => {
            state.loading = true;
        },
        [fetchPosRates.fulfilled]: (state, action) => {
            state.posRates = action.payload;
            state.loading = false;
            state.hasErrors = false;
        },
        [fetchPosRates.rejected]: (state) => {
            state.loading = false;
            state.hasErrors = true;
        }
    }
});
export const posRatesSelector = state => state.posRates;
export default posRatesSlice.reducer
