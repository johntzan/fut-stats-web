import React, {Component} from 'react';
import GameResultsEdit from './GameResultsEdit';
import GameStatsEdit from './GameStatsEdit';
import OppInfoEdit from './OppInfoEdit';
import UserInfoEdit from './UserInfoEdit';
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Navbar,
    NavbarBrand
} from 'reactstrap';
import './EditGame.css';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import startCase from 'lodash/startCase';

class EditGame extends Component {

    constructor(props) {
        super(props);
        this.invalidFields = [];
        this.state = {
            modal: false,
            game: this.props.location.state.game,
            edit_game: this.props.location.state.game
        };

        this.handleOppInfoChanges = this
            .handleOppInfoChanges
            .bind(this);

        this.handleUserInfoChanges = this
            .handleUserInfoChanges
            .bind(this);

        this.handleOppInfoSquadType = this
            .handleOppInfoSquadType
            .bind(this);

        this.handleMatchStatsChanges = this
            .handleMatchStatsChanges
            .bind(this);

        this.handleMatchResultsChanges = this
            .handleMatchResultsChanges
            .bind(this);
        this.handleMatchResultsChecks = this
            .handleMatchResultsChecks
            .bind(this);

        this.saveGame = this
            .saveGame
            .bind(this);

        this.toggleSaveModal = this
            .toggleSaveModal
            .bind(this);
    }

    handleMatchResultsChanges(event) {
        const matchResults = this.state.matchResults;
        const newMatchResults = {
            ...matchResults,
            [event.target.name]: event.target.value
        };

        this.setState({matchResults: newMatchResults});
    }

    handleMatchResultsChecks(event) {
        const checkType = event.target.name;
        const matchResults = this.state.matchResults;

        if (checkType === "rageQuitChecked") {
            const newMatchResults = {
                ...matchResults,
                rageQuitChecked: !this.state.matchResults.rageQuitChecked,
                rageQuitMinute: ''
            };
            this.setState({matchResults: newMatchResults})
        } else if (checkType === "disconnectedFromEA") {
            const newMatchResults = {
                ...matchResults,
                disconnectedFromEA: !this.state.matchResults.disconnectedFromEA
            };
            this.setState({matchResults: newMatchResults})
        }

    }

    /*
        Handles changes in possession inputs. Takes input of user/opp possession and adjusts the opposite with 100 - value,
        to save user time when manually entering. These two combined will always equal 100. Also provides for some validation.
    */
    handlePossessionChanges(event) {
        const matchStats = this.state.matchStats;
        const possessionValue = event.target.value;
        const name = event.target.name;

        if (possessionValue > 0) {
            const newPossessionValue = 100 - possessionValue;
            if (name === 'userPossession') {
                const newMatchStats = {
                    ...matchStats,
                    userPossession: possessionValue,
                    oppPossession: newPossessionValue
                };
                this.setState({matchStats: newMatchStats});
            } else if (name === 'oppPossession') {
                const newMatchStats = {
                    ...matchStats,
                    userPossession: newPossessionValue,
                    oppPossession: possessionValue
                };
                this.setState({matchStats: newMatchStats});
            }

        } else {
            const newMatchStats = {
                ...matchStats,
                oppPossession: '',
                userPossession: ''
            };
            this.setState({matchStats: newMatchStats});
        }
    }

    handleMatchStatsChanges(event) {
        const name = event.target.name;
        if (name === 'userPossession' || name === 'oppPossession') {
            this.handlePossessionChanges(event);
        } else {
            const matchStats = this.state.matchStats;
            const newMatchStats = {
                ...matchStats,
                [name]: event.target.value
            };

            this.setState({matchStats: newMatchStats});
        }
    }

    handleUserInfoChanges(event) {
        const userInfo = this.state.userInfo;
        const newUserInfo = {
            ...userInfo,
            [event.target.name]: event.target.value
        };

        this.setState({userInfo: newUserInfo});
    }

    handleOppInfoChanges(event) {

        const oppInfo = this.state.oppInfo;
        const newOppInfo = {
            ...oppInfo,
            [event.target.name]: event.target.value
        };

        this.setState({oppInfo: newOppInfo});
    };

    handleOppInfoSquadType(selected) {

        const index = this
            .state
            .oppInfo
            .oppSquad
            .indexOf(selected);
        if (index < 0) {
            this
                .state
                .oppInfo
                .oppSquad
                .push(selected);
        } else {
            this
                .state
                .oppInfo
                .oppSquad
                .splice(index, 1);
        }

        const oppInfo = this.state.oppInfo;
        const newOppInfo = {
            ...oppInfo,
            oppSquad: [...this.state.oppInfo.oppSquad]
        };

        this.setState({oppInfo: newOppInfo});

    };

    saveGame() {
        this.validateGame();
    }

