import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import AppRouter from './routes';

ReactDOM.render(
    <AppRouter/>, document.getElementById('root'));
registerServiceWorker();
