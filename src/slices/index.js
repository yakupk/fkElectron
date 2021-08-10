import { combineReducers } from 'redux'

import categoriesReducer from './categories'
import institutionQueryResultReducer from './institutionQuery'
import basketReducer from './basket'
import posRatesReducer from './posRates'
import profileReducer from './me'

const appReducer = combineReducers({
  categories: categoriesReducer,
  QueryResult :institutionQueryResultReducer,
  basket : basketReducer,
  posRates:posRatesReducer,
  profile:profileReducer,
});

const rootReducer = (state, action) => {

  if (action.type === 'RESET_ALL_STATE') {
    console.log("RESET_ALL_STATE")
    const { categories, profile } = state;
    state = {categories, profile };
  }
  if (action.type === 'RESET_QUERY_RESULT_STATE') {
    console.log("RESET_QUERY_RESULT_STATE");
    const { categories, profile,posRates,basket} = state;
    state = {categories, profile,posRates,basket };
  }
  if (action.type === 'RESET_BASKET_STATE') {
    console.log("RESET_BASKET_STATE");
    const { categories, profile,posRates,QueryResult} = state;
    state = {categories, profile,posRates,QueryResult };
  }

  return appReducer(state, action);
};

export default rootReducer