    validateGame() {
        this.invalidFields = []; //reset invalid fields every time save is hit to reset validation
        this.validateUserInfo();
        this.validateOppInfo();
        this.validateMatchStats();
        this.validateMatchResults();
        console.log('Invalid fields: ');
        console.log(this.invalidFields);
        if (this.invalidFields.length === 0) {
            console.log('Success!')
            const weekendLeague = {};
            Object.assign(weekendLeague, this.state.userInfo, this.state.oppInfo, this.state.matchStats, this.state.matchResults);
            console.log(weekendLeague);
            let currentWL = JSON.parse(localStorage.getItem('currentWL'))
            currentWL.push(weekendLeague);
            localStorage.setItem('currentWL', currentWL);
        } else {
            this.toggleSaveModal();
        }
    }
    // Validate User info form, special case for Formation since default is
    // 'Formation'
    validateUserInfo() {
        Object
            .keys(this.state.userInfo)
            .forEach(key => {
                if (key === 'userFormationSelected') {
                    if (this.state.userInfo[key].length < 1 || this.state.userInfo[key] === 'Formation') {
                        this
                            .invalidFields
                            .push(startCase(key));
                    }
                } else if (this.state.userInfo[key].length < 1) {
                    this
                        .invalidFields
                        .push(startCase(key));
                }
            });

    }
    // Validate Opponent info form, special case Formation since default is
    // 'Formation'
    validateOppInfo() {
        Object
            .keys(this.state.oppInfo)
            .forEach(key => {
                if (key === 'oppFormationSelected') {
                    if (this.state.oppInfo[key].length < 1 || this.state.oppInfo[key] === 'Formation') {
                        this
                            .invalidFields
                            .push(startCase(key));
                    }
                } else if (this.state.oppInfo[key].length < 1) {
                    this
                        .invalidFields
                        .push(startCase(key));
                }
            });

    }

    //Validate Match Stats, all values should be greater than 0 and inputted
    validateMatchStats() {
        Object
            .keys(this.state.matchStats)
            .forEach(key => {
                if (this.state.matchStats[key].length < 1) {
                    this
                        .invalidFields
                        .push(startCase(key));
                }
            });
    }

    validateMatchResults() {

        if (this.state.matchStats.userGoals > this.state.matchStats.oppGoals) {
            console.log('User Won!')
            const newMatchResults = {
                ...this.state.matchResults,
                userWon: true
            };

            this.setState({matchResults: newMatchResults});
        }

        //Goals validation, checking for ties and penalties score ties
        if (this.state.matchStats.userGoals === this.state.matchStats.oppGoals) {

            if (this.state.matchResults.userPenScore > this.state.matchResults.oppPenScore) {
                const newMatchResults = {
                    ...this.state.matchResults,
                    userWon: true
                };
                this.setState({matchResults: newMatchResults});
            }

            if (this.state.matchResults.userPenScore.length < 1) {
                this
                    .invalidFields
                    .push('User Penalties');
            }
            if (this.state.matchResults.oppPenScore.length < 1) {
                this
                    .invalidFields
                    .push('Opp Penalties');
            }

            if ((this.state.matchResults.userPenScore !== '' && this.state.matchResults.oppPenScore !== '') && (this.state.matchResults.userPenScore === this.state.matchResults.oppPenScore)) {
                this
                    .invalidFields
                    .push('Penalties score is a tie!');
            }
        }

        //Rage quit check
        if (this.state.matchResults.rageQuitChecked) {
            if (this.state.matchResults.rageQuitMinute.length < 1) {
                this
                    .invalidFields
                    .push('Rage Quit Minute not entered!');
            }
        }
    }

    toggleSaveModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Container className="container-main">
                    <Navbar xs="12" color="transparent" dark expand="md">
                        <Button
                            onClick={this.props.history.goBack}
                            size="lg"
                            className="back-btn float-left"><MdArrowBack size="24"/></Button>
                        <NavbarBrand >
                            <h3 className="page-title">Edit Game</h3>
                        </NavbarBrand>
                    </Navbar>
                    <Row>
                        <Col lg="6" xs="12">
                            <UserInfoEdit
                                game={this.state.game}
                                handleUserInfoChanges={this.handleUserInfoChanges}></UserInfoEdit>
                        </Col>
                        <Col lg="6" xs="12">
                            <OppInfoEdit
                                game={this.state.game}
                                handleOppInfoChanges={this.handleOppInfoChanges}
                                handleOppInfoSquadType={this.handleOppInfoSquadType}></OppInfoEdit>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <GameStatsEdit
                                game={this.state.game}
                                handleMatchStatsChanges={this.handleMatchStatsChanges}></GameStatsEdit>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <GameResultsEdit
                                game={this.state.game}
                                edit_game={this.state.edit_game}
                                handleMatchResultsChanges={this.handleMatchResultsChanges}
                                handleMatchResultsChecks={this.handleMatchResultsChecks}></GameResultsEdit>
                        </Col>
                    </Row>
                    <Row>
                        <Button
                            onClick={this.saveGame}
                            className="save-btn"
                            color="danger"
                            size="lg"
                            block>
                            Save Game
                        </Button>
                    </Row>

                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggleSaveModal}
                        className="save-modal">
                        <ModalHeader toggle={this.toggleSaveModal}>Save Game Error!</ModalHeader>
                        <ModalBody>
                            <h5>Please enter a value for all fields listed below:</h5>
                            {this
                                .invalidFields
                                .map((invalidField) => <p key={invalidField}>{invalidField}</p>)}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleSaveModal}>OK</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </div>
        );
    }
}

export default EditGame;