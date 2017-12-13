import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    CardHeader,
    CardFooter,
    CardBody,
    CardTitle,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import './Stats.css';
import {
    MdArrowDropDown,
    MdList,
    MdAdd,
    MdDelete,
    MdSave,
    MdArrowDropUp,
    MdChevronRight
} from 'react-icons/lib/md';
// eslint-disable-next-line
import weekendLeague from '../../helpers/test-data.js';
import * as StatUtils from '../../helpers/stats-helper.js';

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Label,
    Legend,
    BarChart,
    XAxis,
    YAxis,
    Bar
} from 'recharts';
import {Link} from 'react-router-dom';

const COLORS = ['#32B200', '#374650'];
class Stats extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isSaveModalOpen: false,
            isDeleteModalOpen: false,
            activeTab: 'current',
            currentWL: [],
            allWeekendLeagues: []
        };

        this.toggle = this
            .toggle
            .bind(this);

        this.setActiveStatTab = this
            .setActiveStatTab
            .bind(this);

        this.viewGames = this
            .viewGames
            .bind(this);

        this.toggleSaveModal = this
            .toggleSaveModal
            .bind(this);

        this.saveWL = this
            .saveWL
            .bind(this);

        this.toggleDeleteModal = this
            .toggleDeleteModal
            .bind(this);
        this.deleteWL = this
            .deleteWL
            .bind(this);

    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    viewGames() {
        this
            .props
            .history
            .push({
                pathname: '/view-games',
                state: {
                    activeTab: this.state.activeTab,
                    currentWL: this.state.currentWL,
                    allWeekendLeagues: this.state.allWeekendLeagues
                }
            })
    }

    setActiveStatTab(event) {
        if (event.target.name === 'current') {
            this.setState({
                ...this.state,
                activeTab: 'current'
            })
            this.getCurrentStats();
        } else if (event.target.name === 'all') {
            this.setState({
                ...this.state,
                activeTab: 'all'
            });
            this.getAllStats();
        }
    }

    toggleSaveModal() {
        console.log('toggle')
        this.setState({
            isSaveModalOpen: !this.state.isSaveModalOpen
        });
    }

    saveWL() {
        let date = new Date();
        let saveWL = {
            dateOfWL: date.getTime(),
            weekendLeague: this.state.currentWL
        }

        console.log(saveWL);
        let allWLs = JSON.parse(localStorage.getItem('allWeekendLeagues'));
        allWLs.push(saveWL);
        console.log(allWLs);
        localStorage.setItem('allWeekendLeagues', JSON.stringify(allWLs)); //add current WL to All
        localStorage.setItem('currentWL', JSON.stringify([])); //reset current WL to empty
        //update state of both
        this.getCurrentStats();
        this.toggleSaveModal();
    }

    toggleDeleteModal() {
        console.log('toggle')
        this.setState({
            isDeleteModalOpen: !this.state.isDeleteModalOpen
        });
    }

    deleteWL() {
        console.log('deleting');
        if (this.state.activeTab === 'current') {
            localStorage.setItem('currentWL', JSON.stringify([]));
            this.getCurrentStats();
        } else if (this.state.activeTab === 'all') {
            localStorage.setItem('allWeekendLeagues', JSON.stringify([]));
            this.getAllStats();
        }
        this.toggleDeleteModal();
    }

    getAllStats() {
        let allWLs = localStorage.getItem('allWeekendLeagues');
        if (allWLs !== null && allWLs !== '') {
            this.setState({
                allWeekendLeagues: JSON.parse(localStorage.getItem('allWeekendLeagues'))
            })
        }
    }

    getCurrentStats() {
        let currWL = localStorage.getItem('currentWL');
        if (currWL !== null && currWL !== '') {

            this.setState({
                currentWL: JSON.parse(localStorage.getItem('currentWL'))
            })
        }
    }

    componentDidMount() {
        this.getCurrentStats();
        this.getAllStats();
    }

    render() {

        let data = [];
        if (this.state.activeTab === 'current') {
            data = this.state.currentWL;
        } else if (this.state.activeTab === 'all') {
            data = this.state.allWeekendLeagues;
        }

        const possessionData = [
            {
                name: 'You',
                value: StatUtils.getAvgPossession(data, 'userPossession', this.state.activeTab)
            }, {
                name: 'Opponent',
                value: StatUtils.getAvgPossession(data, 'oppPossession', this.state.activeTab)
            }
        ];

        const goalsData = [
            {
                name: 'You',
                value: StatUtils.getTotalsStat(data, 'userGoals', this.state.activeTab)
            }, {
                name: 'Opponent',
                value: StatUtils.getTotalsStat(data, 'oppGoals', this.state.activeTab)
            }
        ];

        let goalsDiff = goalsData[0].value - goalsData[1].value;
        if (goalsDiff > 0) {
            goalsDiff = '+' + goalsDiff;
        }

        return (
            <Container className="container-main">
                <Navbar xs="12" color="transparent" dark expand="md">
                    <NavbarToggler onClick={this.toggle}/>
                    <NavbarBrand>
                        <h3 className="page-title">Weekend League</h3>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {data.length > 0 && <NavItem>
                                <Link to="/new-match">
                                    <Button color="primary" size="sm">Start New Game&nbsp;<MdAdd></MdAdd>
                                    </Button>
                                </Link>
                            </NavItem>
}
                            {data.length > 0 && this.state.activeTab === 'current' && <NavItem>
                                <Button color="warning" onClick={this.viewGames} size="sm">View Games&nbsp;<MdList></MdList>
                                </Button>
                            </NavItem>}

                            {this.state.activeTab === 'current' && data.length >= 5 && <NavItem>
                                <Button onClick={this.toggleSaveModal} color="success" size="sm">
                                    Save&nbsp;<MdSave ></MdSave>
                                </Button>
                            </NavItem>}
                            {data.length > 0 && <NavItem>
                                <Button onClick={this.toggleDeleteModal} color="danger" size="sm">
                                    Delete&nbsp;<MdDelete></MdDelete>
                                </Button>
                            </NavItem>}
                        </Nav>
                    </Collapse>
                </Navbar>
                <Nav tabs justified>
                    <NavItem>
                        <NavLink
                            onClick={this.setActiveStatTab}
                            name="current"
                            active={this.state.activeTab === 'current'}>Show Current</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={this.setActiveStatTab}
                            name="all"
                            active={this.state.activeTab === 'all'}>Show All</NavLink>
                    </NavItem>
                </Nav>
                {data.length > 0
                    ? <div className="stats">
                            <Row>
                                <Col xs="12">
                                    {this.state.activeTab === 'current' && <Card body className="games">
                                        <CardTitle className="text-center">
                                            {data !== undefined && data !== null
                                                ? 40 - data.length
                                                : 40}<br/>Games Left
                                        </CardTitle>
                                        <Row>
                                            <Col xs="6" className="text-center games-won">
                                                <h4>{StatUtils.getUserGamesWon(data, this.state.activeTab)}<br/>Games Won</h4>
                                            </Col>
                                            <Col xs="6" onClick={this.viewGames} className="text-center games-played">
                                                <h4
                                                    style={{
                                                    display: 'inline'
                                                }}>{data !== undefined && data !== null
                                                        ? data.length
                                                        : 0}<br/>Games Played</h4>
                                                <MdChevronRight
                                                    style={{
                                                    float: 'right'
                                                }}
                                                    height='2em'
                                                    width='2em'></MdChevronRight>
                                            </Col>
                                        </Row>
                                    </Card>}

                                    {this.state.activeTab === 'all' && <Card body className="games">
                                        <CardTitle className="text-center">
                                            {data !== undefined && data !== null
                                                ? data.length
                                                : 0}<br/>Weekend Leagues Played
                                        </CardTitle>
                                        <Row>
                                            <Col xs="6" className="text-center games-won">
                                                <h4>{StatUtils.getUserGamesWon(data, this.state.activeTab)}<br/>Games Won</h4>
                                            </Col>
                                            <Col xs="6" className="text-center">
                                                <h4>{StatUtils.getGamesPlayedForAll(data)}<br/>Games Played</h4>
                                            </Col>
                                        </Row>
                                    </Card>}

                                </Col>
                            </Row>

                            <Row>
                                <StatsBox
                                    lg="3"
                                    md="6"
                                    xs="12"
                                    header="Avg. Goals"
                                    user={StatUtils.getAvgStat(data, 'userGoals', this.state.activeTab)}
                                    opp={'(' + StatUtils.getAvgStat(data, 'oppGoals', this.state.activeTab) + ')'}
                                    showDiff={true}
                                    footer='(Against)'></StatsBox>
                                <StatsBox
                                    lg="3"
                                    md="6"
                                    xs="12"
                                    header="Avg. Shots"
                                    user={StatUtils.getAvgStat(data, 'userShots', this.state.activeTab)}
                                    opp={'(' + StatUtils.getAvgStat(data, 'oppShots', this.state.activeTab) + ')'}
                                    showDiff={true}
                                    footer='(Against)'></StatsBox>
                                <StatsBox
                                    lg="3"
                                    md="6"
                                    xs="12"
                                    header="Avg. Shots on Target"
                                    user={StatUtils.getAvgStat(data, 'userShotsOnGoal', this.state.activeTab)}
                                    opp={'(' + StatUtils.getAvgStat(data, 'oppShotsOnGoal', this.state.activeTab) + ')'}
                                    showDiff={true}
                                    footer='(Against)'></StatsBox>

                                <StatsBox
                                    lg="3"
                                    md="6"
                                    xs="12"
                                    header="Goals/Shot Ratio"
                                    user={StatUtils.getUserAvgGoalPerShot(data, this.state.activeTab)}
                                    opp={'(' + StatUtils.getOppAvgGoalPerShot(data, this.state.activeTab) + ')'}
                                    showDiff={true}
                                    footer='(Against)'></StatsBox>

                                <Col xs="12" md="6">
                                    <Card id="card-goals-diff">
                                        <CardHeader>
                                            <h5>Goals Difference</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <ResponsiveContainer width='100%' height={275}>
                                                <PieChart>
                                                    <Pie
                                                        data={goalsData}
                                                        dataKey={'value'}
                                                        labelLine={true}
                                                        innerRadius={70}
                                                        label
                                                        outerRadius={100}>
                                                        {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)}
                                                        <Label position="center">{goalsDiff}</Label>

                                                    </Pie>
                                                    <Tooltip></Tooltip>
                                                    <Legend/>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col xs="12" md="6">
                                    <Card id="card-possession">
                                        <CardHeader>
                                            <h5>Possession</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <ResponsiveContainer width='100%' height={275}>
                                                <PieChart>
                                                    <Pie data={possessionData} dataKey={'value'} innerRadius={70} outerRadius={100}>
                                                        {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)}
                                                        <Label position="center">{StatUtils.getAvgPossession(data, 'userPossession', this.state.activeTab) + '%'}</Label>
                                                    </Pie>
                                                    result result
                                                    <Tooltip></Tooltip>
                                                    <Legend/>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <StatsBox
                                    lg="4"
                                    md="12"
                                    xs="12"
                                    header="Avg. Pass Accuracy"
                                    user={StatUtils.getAvgStat(data, 'userPassAccuracy', this.state.activeTab)}
                                    opp={'(' + StatUtils.getAvgStat(data, 'oppPassAccuracy', this.state.activeTab) + ')'}
                                    showDiff={true}
                                    footer='(Against)'></StatsBox>
                                <StatsBox
                                    lg="4"
                                    md="6"
                                    xs="12"
                                    header="Avg. Tackles"
                                    user={StatUtils.getAvgStat(data, 'userTackles', this.state.activeTab)}
                                    opp={'(' + StatUtils.getAvgStat(data, 'oppTackles', this.state.activeTab) + ')'}
                                    showDiff={true}
                                    footer='(Against)'></StatsBox>
                                <StatsBox
                                    lg="4"
                                    md="6"
                                    xs="12"
                                    header="Avg. Corners"
                                    user={StatUtils.getAvgStat(data, 'userCorners', this.state.activeTab)}
                                    opp={'(' + StatUtils.getAvgStat(data, 'oppCorners', this.state.activeTab) + ')'}
                                    showDiff={true}
                                    footer='(Against)'></StatsBox>

                                <StatsBox
                                    lg="4"
                                    md="12"
                                    xs="12"
                                    header="# Games in Penalties"
                                    user={StatUtils.getPenaltiesCount(data, this.state.activeTab)}
                                    opp={'(' + StatUtils.getPenaltiesLostCount(data, this.state.activeTab) + ')'}
                                    footer='(Games Lost)'></StatsBox>
                                <StatsBox
                                    lg="4"
                                    md="6"
                                    xs="12"
                                    header="Disconnects"
                                    user={StatUtils.getCountOfStat(data, 'disconnectedFromEA', this.state.activeTab)}
                                    opp={''}
                                    footer='Total'></StatsBox>
                                <StatsBox
                                    lg="4"
                                    md="6"
                                    xs="12"
                                    header="Rage Quits"
                                    user={StatUtils.getCountOfStat(data, 'rageQuitChecked', this.state.activeTab)}
                                    opp={''}
                                    footer='Total'></StatsBox>
                                <Col xs="12">
                                    <Row>
                                        <Top5Formations data={data} type={this.state.activeTab}></Top5Formations>
                                        <Top5SquadTypes data={data} type={this.state.activeTab}></Top5SquadTypes>
                                        <StatsBox
                                            lg="6"
                                            md="6"
                                            xs="12"
                                            header="Opponent Team Rating"
                                            user={''}
                                            opp={StatUtils.getAvgStat(data, 'oppTeamRating', this.state.activeTab)}
                                            footer='Avg.'></StatsBox>
                                    </Row>
                                </Col>

                            </Row>

                        </div>
                    : <div>
                        <Row>
                            <Col xs="12" className="text-center">
                                {this.state.activeTab === 'current'
                                    ? <Card
                                            style={{
                                            margin: '20px'
                                        }}>
                                            <CardBody>
                                                <h3>No stats to view here! Start a new game below.</h3>
                                                <Link to="/new-match">
                                                    <Button color="primary" size="lg">Start New Game&nbsp;<MdAdd></MdAdd>
                                                    </Button>
                                                </Link>
                                            </CardBody>
                                        </Card>
                                    : <Card
                                        style={{
                                        margin: '20px'
                                    }}>
                                        <CardBody>
                                            <h3>No stats to view here! Save a Weekend League with atleast 5 games played to
                                                view all previous stats combined here!</h3>
                                        </CardBody>
                                    </Card>
}

                            </Col>
                        </Row>
                    </div>}

                <SaveModal
                    isSaveModalOpen={this.state.isSaveModalOpen}
                    toggleSaveModal={this.toggleSaveModal}
                    saveWL={this.saveWL}></SaveModal>

                <DeleteModal
                    isDeleteModalOpen={this.state.isDeleteModalOpen}
                    toggleDeleteModal={this.toggleDeleteModal}
                    activeTab={this.state.activeTab}
                    deleteWL={this.deleteWL}></DeleteModal>

            </Container>
        );
    }
}

