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
    NavLink
} from "reactstrap";
import './Stats.css';
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop-down';
import MdArrowDropUp from 'react-icons/lib/md/arrow-drop-up';
import MdSave from 'react-icons/lib/md/save';
import MdDelete from 'react-icons/lib/md/delete';
import MdAdd from 'react-icons/lib/md/add';

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

        this.toggle = this
            .toggle
            .bind(this);

        this.setActiveStatTab = this
            .setActiveStatTab
            .bind(this);

        this.viewGames = this
            .viewGames
            .bind(this);

        this.state = {
            isOpen: false,
            currentActive: true,
            allActive: false,
            currentWL: JSON.parse(localStorage.getItem('currentWL'))
        };

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
            .push('/view-games');
    }

    setActiveStatTab(event) {
        if (event.target.name === 'current') {
            this.setState({
                ...this.state,
                currentActive: true,
                allActive: false
            })
            this.getCurrentStats();
        } else if (event.target.name === 'all') {
            this.setState({
                ...this.state,
                currentActive: false,
                allActive: true
            });
            this.getAllStats();
        }
    }

    getAllStats() {}

    getCurrentStats() {}

    componentDidMount() {
        console.log(weekendLeague);
        localStorage.setItem('currentWL', JSON.stringify(weekendLeague));
    }

    displayTop5Formations(data) {}

    render() {

        let data = [];
        if (this.state.currentActive) {
            data = this.state.currentWL;
        } else if (this.state.allActive) {
            // TODO:change to allWL
            data = this.state.currentWL;
        }

        const possessionData = [
            {
                name: 'You',
                value: StatUtils.getUserAvgPossession(data)
            }, {
                name: 'Opponent',
                value: StatUtils.getOppAvgPossession(data)
            }
        ];

        const goalsData = [
            {
                name: 'You',
                value: StatUtils.getUserTotalGoals(data)
            }, {
                name: 'Opponent',
                value: StatUtils.getOppTotalGoals(data)
            }
        ];

        let goalsDiff = StatUtils.getUserTotalGoals(data) - StatUtils.getOppTotalGoals(data);
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
                            <NavItem>
                                <Link to="/new-match">
                                    <Button color="primary" size="sm">Start New Game&nbsp;<MdAdd></MdAdd>
                                    </Button>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Button color="success" size="sm">
                                    Save&nbsp;<MdSave></MdSave>
                                </Button>
                            </NavItem>
                            <NavItem>
                                <Button color="danger" size="sm">
                                    Delete&nbsp;<MdDelete></MdDelete>
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Nav tabs justified>
                    <NavItem>
                        <NavLink
                            onClick={this.setActiveStatTab}
                            name="current"
                            active={this.state.currentActive}>Show Current</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={this.setActiveStatTab}
                            name="all"
                            active={this.state.allActive}>Show All</NavLink>
                    </NavItem>
                </Nav>

                <Row>
                    <Col xs="12">
                        <Card body className="games">
                            <CardTitle className="text-center">
                                {data !== undefined
                                    ? 40 - data.length
                                    : 40}<br/>Games Left
                            </CardTitle>
                            <Row>
                                <Col xs="6" className="text-center games-won">
                                    <h4>{StatUtils.getUserGamesWon(data)}<br/>Games Won</h4>
                                </Col>
                                <Col xs="6" onClick={this.viewGames} className="text-center games-played">
                                    <h4>{data !== undefined
                                            ? data.length
                                            : 0}<br/>Games Played</h4>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <StatsBox
                        lg="3"
                        md="6"
                        xs="12"
                        header="Avg. Goals"
                        user={StatUtils.getUserAvgGoals(data)}
                        opp={'(' + StatUtils.getOppAvgGoals(data) + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>

                    <StatsBox
                        lg="3"
                        md="6"
                        xs="12"
                        header="Avg. Shots"
                        user={StatUtils.getUserAvgShots(data)}
                        opp={'(' + StatUtils.getOppAvgShots(data) + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        lg="3"
                        md="6"
                        xs="12"
                        header="Avg. Shots on Target"
                        user={StatUtils.getUserAvgShotsOnGoal(data)}
                        opp={'(' + StatUtils.getOppAvgShotsOnGoal(data) + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>

                    <StatsBox
                        lg="3"
                        md="6"
                        xs="12"
                        header="Goals/Shot Ratio"
                        user={StatUtils.getUserAvgGoalPerShot(data)}
                        opp={'(' + StatUtils.getOppAvgGoalPerShot(data) + ')'}
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
                                            <Label position="center">{StatUtils.getUserAvgPossession(data) + '%'}</Label>
                                        </Pie>
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
                        user={StatUtils.getUserAvgPassAccuracy(data)}
                        opp={'(' + StatUtils.getOppAvgPassAccuracy(data) + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        lg="4"
                        md="6"
                        xs="12"
                        header="Avg. Tackles"
                        user={StatUtils.getUserAvgTackles(data)}
                        opp={'(' + StatUtils.getOppAvgTackles(data) + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        lg="4"
                        md="6"
                        xs="12"
                        header="Avg. Corners"
                        user={StatUtils.getUserAvgCorners(data)}
                        opp={'(' + StatUtils.getOppAvgCorners(data) + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>

                    <StatsBox
                        lg="4"
                        md="12"
                        xs="12"
                        header="# Games in Penalties"
                        user={StatUtils.getPenaltiesCount(data)}
                        opp={'(' + StatUtils.getPenaltiesLostCount(data) + ')'}
                        footer='(Games Lost)'></StatsBox>
                    <StatsBox
                        lg="4"
                        md="6"
                        xs="12"
                        header="Disconnects"
                        user={StatUtils.getDisconnectsCount(data)}
                        opp={''}
                        footer='Total'></StatsBox>
                    <StatsBox
                        lg="4"
                        md="6"
                        xs="12"
                        header="Rage Quits"
                        user={StatUtils.getRageQuitCount(data)}
                        opp={''}
                        footer='Total'></StatsBox>
                    <Col xs="12">
                        <Row>
                            <Top5Formations data={data}></Top5Formations>
                            <Top5SquadTypes data={data}></Top5SquadTypes>

                            <StatsBox
                                lg="6"
                                md="6"
                                xs="12"
                                header="Opponent Team Rating"
                                user={''}
                                opp={StatUtils.getOppAvgTeamRating(data)}
                                footer='Avg.'></StatsBox>

                        </Row>
                    </Col>

                </Row>
            </Container>
        );
    }
}

const Top5Formations = (props) => {
    const data = StatUtils.getTop5Formation(props.data);
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
    const data = StatUtils.getTop5SquadTypes(props.data);
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