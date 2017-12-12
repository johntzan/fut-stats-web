import React, {Component} from 'react';
import './ViewGames.css';
import {
    Container,
    Row,
    Col,
    Navbar,
    Input,
    Button,
    NavbarBrand,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
class ViewGames extends Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            activeTab: this.props.location.state.activeTab,
            data: []
        };

        if (this.state.activeTab === 'current') {
            this.state.data = this.props.location.state.currentWL
        }

        this.editGame = this
            .editGame
            .bind(this);
    }

    updateSearch(event) {
        this.setState({
            search: event
                .target
                .value
                .toLowerCase()
        })
    }

    editGame(game) {
        console.log('go to edit game');
    }

    render() {

        let filteredGames = this
            .state
            .data // eslint-disable-next-line
            .filter((game) => {
                if (game.oppName.toLowerCase().indexOf(this.state.search) !== -1 || game.oppTeamName.toLowerCase().indexOf(this.state.search) !== -1) {
                    return game;
                }
            });
        return (
            <Container className="container-main">
                <Navbar xs="12" expand="xs" dark>
                    <Button
                        onClick={this.props.history.goBack}
                        size="lg"
                        className="back-btn float-left"><MdArrowBack size="24"/></Button>
                    <NavbarBrand >
                        <h3 className="page-title">View Games</h3>
                    </NavbarBrand>

                </Navbar>

                <Row>
                    <Col xs="12" md="6">
                        <Input
                            value={this.state.search}
                            onChange={this
                            .updateSearch
                            .bind(this)}
                            className="search-games-input"
                            placeholder="Search for Opponent by Name/TeamName.."></Input>
                    </Col>
                </Row>

                <Row>
                    {filteredGames.length > 0
                        ? filteredGames.map((game, index) => <Game game={game} index={index} key={index}></Game>)
                        : <Col xs="12" className="text-center">
                            <Card>
                                <CardBody>
                                    {this.state.search.length > 0
                                        ? <h1>No games found with search: {this.state.search}</h1>
                                        : <h1>No games have been added to this weekend league!</h1>}

                                </CardBody>
                            </Card>
                        </Col>}
                </Row>
            </Container>
        );
    }
}

const Game = (props) => {

    const game = props.game;
    const index = props.index + 1;
    let winOrLoseStyle = {};
    let winOrLoseText = '';

    if (game.userWon) {
        winOrLoseStyle = {
            color: 'green'
        }
        winOrLoseText = 'WIN'
    } else {
        winOrLoseStyle = {
            color: 'red'
        }
        winOrLoseText = 'LOSS'
    }

    let penalties = false;
    if (game.userPenScore.length > 0 && game.oppPenScore.length > 0) {
        penalties = true;
    }

    return (
        <Col xs="12" md="6">
            <Card className="game-card">
                <CardHeader>
                    <h5>#{index}
                        <span style={winOrLoseStyle}>
                            &nbsp;{winOrLoseText}</span>&nbsp;vs. {game.oppName + '/' + game.oppTeamName}
                    </h5>
                </CardHeader>
                {penalties === true
                    ? <CardBody className="text-center">
                            <h1 className="text-center game-score">{'(' + game.userPenScore + ')' + game.userGoals + ':' + game.oppGoals + '(' + game.oppPenScore + ')'}
                            </h1>
                            <MdChevronRight
                                style={{
                                float: 'right'
                            }}
                                height='2em'
                                width='2em'></MdChevronRight>
                        </CardBody>
                    : <CardBody className="text-center">
                        <h1 className="text-center game-score">{game.userGoals + ':' + game.oppGoals}
                        </h1>
                        <MdChevronRight
                            style={{
                            float: 'right'
                        }}
                            height='2em'
                            width='2em'></MdChevronRight>
                    </CardBody>}
                <CardFooter></CardFooter>
            </Card>
        </Col>
    );
};

export default ViewGames;