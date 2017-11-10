import React, {Component} from 'react';
import './App.css';
import {Header, Input} from "semantic-ui-react";
import NewMatch from "./components/new_match/NewMatch";
import Main from './components/Main';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      welcomeTxtState: 'state txt'
    }

  }

  update(e) {
    this.setState({welcomeTxtState: e.target.value})
  }

  render() {
    let welcomeTxt = this.props.welcomeTxt;
    return (
      <div>
        <Header as="h1" textAlign="center" className="title-bar">FUT STATS</Header>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route path="/new-match" component={NewMatch}></Route>
        </Switch>
      </div>
    );
  }
}

/* <InputWidget update={this
  .update
  .bind(this)}/>
<h3>{this.state.welcomeTxtState}</h3> */

const InputWidget = (props) => {
  return (
    <div>
      <Input type="text" onChange={props.update}></Input>
    </div>
  );
};

export default App;
