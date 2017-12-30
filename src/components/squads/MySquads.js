import React, { Component } from 'react';
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
    Navbar,
    NavbarBrand,
    Row,
    Col, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import './MySquads.css';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import firebase from '../../config/firebase-config.js';
import formations from '../../helpers/formations';

class MySquads extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userSquads: [],
            dropdownOpen: false,
            isCreateNewSquadVisible: false,
            isEditDropdownOpen: false,
            isEditModalOpen: false,
            editIndex: -1,
            newSquad: {
                name: '',
                teamRating: '',
                formation: 'Formation'
            },
            editSquad: {
                name: '',
                teamRating: '',
                formation: 'Formation'
            }
        }

        this.createNewSquad = this
        .createNewSquad
        .bind(this);

        this.handleNewUserSquadInput = this.handleNewUserSquadInput.bind(this);
        this.toggleCreateNewSquad = this.toggleCreateNewSquad.bind(this);
        this.toggle = this.toggle.bind(this);
        this.deleteSquad = this.deleteSquad.bind(this);
        this.editSquad = this.editSquad.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.toggleEditDropdown = this.toggleEditDropdown.bind(this);
        this.editOnChange = this.editOnChange.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleEditModal(){
        this.setState({
            isEditModalOpen: !this.state.isEditModalOpen
        })
    }

    toggleEditDropdown(){
        this.setState({
            isEditDropdownOpen: !this.state.isEditDropdownOpen
        })
    }

    handleNewUserSquadInput(event) {

        const newSquad = this.state.newSquad;
        const newSquadInfo = {
            ...newSquad,
            [event.target.name]: event.target.value
        };

        this.setState({newSquad: newSquadInfo});
    };

    editOnChange(event){
        const editSquad = this.state.editSquad;
        const newEditInfo = {
            ...editSquad,
            [event.target.name]: event.target.value
        };

        this.setState({editSquad: newEditInfo});
    }

    saveEdit(){
        let newUserSquads = this.state.userSquads;
        newUserSquads[this.state.editIndex] = this.state.editSquad;
        
        firebase.database().ref(this.userId+'/squads/').set((newUserSquads));
        this.setState({
            userSquads: newUserSquads,
            editSquad: {
                name: '',
                teamRating: '',
                formation: 'Formation'
            }});
        this.toggleEditModal();
    }

    toggleCreateNewSquad() {
        this.setState({
            isCreateNewSquadVisible: !this.state.isCreateNewSquadVisible
        })
    }

    createNewSquad() {
        let newUserSquads = this.state.userSquads;
        newUserSquads.push(this.state.newSquad);
        
        firebase.database().ref(this.userId+'/squads/').set((newUserSquads));
        this.setState({
            userSquads: newUserSquads,
            newSquad: {
                name: '',
                teamRating: '',
                formation: 'Formation'
            }});
        this.toggleCreateNewSquad();
    }

    deleteSquad(index){
        console.log(index);
        let newUserSquads = this.state.userSquads;
        newUserSquads.splice(index, 1);
        
        firebase.database().ref(this.userId+'/squads/').set((newUserSquads));
        this.setState({
            userSquads: newUserSquads
            });
        this.toggleCreateNewSquad();
    }

    editSquad(index){
       this.setState({
           editSquad: this.state.userSquads[index],
           editIndex: index
       });

       this.toggleEditModal();

    }

    componentDidMount() {
        let localUserSquads = [];
        const thisComp = this; //getting this for using this.state in firebase function.
        this.userId = firebase.auth().currentUser.uid;
        firebase.database().ref(this.userId+'/squads/').once('value').then(function(snapshot) {

            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                localUserSquads.push(childData);
            });

            if (localUserSquads.length > 0) {
                thisComp.setState({
                    userSquads: localUserSquads       
                });
            }
        });
    }
    
    
    render() {

        const formationsList = formations.map((formation) => <DropdownItem
            onClick={this.handleNewUserSquadInput}
            name="formation"
            key={formation}
            value={formation}>{formation}</DropdownItem>);

        const userSquads = this.state.userSquads;
        console.log(userSquads)

        let createNewSquadBtnVisibility = 'inline-block';
        if (this.state.isCreateNewSquadVisible) {
            createNewSquadBtnVisibility = 'none';
        }

        return (
            <Container className="container-main">
                <Navbar xs="12" color="transparent" dark expand="md">
                    <Button
                        onClick={this.props.history.goBack}
                        size="lg"
                        className="back-btn float-left"><MdArrowBack size="24"/></Button>
                    <NavbarBrand >
                        <h3 className="page-title">My Squads</h3>
                    </NavbarBrand>
                </Navbar>

                <Row>
                    {userSquads.map((squad, index) => <SquadBox edit={() => this.editSquad(index)} name="squad" key={index} delete={() => this.deleteSquad(index)} squad={squad} formationsList={formationsList}></SquadBox>)}
                    <Col xs="12" className="text-center">
                        <Button
                            disabled={this.state.isCreateNewSquadVisible}
                            style={{
                            display: createNewSquadBtnVisibility,
                            marginTop: '20px'
                            }}
                            color="primary"
                            onClick={this
                            .toggleCreateNewSquad
                            .bind(this)}>Create New Squad
                        </Button>
                        {this.state.isCreateNewSquadVisible && 
                        <Card>
                            <CardBody>
                        <div>
                    <Form className="mx-auto" style={{
                        margin: '5px',
                        maxWidth: '600px'
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
                </CardBody>
                        </Card>
                    }
                     </Col>
                </Row>
                <EditModal isEditModalOpen={this.state.isEditModalOpen}
                    toggleEditModal={this.toggleEditModal}
                    toggleEditDropdown={this.toggleEditDropdown}
                    isEditDropdownOpen={this.state.isEditDropdownOpen}
                    onChange={this.editOnChange}
                    formations={formations}
                    save={this.saveEdit} squad={this.state.editSquad}></EditModal>
            </Container>
        );
    }
}

const EditModal = (props) => {

    const formationsList = props.formations.map((formation) => <DropdownItem
    onClick={props.onChange}
    name="formation"
    key={formation}
    value={formation}>{formation}</DropdownItem>);

    return (
        <Modal className="edit-squad-modal" isOpen={props.isEditModalOpen} toggle={props.toggleEditModal}>
            <ModalHeader toggle={props.toggleEditModal}>Edit Squad</ModalHeader>
            <ModalBody>
            <Form className="mx-auto" style={{
                        margin: '5px',
                        maxWidth: '600px'
                    }}>
                        <InputGroup>
                            <InputGroupAddon id='input-label'>Squad Name / Type</InputGroupAddon>
                            <Input
                                name="name"
                                onChange={props.onChange}
                                value={props.squad.name}
                                valid={props.squad.name.length > 0}/>
                        </InputGroup>
                        <FormGroup>
                            <InputGroup>
                                <ButtonDropdown isOpen={props.isEditDropdownOpen} toggle={props.toggleEditDropdown}>
                                    <DropdownToggle id="formation-dropdown-toggle" caret>
                                        {props.squad.formation}
                                    </DropdownToggle>
                                    <DropdownMenu id='formation-dropdown'>
                                        {formationsList}
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <Input
                                    type="number"
                                    name="teamRating"
                                    onChange={props.onChange}
                                    value={props.squad.teamRating}
                                    valid={props.squad.teamRating.length > 0 && props.squad.teamRating.length < 3}
                                    className="text-center"
                                    placeholder='Team Rating'/>
                            </InputGroup>
                        </FormGroup>
                    </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={props.save}>Save</Button>
                <Button color="secondary" onClick={props.toggleEditModal}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

const SquadBox = (props) => {
    console.log(props);

    return (
        <Col xs="12" md="6">
            <Card>
                <CardBody>
                <div>
                    <h5>Squad Name / Type: {props.squad.name}</h5>
                    <h5>Formation: {props.squad.formation}</h5>
                    <h5>Team Rating: {props.squad.teamRating}</h5>
                    
                    <div className="text-right">
                    <Button
                        color="primary"
                        style={{
                            margin: '5px'
                        }}
                        onClick={props.edit}>Edit</Button>
                    <Button
                        color="danger"
                        style={{
                            margin: '5px'
                        }}
                        onClick={props.delete}>Delete</Button>
                    </div>
                </div>
                </CardBody>
            </Card>
            </Col>
    );
}

export default MySquads;