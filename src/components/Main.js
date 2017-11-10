import React, {Component} from 'react';
import {Grid, Container, Button} from "semantic-ui-react";
import {Link} from 'react-router-dom';

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
            <Container className="container">
                <Grid textAlign="center" divided>
                    <Grid.Row>
                        <Grid.Column >
                            <Link to='/new-match'>
                                <GetStartedButton
                                    handleClick={this
                                    .handleClick
                                    .bind(this)}></GetStartedButton>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <div className="example-content"></div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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