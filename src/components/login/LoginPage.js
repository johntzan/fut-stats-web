import React, { Component } from 'react';
import { Container, Row, Col, Media } from "reactstrap";
import Login from './Login';
import logo from '../../assets/logo2.png';

class LoginPage extends Component {
    render() {
        return (
            <div className="login-div align-self-center">

                    <Container style={{maxWidth: '400px'}}>
                        <Row>
                            <Col xs="12">
                        <Media className="text-center" style={{display: "block"}}>
                            <Media style={{maxWidth:'128px', maxHeight:'128px'}} object src={logo} alt="Logo" />
                        </Media>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="text-center">
                                <Login></Login>
                            </Col>
                        </Row>
                    </Container>
                
                    <div >
                    </div>
            </div>
        );
    }
}

export default LoginPage;