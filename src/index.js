import React from 'react';
import { render } from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './slices'
import { createBrowserHistory } from 'history'
import reportWebVitals from './reportWebVitals';
import {HashRouter} from "react-router-dom";
import App from "./App";
import Route from "./router"

const store = configureStore({ reducer: rootReducer });
export const history = createBrowserHistory();

render(
    <Provider store={store}>
        <HashRouter>
          <App>
            <Route history={history} />
          </App>
        </HashRouter>
    </Provider>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { store }
