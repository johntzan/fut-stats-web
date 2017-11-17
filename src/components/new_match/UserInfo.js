import React, {Component} from 'react';
import {
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    ButtonDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

class UserInfo extends Component {

    constructor(props) {
        super(props);

        this.toggle = this
            .toggle
            .bind(this);
        this.toggleSquadList = this
            .toggleSquadList
            .bind(this);
        this.userFormationOnClick = this
            .userFormationOnClick
            .bind(this);

        this.state = {
            dropdownOpen: false,
            cSelected: [],
            UserformationSelected: "Formation"
        };

    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleSquadList() {
        this.setState({
            squadListDropdownOpen: !this.state.squadListDropdownOpen
        });
    }

    userFormationOnClick() {
        console.log('====================================');
        console.log();
        console.log('====================================');
        this.setState({UserformationSelected: ''});
    }

    render() {
        return (
            <Container className="container-stats">
                <h1 className="text-center">User Info</h1>

                <div
                    clearfix
                    style={{
                    marginBottom: '10px'
                }}>
                    <p
                        style={{
                        marginLeft: '8px',
                        marginRight: '8px',
                        display: 'inline-block'
                    }}>Your Squad:</p>

                    <ButtonDropdown
                        isOpen={this.state.squadListDropdownOpen}
                        toggle={this.toggleSquadList}>
                        <DropdownToggle id="squad-list-dropdown-toggle" caret>
                            My Squads
                        </DropdownToggle>
                        <DropdownMenu id='squad-list-dropdown'>
                            <DropdownItem>Serie A</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>

                <div className="text-center" clearfix>
                    <hr className="left float-left" align="left" width="35%"/>
                    <hr className="right float-right" align="right" width="35%"/>
                    <p>or</p>
                </div>

                <Form>
                    <InputGroup>
                        <p>Create new squad below:</p>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon id='input-label'>Squad Name / Type</InputGroupAddon>
                        <Input/>
                    </InputGroup>
                    <FormGroup>
                        <InputGroup>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle id="formation-dropdown-toggle" caret>
                                    {this.state.UserformationSelected}
                                </DropdownToggle>
                                <DropdownMenu id='formation-dropdown'>
                                    {formationsList}
                                </DropdownMenu>
                            </ButtonDropdown>
                            <Input type="number" className="text-center" placeholder='Team Rating'/>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

const formations = ["4-1-2-1-2", "4-3-2-1", "4-2-3-1", "4-3-3(4)", "4-3-1-2"];
const formationsList = formations.map((formation) => <DropdownItem
    onClick={() => this.userFormationOnClick}
    key={formation}
    value={formation}>{formation}</DropdownItem>);

export default UserInfo;