import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './routes';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <AppRouter/>, document.getElementById('root'));
registerServiceWorker();
