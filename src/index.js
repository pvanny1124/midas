import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './simulator_components/App';
import LandingPage from './landingpage'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LandingPage />, document.getElementById('root'));
registerServiceWorker();
