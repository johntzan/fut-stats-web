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
    DropdownMenu,
    Button
} from 'reactstrap';
import formations from '../../helpers/formations';
import firebase from '../../config/firebase-config.js';

class UserInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            squadListDropdownOpen: false,
            isCreateNewSquadVisible: false,
            userSquads: [],
            newSquad: {
                name: '',
                teamRating: '',
                formation: 'Formation'
            }
        };

        let localUserSquads = [];
        const thisComp = this; //getting this for using this.state in firebase function.
        this.userId = firebase.auth().currentUser.uid;
        firebase.database().ref(this.userId+'/squads/').once('value').then(function(snapshot) {

            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                localUserSquads.push(childData);
            });

            if (localUserSquads.length > 0) {
                thisComp.state.userSquads = localUserSquads;
                    let event = {
                        target: {
                            name: 'userInfo',
                            value: JSON.stringify(localUserSquads[0])
                        }
                    }
                    //setting userInfo to first option if available
                    thisComp
                        .props
                        .handleUserInfoChanges(event);
                         
            } else {
                //create local storage option with empty array
                firebase.database().ref(thisComp.userId+'/squads/').set({});
                //this.state.userSquads already set to [] in constructor
            }
        });

        this.toggle = this
            .toggle
            .bind(this);
        this.toggleSquadList = this
            .toggleSquadList
            .bind(this);

        this.toggleCreateNewSquad = this
            .toggleCreateNewSquad
            .bind(this);
        this.createNewSquad = this
            .createNewSquad
            .bind(this);

        this.handleNewUserSquadInput = this
            .handleNewUserSquadInput
            .bind(this);

    }

    handleNewUserSquadInput(event) {

        const newSquad = this.state.newSquad;
        const newSquadInfo = {
            ...newSquad,
            [event.target.name]: event.target.value
        };

        this.setState({newSquad: newSquadInfo});
    };

    toggleCreateNewSquad() {
        this.setState({
            isCreateNewSquadVisible: !this.state.isCreateNewSquadVisible
        })
    }

    createNewSquad() {
        let newUserSquads = this.state.userSquads;
        newUserSquads.push(this.state.newSquad);
        
        firebase.database().ref(this.userId+'/squads/').set((newUserSquads));
        this.setState({userSquads: newUserSquads});
        let event = {
            target: {
                name: 'userInfo',
                value: JSON.stringify(this.state.newSquad)
            }
        }
        //setting userInfo to newly created.
        this
            .props
            .handleUserInfoChanges(event);

        //set new squad back to empty-default
        this.setState({
            newSquad: {
                name: '',
                formation: 'Formation',
                teamRating: ''
            }
        })

        this.toggleCreateNewSquad();

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

    componentDidMount() {}

    render() {

        const formationsList = formations.map((formation) => <DropdownItem
            onClick={this.handleNewUserSquadInput}
            name="formation"
            key={formation}
            value={formation}>{formation}</DropdownItem>);

        const userSquads = this.state.userSquads;

        let createNewSquadBtnVisibility = 'inline-block';
        if (this.state.isCreateNewSquadVisible) {
            createNewSquadBtnVisibility = 'none';
        }

        return (
            <Container className="container-stats text-center">
                <h1 className="text-center">User Info</h1>

                {userSquads !== null && userSquads.length > 0 && <div style={{
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
                            {this.props.userInfo.userTeamName}
                        </DropdownToggle>
                        <DropdownMenu id='squad-list-dropdown'>
                            {userSquads !== null && userSquads.map((squad, index) => <DropdownItem
                                onClick={this.props.handleUserInfoChanges}
                                name="userInfo"
                                key={index}
                                value={JSON.stringify(squad)}>{squad.name}</DropdownItem>)}
                        </DropdownMenu>
                    </ButtonDropdown>

                    <div className="text-center">
                        <hr className="left float-left" align="left" width="35%"/>
                        <hr className="right float-right" align="right" width="35%"/>
                        <p>or</p>
                    </div>
                </div>}

                <div className="text-center">
                    <Button
                        disabled={this.state.isCreateNewSquadVisible}
                        style={{
                        display: createNewSquadBtnVisibility
                    }}
                        color="primary"
                        onClick={this
                        .toggleCreateNewSquad
                        .bind(this)}>Create New Squad</Button>
                </div>
                {this.state.isCreateNewSquadVisible && <div>
                    <Form style={{
                        margin: '5px'
                    }}>
                        <InputGroup>
                            <InputGroupAddon id='input-label'>Squad Name / Type</InputGroupAddon>
                            <Input
                                name="name"
                                onChange={this.handleNewUserSquadInput}
                                value={this.state.newSquad.name}
                                valid={this.state.newSquad.name.length > 0}/>
                        </InputGroup>
                        <FormGroup>
                            <InputGroup>
                                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle id="formation-dropdown-toggle" caret>
                                        {this.state.newSquad.formation}
                                    </DropdownToggle>
                                    <DropdownMenu id='formation-dropdown'>
                                        {formationsList}
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <Input
                                    type="number"
                                    name="teamRating"
                                    onChange={this.handleNewUserSquadInput}
                                    value={this.state.newSquad.teamRating}
                                    valid={this.state.newSquad.teamRating.length > 0 && this.state.newSquad.teamRating.length < 3}
                                    className="text-center"
                                    placeholder='Team Rating'/>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <Button
                        color="primary"
                        style={{
                        margin: '5px'
                    }}
                        disabled={this.state.newSquad.name.length < 1 || this.state.newSquad.formation === 'Formation' || this.state.newSquad.teamRating.length < 1 || this.state.newSquad.teamRating.length > 2}
                        onClick={this.createNewSquad}>Create New Squad</Button>
                    <Button
                        color="secondary"
                        style={{
                        margin: '5px'
                    }}
                        onClick={this.toggleCreateNewSquad}>Hide</Button>
                </div>
}
            </Container>
        );
    }
}

export default UserInfo;