// combineReducers is used to package all reducers under one object mapped to a 
// specific state that the reducer is supposed to change/update
import { combineReducers } from "redux";

// import all necessary reducers
import userReducer from './userReducer';
import showSuggestionsReducer from './showSuggestionsReducer';
import fetchedReducer from './fetchedReducer';
import fetchingReducer from './fetchingReducer';
import authenticationReducer from './authenticationReducer';
import stocksFoundReducer from './stocksFoundReducer';
import filteredSuggestionsReducer from './filteredSuggestionsReducer';
import activeSuggestionReducer from './activeSuggestionReducer';
import suggestionsReducer from './suggestionsReducer';
import tickerReducer from './tickerReducer';
import userInputReducer from './userInputReducer';

const rootReducer = combineReducers({
        //map specific reducers to the state variables that they are supposed to handle
        currentUser: userReducer,
        fetched: fetchedReducer,
        fetching: fetchingReducer,
        isUserAuthenticated: authenticationReducer,
        suggestions: suggestionsReducer,
        stocksFound: stocksFoundReducer,
        showSuggestions: showSuggestionsReducer,
        filteredSuggestions: filteredSuggestionsReducer,
        activeSuggestion: activeSuggestionReducer,
        ticker: tickerReducer,
        userInput: userInputReducer

})

export default rootReducer;




