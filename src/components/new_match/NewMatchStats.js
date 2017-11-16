import React, {Component} from 'react';
import {Container, Row, Col, Input, Form} from 'reactstrap';

class NewMatchStats extends Component {

    render() {
        return (
            <Container className="container-stats match">
                <Row>
                    <Col>
                        <h5>Your Stats</h5>
                    </Col>
                    <Col></Col>
                    <Col>
                        <h5>Opponent Stats</h5>
                    </Col>
                </Row>
                <Form>
                    <StatsInput stat="Goals"></StatsInput>
                    <StatsInput stat="Shots"></StatsInput>
                    <StatsInput stat="Shots on Goal"></StatsInput>
                    <StatsInput stat="Possession"></StatsInput>
                    <StatsInput stat="Tackles"></StatsInput>
                    <StatsInput stat="Corners"></StatsInput>
                    <StatsInput stat="Pass Accuracy"></StatsInput>
                </Form>

            </Container>
        );
    }
}

const StatsInput = (props) => {
    return (
        <Row>
            <Col>
                <Input type="number" className="text-center" id="stats-input" placeholder="0"></Input>
            </Col>
            <Col>
                <h5>{props.stat}</h5>
            </Col>
            <Col>
                <Input type="number" className="text-center" id="stats-input" placeholder="0"></Input >
            </Col>
        </Row>
    );
};

export default NewMatchStats;