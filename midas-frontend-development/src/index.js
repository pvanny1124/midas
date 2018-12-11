import React from 'react';
import ReactDOM from 'react-dom';
import App from './landingpage'
import registerServiceWorker from './registerServiceWorker';

//Provider is used to wrap top level component with store-state
import { Provider } from 'react-redux';

//use createStore to create a store, use applyMiddleware to cancel or reject actions before a reducer is applied on the action
import { applyMiddleware, createStore } from 'redux';

//import all reducers we've created
import reducers from './reducers';

//used to display previous state, current action, and next state
import { logger } from 'redux-logger'; 
import { createLogger } from "redux-logger";
//middleware package for async ops
import thunk from 'redux-thunk';

//initial state of application
const initialState = {
    // use this attribute for authorization
    isUserAuthenticated: false,
    fetching: true,
    // dont show users object
    fetched: false, 
    // Holds current users information
    currentUser: null,
    ticker: null,
    // need to pass in list of tickers from IEX for suggestion box
    suggestions: [], 
    // check if the stocks from IEX were properly loaded
    stocksFound: false,
    // check which suggestion is activated by the user
    activeSuggestion: 0,
    // The suggestions that match the user's input
    filteredSuggestions: [],
    // Whether or not the suggestion list is shown
    showSuggestions: false,
    // What the user has entered
    userInput: "",
    // Redirect if the user has entered a stock
    redirect: false
}

/*----------------------------------------------------------------
            REDUX MIDDLEWARE

            -could intercept every single action that comes through
            -could also cancel that action or modify it
            -must pass into third argument of store.
--------------------------------------------------------*/
// const logger = createLogger()
const middleware = applyMiddleware(thunk, logger);

//generate the store for the entire application
const store = createStore(reducers, initialState, middleware);


ReactDOM.render(
    // wrap the entire wrap with Provider to pass down the store state 
    // available to anything within the <App /> component
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

//listen to and display state changes for debugging purposes..
store.subscribe(() => {
    //when anything changes in the store, display the store state
    console.log("store has changed", store.getState());
})

registerServiceWorker();
