import React, {Component} from 'react';
import NewMatch from "./components/new_match/NewMatch";
import Main from './components/Main';
import {Route, Switch} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        <h3 className="title-bar text-center">FUT STATS</h3>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route path="/new-match" component={NewMatch}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
