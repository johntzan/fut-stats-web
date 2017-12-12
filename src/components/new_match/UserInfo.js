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
    Button,
    ModalHeader,
    Modal,
    ModalFooter,
    ModalBody
} from 'reactstrap';
import formations from '../../helpers/formations';

class UserInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            squadListDropdownOpen: false,
            isCreateNewSquadModalOpen: false,
            userSquads: JSON.parse(localStorage.getItem('userSquads')),
            newSquad: {
                name: '',
                teamRating: '',
                formation: 'Formation'
            }
        };

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
            isCreateNewSquadModalOpen: !this.state.isCreateNewSquadModalOpen
        })
    }

    createNewSquad() {
        let newUserSquads = [];
        if (this.state.userSquads !== null && this.state.userSquads !== undefined) {
            newUserSquads = this.state.userSquads;
        }
        newUserSquads.push(this.state.newSquad);
        localStorage.setItem('userSquads', JSON.stringify(newUserSquads));
        this.setState({userSquads: newUserSquads});
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
                        color="primary"
                        onClick={this
                        .toggleCreateNewSquad
                        .bind(this)}>Create New Squad</Button>
                </div>

                <Modal
                    isOpen={this.state.isCreateNewSquadModalOpen}
                    toggle={this.toggleCreateNewSquad}>
                    <ModalHeader
                        toggle={this
                        .toggleCreateNewSquad
                        .bind(this)}>Create New Squad Below:</ModalHeader>
                    <ModalBody>
                        <Form>
                            <InputGroup>
                                <InputGroupAddon id='input-label'>Squad Name / Type</InputGroupAddon>
                                <Input
                                    name="name"
                                    onChange={this.handleNewUserSquadInput}
                                    value={this.state.newSquad.name}/>
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
                                        className="text-center"
                                        placeholder='Team Rating'/>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.createNewSquad}>Create</Button>
                        <Button color="secondary" onClick={this.toggleCreateNewSquad}>Close</Button>
                    </ModalFooter>

                </Modal>
            </Container>
        );
    }
}

export default UserInfo;