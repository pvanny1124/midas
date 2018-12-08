//use combineReducers to package all of the reducers in one.
import { combineReducer } from 'redux';
import { rootReducer } from './rootReducer';

/* ----------------------------------------------------------------------
    initialState holds the initial state of our react application
    parameters:

    @isUserAuthenticated -> 
    @currentUser ->

*----------------------------------------------------------------------*/

const initialState = {
    isUserAuthenticated: false,
    fetching: true,
    fetched: false, //dont show users object
    currentUser: null,
    ticker: null
}



