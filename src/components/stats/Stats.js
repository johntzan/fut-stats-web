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
import MdChevronRight from 'react-icons/lib/md/chevron-right';
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
    Legend
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
    render() {

        let data = [];
        if (this.state.currentActive) {
            data = this.state.currentWL;
        } else if (this.state.allActive) {
            data = this.state.allWL;
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
                        user={0.43}
                        opp={'(' + 0.40 + ')'}
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
                        user={84.19}
                        opp={'(' + 85.36 + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        lg="4"
                        md="6"
                        xs="12"
                        header="Avg. Tackles"
                        user={11.02}
                        opp={'(' + 8.47 + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        lg="4"
                        md="6"
                        xs="12"
                        header="Avg. Corners"
                        user={3}
                        opp={'(' + 1 + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>

                    <StatsBox
                        lg="4"
                        md="12"
                        xs="12"
                        header="# Games in Penalties"
                        user={5}
                        opp={'(' + 5 + ')'}
                        footer='(Games Lost)'></StatsBox>
                    <StatsBox
                        lg="4"
                        md="6"
                        xs="12"
                        header="Disconnects"
                        user={0}
                        opp={''}
                        footer='Total'></StatsBox>
                    <StatsBox
                        lg="4"
                        md="6"
                        xs="12"
                        header="Rage Quits"
                        user={3}
                        opp={''}
                        footer='Total'></StatsBox>
                    <Col xs="12">
                        <Row>
                            <Col xs="12" md="4" lg="4">
                                <Card>
                                    <CardHeader>
                                        <h5>Top 5 Formations</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <ol>
                                            <li>4-1-2-1-2 - (22)</li>
                                            <li>4-2-3-1 - (10)</li>
                                            <li>4-3-2-1 - (6)</li>
                                            <li>4-4-2 - (8)</li>
                                            <li>4-4-1-1 - (2)</li>
                                        </ol>
                                    </CardBody>
                                </Card>
                            </Col>

                            <StatsBox
                                lg="4"
                                md="4"
                                xs="12"
                                header="Opponent Team Rating"
                                user={''}
                                opp={'82.44'}
                                footer='Avg.'></StatsBox>

                            <Col xs="12" md="4" lg="4">
                                <Card>
                                    <CardHeader>
                                        <h5>Top Squad Types</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <ol>
                                            <li>EPL - (22)</li>
                                            <li>Serie A - (10)</li>
                                            <li>La Liga - (6)</li>
                                            <li>Bundes - (8)</li>
                                            <li>Ligue 1 - (2)</li>
                                        </ol>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>
        );
    }
}

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
        } else {
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
                                : <MdArrowDropDown></MdArrowDropDown>}</span>{Math.round(statsDiff * 100) / 100}</p>}
                </CardBody>
                <CardFooter>
                    <h6>{props.footer}</h6>
                </CardFooter>
            </Card>
        </Col>
    );
}

export default Stats;