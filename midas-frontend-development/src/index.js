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

//middleware package for async ops
import thunk from 'redux-thunk';

//generate the store for the entire application
const store = createStore(reducers);

/*----------------------------------------------------------------
            REDUX MIDDLEWARE

            -could intercept every single action that comes through
            -could also cancel that action or modify it
            -must pass into third argument of store.
--------------------------------------------------------*/

//log the prev, current, and next state on the console for debugging purposes..
const logger = (store) => (next) => (action) => {

    //do something with the action (cancel or modify)
    console.log(action); /*debug*/

    //modify
    action.type = "DEC";

    //continue on to reducer and pass the action
    next(action)
}

//test whether the action will return an error before moving on
const error = (store) => (next) => (action) => {

    try {
        next(action)
    } catch (error){
        console.log(error);
    }
}

//apply middleware
const middleware = applyMiddleware(logger(), thunk, logger, error);

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