const SaveModal = (props) => {

    return (
        <Modal isOpen={props.isSaveModalOpen} toggle={props.toggleSaveModal}>
            <ModalHeader toggle={props.toggleSaveModal}>Save this Weekend League?</ModalHeader>
            <ModalBody>
                <p>Are you sure you would like to save this Weekend League? Doing so will clear
                    out Current stats and combine them with All stats.</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={props.saveWL}>Save</Button>
                <Button color="secondary" onClick={props.toggleSaveModal}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

const DeleteModal = (props) => {

    return (
        <Modal isOpen={props.isDeleteModalOpen} toggle={props.toggleDeleteModal}>
            <ModalHeader toggle={props.toggleDeleteModal}>Delete this Weekend League?</ModalHeader>
            {props.activeTab === 'current'
                ? <ModalBody>
                        <p>Are you sure you would like to delete this Weekend League? Any stats stored
                            will be lost.</p>
                    </ModalBody>
                : <ModalBody>
                    <p>Are you sure you would like to delete All Weekend Leagues? All stats stored
                        will be lost.</p>
                </ModalBody>}

            <ModalFooter>
                <Button color="danger" onClick={props.deleteWL}>Delete</Button>
                <Button color="secondary" onClick={props.toggleDeleteModal}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

const Top5Formations = (props) => {
    const data = StatUtils.getTop5Formation(props.data, props.type);
    return (
        <Col xs="12" md="4" lg="6">
            <Card>
                <CardHeader>
                    <h5>Top 5 Formations</h5>
                </CardHeader>
                <CardBody>
                    <ResponsiveContainer width='100%' height={250}>
                        <BarChart
                            data={data}
                            margin={{
                            top: 30,
                            right: 30,
                            left: 0,
                            bottom: 30
                        }}>
                            <XAxis dataKey="Formation"/>
                            <YAxis/>
                            <Tooltip
                                itemStyle={{
                                color: 'black'
                            }}
                                labelStyle={{
                                color: 'black'
                            }}/>
                            <Bar dataKey="Count" fill="#0CA4FF" label legendType="square"></Bar>
                            <Legend></Legend>
                        </BarChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </Col>
    );
};

const Top5SquadTypes = (props) => {
    const data = StatUtils.getTop5SquadTypes(props.data, props.type);
    return (
        <Col xs="12" md="4" lg="6">
            <Card>
                <CardHeader>
                    <h5>Top 5 Squad Types</h5>
                </CardHeader>
                <CardBody>
                    <ResponsiveContainer width='100%' height={250}>
                        <BarChart
                            data={data}
                            margin={{
                            top: 30,
                            right: 30,
                            left: 0,
                            bottom: 30
                        }}>
                            <XAxis dataKey="Squad"></XAxis>
                            <YAxis/>
                            <Tooltip
                                itemStyle={{
                                color: 'black'
                            }}
                                labelStyle={{
                                color: 'black'
                            }}/>
                            <Bar dataKey="Count" fill="#0CA4FF" label legendType="square"></Bar>
                            <Legend></Legend>
                        </BarChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </Col>
    );
};

const StatsBox = (props) => {

    let statsDiff = '';
    let diffStyle = {};

    if (props.showDiff) {
        statsDiff = props.user - props
            .opp
            .replace(/[^\d.-]/g, '');

        if (statsDiff > 0) {
            diffStyle = {
                color: 'green'
            }
        } else if (statsDiff < 0) {
            diffStyle = {
                color: 'red'
            }
        }
    }
    return (
        <Col xs={props.xs} md={props.md} lg={props.lg}>
            <Card>
                <CardHeader>
                    <h5>{props.header}</h5>
                </CardHeader>
                <CardBody>
                    <h3 className="text-center">{props.user + props.opp}</h3>
                    {props.showDiff && <p style={diffStyle} className="text-center">
                        <span>{statsDiff > 0
                                ? <MdArrowDropUp></MdArrowDropUp>
                                : <MdArrowDropDown></MdArrowDropDown>}</span>{(Math.round(statsDiff * 100) / 100).toFixed(2)}</p>}
                </CardBody>
                <CardFooter>
                    <h6>{props.footer}</h6>
                </CardFooter>
            </Card>
        </Col>
    );
}

export default Stats;