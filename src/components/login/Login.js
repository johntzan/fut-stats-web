import React, { Component } from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import config from '../../config/firebase-config.js';
import {Col} from 'reactstrap';
import './Login.css';

firebase.initializeApp(config);

class Login extends Component {

    constructor(props) {
        super();
        this.state = {
            signedIn: false
        };   
        
        this.uiConfig = {
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    // Whether the display name should be displayed in the Sign Up page.
                    requireDisplayName: false
                },
            ],
            callbacks: {
                signInSuccess: () => {
                    this.setState({signedIn: true});
                    return false;
                }
            }
        };
    }

    render() {
        return (
                <Col xs="12" style={{marginTop: '20px'}}>
                <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}></FirebaseAuth>
                {this.state.signedIn && <h1 style={{color: 'white'}}>SIGNED IN</h1>}
                </Col>
        );
    }
}

export default Login;