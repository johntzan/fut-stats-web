import React, {Component} from 'react';
import {Button, Container, Row, Col, Media, Jumbotron} from 'reactstrap';
import Login from './login/Login';
import graphic from '../assets/fut-stats-graphic.png';
import newMatchGraphic from '../assets/fut-stats-new-match.png';

class Main extends Component {

    render() {
        return (
            <div>
                <Jumbotron style={{backgroundColor: '#242A2E', color: 'white'}}>
                    <Container className="container-jumbotron">
                        <h1>Fut Stats Tracker</h1>
                        <p>Record all your stats from games played during your FIFA Ultimate Team Weekend League and compare stat averages between you and your opponents from each weekend.</p>
                    </Container>
                </Jumbotron>
            <Container className="container-main-example">
                <Row style={adRowStyle}>
                    <Col xs="12" md="6" style={{color: 'white', padding:'20px'}}>
                        <h4>Stats Overview</h4>
                        <p className="text-left">All your stats from games played during your FUT Weekend League side by side with your opponents for easy comparisons.</p>
                    </Col>
                    <Col xs="12" md="6">
                        <Media>
                            <Media style={{maxWidth:'100%', maxHeight:'100%'}} object src={graphic} alt="Stats Graphic" />
                        </Media>
                    </Col>
                    
                </Row>
                <Row style={adRowStyle}>
                        <Col xs="12" md="6">
                        <Media>
                            <Media style={{maxWidth:'100%', maxHeight:'100%'}} object src={newMatchGraphic} alt="New Match Graphic" />
                        </Media>
                    </Col>
                    <Col xs="12" md="6" style={{color: 'white', padding:'20px'}}>
                    
                        <h4>Stats Tracking</h4>
                        <p className="text-left">Record all main game stats after game played, which includes: Goals, Shots, Possession, Corners, Tackles, Pass Accuracy, Formations, Team Ratings, Team Type, Opponent Name and Team.</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" style={{marginTop: '20px'}}>
                        <Login></Login>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}

const adRowStyle = {
    padding: '35px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '0.5px solid rgb(66, 66, 66)'
}

export default Main;