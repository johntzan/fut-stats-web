import React, {Component} from 'react';
import NewMatch from "./components/new_match/NewMatch";
import Stats from './components/stats/Stats';
import ViewGames from './components/view_games/ViewGames';
import EditGame from './components/edit_game/EditGame';
import Main from './components/Main';
import LoginPage from './components/login/LoginPage';
import {Link} from 'react-router-dom';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import HeadRoom from 'react-headroom';
import { Container, Row, Col, Dropdown, DropdownMenu, DropdownItem, DropdownToggle} from 'reactstrap';
import MdAccountCircle from 'react-icons/lib/md/account-circle';

import firebase from './config/firebase-config.js';

function PrivateRoute ({component: Component, authed, loading, ...rest}) {
  if (!loading){
    return (
        <Route
          {...rest}
          render={(props) => authed
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
  } 
  return null
}

function PublicRoute ({component: Component, authed, loading, ...rest}) {
  if (!loading){
    return (
        <Route
          {...rest}
          render={(props) => authed
            ? <Redirect to={{pathname: '/my-stats', state: {from: props.location}}} />
            : <Component {...props} />}
        />
    )
  } 
  return null
}

const auth = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true;
  },
  signout() {
    this.isAuthenticated = false;
  }
}

const LogoutButton = (props) => (
  auth.isAuthenticated && (
    <DropdownItem onClick={props.logout}>Logout</DropdownItem>
  ) 
);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      dropdownOpen: false,
      isLoading: true
    };

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        auth.authenticate();
        this.setState({ 
          user: user,
          isLoading: false
        });
      }
      else{
        this.setState({ 
          user: user, //would be null here
          isLoading: false
        });
      }
    });
  }

  logout(){
    const thisComp = this; //either declare this outside funciton, or use arrow function below. or else this refers to functions this below.
    firebase.auth().signOut().then(function() {
      // Sign-out successful.\
      auth.signout();
      thisComp.setState({
      user: null,
      isLoading: false
    });
    thisComp.props.history.push('/login');
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });

  }

  render() {
    return (
      <div>
        <HeadRoom>
            <div className="header-div">
            <Container className="container-header">
            <Row style={{    padding: '10px 0px'}}>
              <Col xs="6" className="text-left align-self-center">
              <Link to="/" className="title-bar">
                Fut Stats
              </Link>
              </Col>
              <Col xs="6" className="text-right align-self-center">
              {auth.isAuthenticated ?
            <Dropdown className="user-dropdown"isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle >
            {this.state.user.photoURL !== null ? <div className="user-profile" style={{backgroundImage: 'url(' + this.state.user.photoURL + ')'}}></div> : <MdAccountCircle height='1.3em' width='1.3em'></MdAccountCircle>}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>My Profile</DropdownItem>
              <DropdownItem>My Squads</DropdownItem>
              <DropdownItem divider />
              <LogoutButton logout={this.logout}></LogoutButton>
            </DropdownMenu>
          </Dropdown>
                : 
              <Link to="/login" className="login-btn">
                Login
              </Link>
              }
              </Col>
            </Row>
            </Container>
            </div>
        </HeadRoom>
        <Switch>
          <PublicRoute exact authed={auth.isAuthenticated} loading={this.state.isLoading} path="/" component={Main}></PublicRoute>
          <PublicRoute authed={auth.isAuthenticated} loading={this.state.isLoading} path="/login" component={LoginPage}></PublicRoute>
          <PrivateRoute authed={auth.isAuthenticated} loading={this.state.isLoading} path="/new-match" component={NewMatch}></PrivateRoute>
          <PrivateRoute authed={auth.isAuthenticated} loading={this.state.isLoading} path="/my-stats" component={Stats}></PrivateRoute>
          <PrivateRoute authed={auth.isAuthenticated} loading={this.state.isLoading} path="/view-games" component={ViewGames}></PrivateRoute>
          <PrivateRoute authed={auth.isAuthenticated} loading={this.state.isLoading} path="/edit-game" component={EditGame}></PrivateRoute>
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
