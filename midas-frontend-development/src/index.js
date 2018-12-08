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

//generate the store for the entire application
const store = createStore(reducers);

ReactDOM.render(
    // wrap the entire wrap with Provider to pass down the store state 
    // available to anything within the <App /> component
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
