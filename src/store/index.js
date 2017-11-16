import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { LoginReducer } from './reducers/login';
import { FieldReducer } from './reducers/field'



const rootReducer = combineReducers({
    LoginReducer,FieldReducer
});
const middle = applyMiddleware(thunk, logger);

export const store = createStore(rootReducer, middle)
