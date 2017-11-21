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

    constructor(props) {
        super(props);

        this.state = {
            oppInfo: {
                oppSquad: [],
                oppFormationSelected: "Formation",
                oppName: "",
                oppTeamName: "",
                oppTeamRating: ""
            },
            userInfo: {
                userFormationSelected: "Formation",
                userTeamName: "",
                userTeamRating: ""
            },
            matchResults: {
                rageQuitChecked: false,
                rageQuitMinute: "",
                disconnectedFromEA: false,
                matchGeneralNotes: "",
                userPenScore: "",
                oppPenScore: ""
            },
            matchStats: {
                userGoals: '',
                oppGoals: '',
                userShots: '',
                oppShots: '',
                userShotsOnGoal: '',
                oppShotsOnGoal: '',
                userPossession: '',
                oppPossession: '',
                userTackles: '',
                oppTackles: '',
                userCorners: '',
                oppCorners: '',
                userPassAccuracy: '',
                oppPassAccuracy: ''
            }

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
        console.log('====================================');
        console.log(event.target.name);
        console.log('====================================');
        const checkType = event.target.name;
        const matchResults = this.state.matchResults;

        if (checkType === "rageQuitChecked") {
            const newMatchResults = {
                ...matchResults,
                rageQuitChecked: !this.state.matchResults.rageQuitChecked
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

    handleMatchStatsChanges(event) {
        const matchStats = this.state.matchStats;
        const newMatchStats = {
            ...matchStats,
            [event.target.name]: event.target.value
        };

        this.setState({matchStats: newMatchStats});
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
        const weekendLeague = this.state;

        console.log('====================================');
        console.log(weekendLeague);
        console.log('====================================');
    }

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
                        <UserInfo
                            userInfo={this.state.userInfo}
                            handleUserInfoChanges={this.handleUserInfoChanges}></UserInfo>
                    </Col>
                    <Col lg="6">
                        <OpponentInfo
                            oppInfo={this.state.oppInfo}
                            handleOppInfoChanges={this.handleOppInfoChanges}
                            handleOppInfoSquadType={this.handleOppInfoSquadType}></OpponentInfo>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <NewMatchStats handleMatchStatsChanges={this.handleMatchStatsChanges}></NewMatchStats>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <MatchResults
                            matchStats={this.state.matchStats}
                            matchResults={this.state.matchResults}
                            handleMatchResultsChanges={this.handleMatchResultsChanges}
                            handleMatchResultsChecks={this.handleMatchResultsChecks}></MatchResults>
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
            </Container>
        );
    }
}

export default NewMatch;