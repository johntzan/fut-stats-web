import React, {Component} from 'react';
import {
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    InputGroup,
    InputGroupAddon,
    ButtonDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    ButtonGroup,
    Row,
    Col
} from 'reactstrap';

class MatchResults extends Component {
    render() {
        return (
            <Container className="container-stats match">
                <Form>
                    <FormGroup check>
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
                                <Input type="number" className="text-center" id="stats-input" placeholder="5"></Input>
                            </Col>
                            <Col>
                                <h5>Penalties Score</h5>
                            </Col>
                            <Col>
                                <Input type="number" className="text-center" id="stats-input" placeholder="4"></Input >
                            </Col>
                        </Row>
                        <Row
                            style={{
                            marginBottom: '20px'
                        }}>
                            <Label check clearfix>
                                <Input className="float-left" type="checkbox"/>
                                <p >Rage Quit?</p>
                                <Input type="number" id="stats-input" placeholder="What Minute?"></Input>
                            </Label>
                        </Row>
                        <Row>
                            <Label check>
                                <Input type="checkbox"/>
                                <p>Disconnected from EA Servers?</p>
                            </Label>
                        </Row>

                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

export default MatchResults;