import React, {Component} from 'react';
import {
    Container,
    Form,
    FormGroup,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    ButtonDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    ButtonGroup
} from 'reactstrap';

class OpponentInfo extends Component {

    constructor(props) {
        super(props);

        this.toggle = this
            .toggle
            .bind(this);
        this.state = {
            dropdownOpen: false,
            cSelected: [],
            OppformationSelected: ""
        };

        this.onCheckboxBtnClick = this
            .onCheckboxBtnClick
            .bind(this);

    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    onCheckboxBtnClick(selected) {
        const index = this
            .state
            .cSelected
            .indexOf(selected);
        if (index < 0) {
            this
                .state
                .cSelected
                .push(selected);
        } else {
            this
                .state
                .cSelected
                .splice(index, 1);
        }
        this.setState({
            cSelected: [...this.state.cSelected]
        });

        console.log('====================================');
        console.log(this.state.cSelected);
        console.log('====================================');
    }

    render() {
        return (
            <Container className="container-stats">

                <h1 className="text-center">Opponent Info</h1>
                <Form>
                    <InputGroup>
                        <InputGroupAddon id='input-label'>GamerTag</InputGroupAddon>
                        <Input/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon id='input-label'>Team Name</InputGroupAddon>
                        <Input/>
                    </InputGroup>
                    <FormGroup>
                        <InputGroup>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle id="formation-dropdown-toggle" caret>
                                    Formation
                                </DropdownToggle>
                                <DropdownMenu id='formation-dropdown'>
                                    {formationsList}
                                </DropdownMenu>
                            </ButtonDropdown>
                            <Input type="number" className="text-center" placeholder='Team Rating'/>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup className="text-center">
                        <p>
                            Squad Type / League Selection</p>
                        <ButtonGroup id="squad-type-selection">
                            <Button
                                size="sm"
                                onClick={() => this.onCheckboxBtnClick("EPL")}
                                active={this
                                .state
                                .cSelected
                                .includes("EPL")}>EPL</Button>
                            <Button
                                size="sm"
                                onClick={() => this.onCheckboxBtnClick("Serie A")}
                                active={this
                                .state
                                .cSelected
                                .includes("Serie A")}>Serie A</Button>
                            <Button
                                size="sm"
                                onClick={() => this.onCheckboxBtnClick("La Liga")}
                                active={this
                                .state
                                .cSelected
                                .includes("La Liga")}>La Liga</Button>
                            <Button
                                size="sm"
                                onClick={() => this.onCheckboxBtnClick("Bundesliga")}
                                active={this
                                .state
                                .cSelected
                                .includes("Bundesliga")}>Bundesliga</Button>
                        </ButtonGroup>
                    </FormGroup>

                </Form>
            </Container>

        );
    }
}

const formations = ["4-1-2-1-2", "4-3-2-1", "4-2-3-1", "4-3-3(4)", "4-3-1-2"];
const formationsList = formations.map((formation) => <DropdownItem key={formation} value={formation}>{formation}</DropdownItem>);

export default OpponentInfo;