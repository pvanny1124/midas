// combineReducers is used to package all reducers under one object mapped to a 
// specific state that the reducer is supposed to change/update
import { combineReducers } from "redux";

// import all necessary reducers
import showSuggestionsReducer from './suggestionBoxReducers/showSuggestionsReducer';
import fetchedReducer from './fetchedReducer';
import fetchingReducer from './fetchingReducer';
import authenticationReducer from './authenticationReducer';
import stocksFoundReducer from './suggestionBoxReducers/stocksFoundReducer';
import filteredSuggestionsReducer from './suggestionBoxReducers/filteredSuggestionsReducer';
import activeSuggestionReducer from './suggestionBoxReducers/activeSuggestionReducer';
import suggestionsReducer from './suggestionBoxReducers/suggestionsReducer';
import tickerReducer from './tickerReducer';
import userInputReducer from './suggestionBoxReducers/userInputReducer';
import signupReducer from './signupReducers/signupReducer';
import loginReducer from './loginReducers/loginReducer';

const rootReducer = combineReducers({
        //map specific reducers to the state variables that they are supposed to handle
        currentUser: authenticationReducer,
        fetched: fetchedReducer,
        fetching: fetchingReducer,
        suggestions: suggestionsReducer,
        stocksFound: stocksFoundReducer,
        showSuggestions: showSuggestionsReducer,
        filteredSuggestions: filteredSuggestionsReducer,
        activeSuggestion: activeSuggestionReducer,
        ticker: tickerReducer,
        userInput: userInputReducer, //suggestionbox
        registrationFields: signupReducer,
        loginFields: loginReducer

})

export default rootReducer;




