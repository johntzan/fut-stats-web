import GridColumn from 'semantic-ui-react/dist/commonjs/collections/Grid/GridColumn';
import React, {Component} from 'react';
import {Container, Grid} from 'semantic-ui-react';
import NewMatchStats from './NewMatchStats';
import UserInfo from './UserInfo';
import OpponentInfo from './OpponentInfo';

class NewMatch extends Component {
    render() {
        return (
            <Container className="container">
                <Grid textAlign="center" divided columns={2}>
                    <Grid.Row>
                        <Grid.Column >
                            <UserInfo></UserInfo>
                        </Grid.Column>
                        <GridColumn>
                            <OpponentInfo></OpponentInfo>
                        </GridColumn>
                    </Grid.Row>

                    <Grid.Row>
                        <NewMatchStats></NewMatchStats>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default NewMatch;