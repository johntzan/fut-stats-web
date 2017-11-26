import React, {Component} from 'react';
import {Container, Row, Col, Input, Form} from 'reactstrap';

class NewMatchStats extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userGoals: true,
            oppGoals: true,
            userShots: true,
            oppShots: true,
            userShotsOnGoal: true,
            oppShotsOnGoal: true,
            userPossession: true,
            oppPossession: true,
            userTackles: true,
            oppTackles: true,
            userCorners: true,
            oppCorners: true,
            userPassAccuracy: true,
            oppPassAccuracy: true
        }

        this.checkValidInput = this
            .checkValidInput
            .bind(this);
    }

    checkValidInput(event) {
        let name = event.target.name;

        if (event.target.value.length <= 2) {
            this.setState({[name]: true});
            this
                .props
                .handleMatchStatsChanges(event);
        } else {
            //length longer than 2, reset stats to blank.
            const newEvent = event;
            newEvent.target.value = '';
            this
                .props
                .handleMatchStatsChanges(newEvent);
            this.setState({[name]: false});
        }
    }

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
                    <StatsInput
                        stat="Goals"
                        userValid={this.state.userGoals}
                        oppValid={this.state.oppGoals}
                        onChange={this.checkValidInput}></StatsInput>
                    <StatsInput
                        stat="Shots"
                        userValid={this.state.userShots}
                        oppValid={this.state.oppShots}
                        onChange={this.checkValidInput}></StatsInput>
                    <StatsInput
                        stat="Shots On Goal"
                        userValid={this.state.userShotsOnGoal}
                        oppValid={this.state.oppShotsOnGoal}
                        onChange={this.checkValidInput}></StatsInput>
                    <PossessionStatsInput
                        stat="Possession"
                        matchStats={this.props.matchStats}
                        userValid={this.state.userPossession}
                        oppValid={this.state.oppPossession}
                        onChange={this.checkValidInput}></PossessionStatsInput>
                    <StatsInput
                        stat="Tackles"
                        userValid={this.state.userTackles}
                        oppValid={this.state.oppTackles}
                        onChange={this.checkValidInput}></StatsInput>
                    <StatsInput
                        stat="Corners"
                        userValid={this.state.userCorners}
                        oppValid={this.state.oppCorners}
                        onChange={this.checkValidInput}></StatsInput>
                    <StatsInput
                        stat="Pass Accuracy"
                        userValid={this.state.userPassAccuracy}
                        oppValid={this.state.oppPassAccuracy}
                        onChange={this.checkValidInput}></StatsInput>
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
                    valid={props.userValid}
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
                    valid={props.oppValid}
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

const PossessionStatsInput = (props) => {
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
                    valid={props.userValid}
                    value={props.matchStats.userPossession}
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
                    valid={props.oppValid}
                    value={props.matchStats.oppPossession}
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