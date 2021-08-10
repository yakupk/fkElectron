import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const  initialState ={
    loading: false,
    queryResult : [],
    hasErrors: false,
    redirect : false,
    reRequest : false,
    partialPaymentResult:[]

};

export const fetchQueryResult  = createAsyncThunk("institution/QueryResult",(data)=>{
    return fetch(`${process.env.REACT_APP_API_URL_PATTERN}/invoice/query`,{
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) throw Error(response.error);
            return response.json();
        })
        .then(json => json);
});
const institutionQueryResultSlice = createSlice({
    name: 'QueryResult',
    initialState,
    reducers: {
         setQueryResult: (state) => {
            state.redirect=false;
        },
        setPartialPaymentResult:(state,action) => {
            state.partialPaymentResult=action.payload;
        }
    },
    extraReducers: {
        [fetchQueryResult.pending]: (state, action) => {
            state.loading = true;
            state.queryResult = [];
            state.hasErrors=false;
        },
        [fetchQueryResult.fulfilled]: (state, action) => {
            state.queryResult = action.payload;
            if(action.payload.errors !== "" || action.payload.hasOwnProperty('result')) {

            }
            state.hasErrors = false;
            if(action.payload.hasOwnProperty('result')){
                if (action.payload.result[0].items !== null) {
                    state.loading = false;
                    state.redirect = true;
                }else{ // for Prepaid Query
                    if (action.payload.result[0].error !==null && action.payload.result[0].error !==""){
                        state.loading = false;
                    }
                    state.reRequest = true;
                }

            }
        },
        [fetchQueryResult.rejected]: (state, action) => {
            state.loading = false;
            state.hasErrors = true;
            state.queryResult=[];
        }
    }

});


export const QueryResultSelector = state => state.QueryResult;
export const {setQueryResult,setPartialPaymentResult} = institutionQueryResultSlice.actions;
export default institutionQueryResultSlice.reducer

export function fetchPutQueryInfo(data) {
    return async dispatch => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL_PATTERN}/invoice/query/${data.token}/info`,{
                    method: 'PUT',
                    body: JSON.stringify({amount : data.amount})
                }
            );
            const resp = await response.json();
            if(resp.success && resp.hasOwnProperty('result')) {
                const newToken=[];
                newToken.push(resp.result[0].token);
                dispatch(fetchPostQueryInfo(newToken));
            }else{
                // TODO
                // ERRor HANDling
            }
            //await dispatch(fetchPostQueryInfo())
        } catch (error) {
            //TODO
            //error Handling
        }
    }
}
export function fetchPostQueryInfo(data) {
    return async dispatch => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL_PATTERN}/invoice/query/info`,{
                    method: 'POST',
                    body: JSON.stringify(data)
                }
            );
            const resp = await response.json();
            if (resp.success && resp.hasOwnProperty('result')) {
                await dispatch(setPartialPaymentResult(resp.result));
            }

        } catch (error) {
            //TODO
            //error Handling
        }
    }
}
