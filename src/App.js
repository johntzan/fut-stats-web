import React, {Component} from 'react';
import NewMatch from "./components/new_match/NewMatch";
import Stats from './components/stats/Stats';
import ViewGames from './components/view_games/ViewGames';
import EditGame from './components/edit_game/EditGame';
import Main from './components/Main';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import HeadRoom from 'react-headroom';
import {
  Container,
  Button } from 'reactstrap';
class App extends Component {

  render() {
    return (
      <div>
        <HeadRoom>
            <div className="header-div">
            <Container className="container-header">
            <h3 className="title-bar">Fut Stats</h3>
            </Container>
            </div>
        </HeadRoom>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route path="/new-match" component={NewMatch}></Route>
          <Route path="/my-stats" component={Stats}></Route>
          <Route path="/view-games" component={ViewGames}></Route>
          <Route path="/edit-game" component={EditGame}></Route>
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
