import React from 'react';

import App from './App';
import Main from "./components/Main";
import NewMatch from "./components/new_match/NewMatch";
import {Route, BrowserRouter as Router} from 'react-router-dom';

const AppRouter = () => {
    return (
        <Router>
            <Route path="/" component={App}></Route>
        </Router>
    )
}

export default AppRouter;
