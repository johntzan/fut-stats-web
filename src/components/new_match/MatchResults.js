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

    constructor(props) {
        super(props);

        this.state = {
            rageQuitChecked: false,
            rageQuitMinute: "",
            disconnectedFromEA: false,
            matchGeneralNotes: "",
            showPenalties: false,
            userPenScore: "",
            oppPenScore: ""
        };

        this.handleRageQuitCheckbox = this
            .handleRageQuitCheckbox
            .bind(this);

        this.handleDisconnectCheckbox = this
            .handleDisconnectCheckbox
            .bind(this);

        this.updateGeneralNotes = this
            .updateGeneralNotes
            .bind(this);

        this.updateRageQuitMinute = this
            .updateRageQuitMinute
            .bind(this);

        this.updateUserPenalties = this
            .updateUserPenalties
            .bind(this);

        this.updateOppPenalties = this
            .updateOppPenalties
            .bind(this);

    }

    handleRageQuitCheckbox() {
        this.setState({
            rageQuitChecked: !this.state.rageQuitChecked
        })
    }

    updateRageQuitMinute(e) {
        console.log('====================================');
        console.log(e.target.value);
        console.log('====================================');
        this.setState({rageQuitMinute: e.target.value})
    }

    handleDisconnectCheckbox() {
        this.setState({
            disconnectedFromEA: !this.state.disconnectedFromEA
        })
    }

    updateGeneralNotes(e) {
        this.setState({matchGeneralNotes: e.target.value})
    }

    updateUserPenalties(e) {
        this.setState({userPenScore: e.target.value})
    }

    updateOppPenalties(e) {
        this.setState({oppPenScore: e.target.value})
    }

    render() {

        return (
            <Container className="container-stats match">
                <Form>
                    <FormGroup check>
                        {this.state.showPenalties && <div>
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
                                        onChange={this.updateUserPenalties}
                                        value={this.userPenScore}
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
                                        onChange={this.updateOppPenalties}
                                        value={this.oppPenScore}
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
                                    checked={this.state.rageQuitChecked}
                                    onChange={this.handleRageQuitCheckbox}
                                    type="checkbox"/>
                                <p>Rage Quit?</p>
                                {this.state.rageQuitChecked && <Input
                                    type="number"
                                    id="stats-input"
                                    onChange={this.updateRageQuitMinute}
                                    value={this.rageQuitMinute}
                                    placeholder="What Minute?"></Input>}
                            </Label>
                        </Row>
                        <Row>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    checked={this.state.disconnectedFromEA}
                                    onChange={this.handleDisconnectCheckbox}/>
                                <p>Disconnected from EA Servers?</p>
                            </Label>
                        </Row>

                        <Row>
                            <Input
                                type="textarea"
                                onChange={this.updateGeneralNotes}
                                className="general-notes"
                                name="match-general-notes"
                                value={this.matchGeneralNotes}
                                placeholder="General Notes on the game can go here.."/>
                        </Row>

                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

export default MatchResults;