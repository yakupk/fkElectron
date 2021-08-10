import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
export const  initialState ={
    selectedItemsStore : [],
    redirect: false,
    selectedBkmId:0,
    selectedInstallationNumber : 1 ,
    posTransactionLoading : false,
    posTransactionResponse : {},
    posTransactionError : {},
    posTransactionStatusResponse : {}
};


export const fetchPosTransaction  = createAsyncThunk("invoice/pos-transaction",(data)=>{
    return fetch(`${process.env.REACT_APP_API_URL_PATTERN}/invoice/pos-transaction`,{
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) throw Error(response.error);
            return response.json();
        })
        .then(json => json);
});


const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addItem: (state,action) => {
            state.selectedItemsStore = action.payload.selectedItems
            state.redirect = true;
        },
        setState:(state,action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                console.log(`${key}: ${value}`);
                state[key]= value
            }
        },
        makeEmpty:(state)=>{
            state.selectedItemsStore = []
        },
        redirectStep :(state) => {
            state.redirect = false;
        },
        setSelectedBkm:(state,action) => {
            console.log("setSelectedBkm")
            state.redirect = true;
            state.selectedBkmId = action.payload.id;
        },
        setInstallationNumber:(state,action) => {
            console.log("setInstallationNumber")
            state.redirect = true;
            state.selectedInstallationNumber = action.payload.installationNumber;
        },
        postTransactionStatusResponseAction : (state, action)=>{
            console.log("ACTİON ::::",action.payload)
            state.posTransactionStatusResponse= action.payload
        },
        setPostTransactionLoading : ( state,action)=>{
            state.posTransactionLoading = action.payload.status;
        },
        postTransactionStatusResponseErrorAction : (state, action)=> {
            // TODO
            // hata senaryosu için
            state.posTransactionLoading = false;
            state.posTransactionResponse = {};
            state.posTransactionError = action.payload;
            state.posTransactionStatusResponse = {};
        },
        prepaidCardTransactionStatusResponseAction : (state, action)=> {
          console.log("Card Transaction action PAyload",action.payload);
        },
        prepaidCardTransactionStatusResponseErrorAction : (state, action)=> {
            // TODO
            // hata senaryosu için
            state.posTransactionLoading = false;
            state.posTransactionResponse = {};
            state.posTransactionError = action.payload;
            state.posTransactionStatusResponse = {};
        },
    },
    extraReducers: {
        [fetchPosTransaction.pending]: (state) => {
           state.posTransactionLoading = true
        },
        [fetchPosTransaction.fulfilled]: (state, action) => {
            state.posTransactionResponse =action.payload
        },
        [fetchPosTransaction.rejected]: (state, action) => {
            state.posTransactionLoading = false;
            state.posTransactionError = action.payload;
        },

    },

});
export const BasketSelector = state => state.basket;
export const {addItem,makeEmpty,redirectStep,setSelectedBkm,setInstallationNumber,
    postTransactionStatusResponseAction,
    postTransactionStatusResponseErrorAction,
    prepaidCardTransactionStatusResponseAction,
    prepaidCardTransactionStatusResponseErrorAction,
    setPostTransactionLoading,
    setState

} = basketSlice.actions;
export default basketSlice.reducer;

export function fetchPosTransactionStatus(data) {
    return async dispatch => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL_PATTERN}/invoice/${data.id}/pos-transaction`
            );
            const resp = await response.json();
            await dispatch(postTransactionStatusResponseAction(resp))
        } catch (error) {
            await dispatch(postTransactionStatusResponseErrorAction(error))
        }
    }
}
export function fetchPrePaidCardTransactionStatus(data) {
    return async dispatch => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL_PATTERN}/invoice/${data.id}/detail`
            );
            const resp = await response.json();
            await dispatch(prepaidCardTransactionStatusResponseAction(resp))
        } catch (error) {
            await dispatch(prepaidCardTransactionStatusResponseErrorAction(error))
        }
    }
}
