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
                    <StatsInput stat="Goals" onChange={this.props.handleMatchStatsChanges}></StatsInput>
                    <StatsInput stat="Shots" onChange={this.props.handleMatchStatsChanges}></StatsInput>
                    <StatsInput stat="Shots On Goal" onChange={this.props.handleMatchStatsChanges}></StatsInput>
                    <StatsInput stat="Possession" onChange={this.props.handleMatchStatsChanges}></StatsInput>
                    <StatsInput stat="Tackles" onChange={this.props.handleMatchStatsChanges}></StatsInput>
                    <StatsInput stat="Corners" onChange={this.props.handleMatchStatsChanges}></StatsInput>
                    <StatsInput stat="Pass Accuracy" onChange={this.props.handleMatchStatsChanges}></StatsInput>
                </Form>

            </Container>
        );
    }
}

const StatsInput = (props) => {
    const userInput = 'user' + props
        .stat
        .replace(/ /g, '');
    const oppInput = 'opp' + props
        .stat
        .replace(/ /g, '');
    return (
        <Row>
            <Col>
                <Input
                    type="number"
                    name={userInput}
                    className="text-center"
                    onChange={props.onChange}
                    id="stats-input"
                    placeholder="0"></Input>
            </Col>
            <Col>
                <h5>{props.stat}</h5>
            </Col>
            <Col>
                <Input
                    type="number"
                    name={oppInput}
                    className="text-center"
                    onChange={props.onChange}
                    id="stats-input"
                    placeholder="0"></Input >
            </Col>
        </Row>
    );
};

export default NewMatchStats;