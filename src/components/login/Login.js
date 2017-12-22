import React, { Component } from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import './Login.css';


class Login extends Component {

    constructor(props) {
        super();
        this.state = {
            signedIn: false
        };   
        
        this.uiConfig = {
            signInFlow: 'popup',
            signInSuccessUrl: '/my-stats',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    // Whether the display name should be displayed in the Sign Up page.
                    requireDisplayName: false
                },
            ],
        };
    }

    render() {
        return (
                <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}></FirebaseAuth>
        );
    }
}

export default Login;