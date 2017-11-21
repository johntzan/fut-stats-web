import React, {Component} from 'react';
import {
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Col
} from 'reactstrap';

class MatchResults extends Component {

    render() {

        return (
            <Container className="container-stats match">
                <Form>
                    <FormGroup check>
                        {(this.props.matchStats.userGoals.length > 0 && this.props.matchStats.userGoals === this.props.matchStats.oppGoals) && <div>
                            <Row>
                                <Label check>
                                    <Input type="checkbox" checked disabled/>
                                    <p
                                        style={{
                                        color: 'grey'
                                    }}>Penalties?</p>
                                </Label>
                            </Row>
                            <Row
                                style={{
                                marginBottom: '20px'
                            }}>
                                <Col>
                                    <Input
                                        type="number"
                                        name="userPenScore"
                                        onChange={this.props.handleMatchResultsChanges}
                                        value={this.props.matchResults.userPenScore}
                                        className="text-center"
                                        id="stats-input"
                                        placeholder="5"></Input>
                                </Col>
                                <Col>
                                    <h5>Penalties Score</h5>
                                </Col>
                                <Col>
                                    <Input
                                        type="number"
                                        name="oppPenScore"
                                        onChange={this.props.handleMatchResultsChanges}
                                        value={this.props.matchResults.oppPenScore}
                                        className="text-center"
                                        id="stats-input"
                                        placeholder="4"></Input >
                                </Col>
                            </Row>
                        </div>}
                        <Row
                            style={{
                            marginBottom: '20px'
                        }}>
                            <Label check clearfix>
                                <Input
                                    className="float-left"
                                    checked={this.props.matchResults.rageQuitChecked}
                                    name="rageQuitChecked"
                                    onChange={this.props.handleMatchResultsChecks}
                                    type="checkbox"/>
                                <p>Rage Quit?</p>
                                {this.props.matchResults.rageQuitChecked && <Input
                                    type="number"
                                    id="stats-input"
                                    name="rageQuitMinute"
                                    onChange={this.props.handleMatchResultsChanges}
                                    value={this.props.matchResults.rageQuitMinute}
                                    placeholder="What Minute?"></Input>}
                            </Label>
                        </Row>
                        <Row>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    name="disconnectedFromEA"
                                    checked={this.props.matchResults.disconnectedFromEA}
                                    onChange={this.props.handleMatchResultsChecks}/>
                                <p>Disconnected from EA Servers?</p>
                            </Label>
                        </Row>

                        <Row>
                            <Input
                                type="textarea"
                                onChange={this.props.handleMatchResultsChanges}
                                className="general-notes"
                                name="matchGeneralNotes"
                                value={this.props.matchResults.matchGeneralNotes}
                                placeholder="General Notes on the game can go here.."/>
                        </Row>

                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

export default MatchResults;