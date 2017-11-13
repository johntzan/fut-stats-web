import React, {Component} from 'react';
import NewMatchStats from './NewMatchStats';
import UserInfo from './UserInfo';
import OpponentInfo from './OpponentInfo';
import {Container, Row, Col} from 'reactstrap';
import './NewMatch.css';

class NewMatch extends Component {
    render() {
        return (
            <Container className="container-main">
                <Row>
                    <Col md="6">
                        <UserInfo></UserInfo>
                    </Col>
                    <Col md="6">
                        <OpponentInfo></OpponentInfo>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <NewMatchStats></NewMatchStats>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NewMatch;