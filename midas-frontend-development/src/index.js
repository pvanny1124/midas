import React from 'react';
import ReactDOM from 'react-dom';
import App from './landingpage'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    // wrap the entire wrap with Provider to pass down the store state 
    // available to anything within the <App /> component
        <App />, document.getElementById('root')
);

registerServiceWorker();
