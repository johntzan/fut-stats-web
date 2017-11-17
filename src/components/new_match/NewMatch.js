import React, {Component} from 'react';
import NewMatchStats from './NewMatchStats';
import UserInfo from './UserInfo';
import OpponentInfo from './OpponentInfo';
import MatchResults from './MatchResults';
import {Container, Row, Col, Button} from 'reactstrap';
import './NewMatch.css';
import {Link} from 'react-router-dom';
import MdArrowBack from 'react-icons/lib/md/arrow-back'

class NewMatch extends Component {

    render() {
        return (
            <Container className="container-main">
                <Row clearfix>
                    <Link
                        to="/"
                        style={{
                        display: 'inline-flex'
                    }}>
                        <Button size="lg" className="back-btn float-left"><MdArrowBack/></Button>
                    </Link>
                    <h3 className="page-title">Create New Match</h3>
                </Row>
                <Row>
                    <Col lg="6">
                        <UserInfo></UserInfo>
                    </Col>
                    <Col lg="6">
                        <OpponentInfo></OpponentInfo>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <NewMatchStats></NewMatchStats>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <MatchResults></MatchResults>
                    </Col>
                </Row>
                <Row>
                    <Button className="save-btn" color="danger" size="lg" block>
                        Save Game
                    </Button>
                </Row>
            </Container>
        );
    }
}

export default NewMatch;