import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Row, Col} from 'reactstrap';

class Main extends Component {

    constructor() {
        super();
        this.state = {
            welcomeTxtState: 'state txt'
        }

    }

    handleClick(e) {
        console.log("button has been clicked!");
    }

    render() {
        return (
            <Container className="container-main" computer only>
                <Row>
                    <Col className="text-center">
                        <Link to='/new-match'>
                            <GetStartedButton
                                handleClick={this
                                .handleClick
                                .bind(this)}></GetStartedButton>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="example-content"></div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const GetStartedButton = (props) => {
    return (
        <Button
            size="big"
            color="blue"
            className="get-started-button"
            onClick={props.handleClick}>
            Get Started
        </Button>
    );
};

export default Main;