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
    CardText
} from "reactstrap";
import './Stats.css';
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop-down';
import MdArrowDropUp from 'react-icons/lib/md/arrow-drop-up';
class Stats extends Component {
    render() {
        return (
            <Container className="container-main">
                <Row>
                    <h3 className="page-title">Weekend League</h3>
                </Row>

                <Row>
                    <Col xs="12">
                        <Card body className="games">
                            <CardTitle className="text-center">
                                39<br/>Games Left
                            </CardTitle>
                            <CardText>
                                <Row>
                                    <Col xs="6" className="text-center games-won">
                                        <h4>1<br/>Games Won</h4>
                                    </Col>
                                    <Col xs="6" className="text-center games-played">
                                        <h4>1<br/>Games Played</h4>
                                    </Col>
                                </Row>
                            </CardText>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <StatsBox
                        header="Avg. Goals"
                        user={3.1}
                        opp={'(' + 2.4 + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        header="Avg. Shots"
                        user={8.1}
                        opp={'(' + 7.4 + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        header="Avg. Shots on Target"
                        user={5.2}
                        opp={'(' + 3.4 + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        header="Possession"
                        user={51.02}
                        opp={'(' + 48.98 + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        header="Goals/Shot Ratio"
                        user={0.43}
                        opp={'(' + 0.40 + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        header="Avg. Pass Accuracy"
                        user={84.19}
                        opp={'(' + 85.36 + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        header="Avg. Tackles"
                        user={11.02}
                        opp={'(' + 8.47 + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        header="Avg. Corners"
                        user={3}
                        opp={'(' + 1 + ')'}
                        showDiff={true}
                        footer='(Against)'></StatsBox>
                    <StatsBox
                        header="Opponent Team Rating"
                        user={''}
                        showDiff={false}
                        opp={82.44}
                        footer='Avg.'></StatsBox>
                    <StatsBox
                        header="# Games in Penalties"
                        user={5}
                        opp={'(' + 5 + ')'}
                        footer='(Games Lost)'></StatsBox>
                    <StatsBox header="Disconnects" user={0} opp={''} footer='Total'></StatsBox>
                    <StatsBox header="Rage Quits" user={3} opp={''} footer='Total'></StatsBox>
                    <Col xs="12" md="6" lg="3">
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

                    <Col xs="12" md="6" lg="3">
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
        <Col xs="12" md="6" lg="3">
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