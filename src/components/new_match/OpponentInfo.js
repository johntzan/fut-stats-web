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

        this.state = {
            dropdownOpen: false,
            oppSquad: []
        };

        this.toggle = this
            .toggle
            .bind(this);

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
            .oppSquad
            .indexOf(selected);
        if (index < 0) {
            this
                .state
                .oppSquad
                .push(selected);
        } else {
            this
                .state
                .oppSquad
                .splice(index, 1);
        }
        this.setState({
            oppSquad: [...this.state.oppSquad]
        });

        this
            .props
            .console
            .log(this.state.oppSquad);
    }

    render() {

        const formations = ["4-1-2-1-2", "4-3-2-1", "4-2-3-1", "4-3-3(4)", "4-3-1-2"];
        const formationsList = formations.map((formation) => <DropdownItem
            onClick={this.props.handleOppInfoChanges}
            name="oppFormationSelected"
            key={formation}
            value={formation}>{formation}</DropdownItem>);

        return (
            <Container className="container-stats">

                <h1 className="text-center">Opponent Info</h1>
                <Form>
                    <InputGroup>
                        <InputGroupAddon id='input-label'>GamerTag</InputGroupAddon>
                        <Input
                            name="oppName"
                            onChange={this.props.handleOppInfoChanges}
                            value={this.props.oppInfo.oppName}/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon id='input-label'>Team Name</InputGroupAddon>
                        <Input
                            name="oppTeamName"
                            onChange={this.props.handleOppInfoChanges}
                            value={this.props.oppInfo.oppTeamName}/>
                    </InputGroup>
                    <FormGroup>
                        <InputGroup>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle id="formation-dropdown-toggle" caret>
                                    {this.props.oppInfo.oppFormationSelected}
                                </DropdownToggle>
                                <DropdownMenu id='formation-dropdown'>
                                    {formationsList}
                                </DropdownMenu>
                            </ButtonDropdown>
                            <Input
                                type="number"
                                name="oppTeamRating"
                                onChange={this.props.handleOppInfoChanges}
                                value={this.props.oppInfo.oppTeamRating}
                                className="text-center"
                                placeholder='Team Rating'/>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup className="text-center">
                        <p>
                            Squad Type / League Selection</p>
                        <ButtonGroup id="squad-type-selection">
                            <Button
                                size="sm"
                                onClick={() => this.props.handleOppInfoSquadType("EPL")}
                                active={this
                                .props
                                .oppInfo
                                .oppSquad
                                .includes("EPL")}>EPL</Button>
                            <Button
                                size="sm"
                                onClick={() => this.props.handleOppInfoSquadType("Serie A")}
                                active={this
                                .props
                                .oppInfo
                                .oppSquad
                                .includes("Serie A")}>Serie A</Button>
                            <Button
                                size="sm"
                                onClick={() => this.props.handleOppInfoSquadType("Bundes")}
                                active={this
                                .props
                                .oppInfo
                                .oppSquad
                                .includes("Bundes")}>Bundes</Button>
                            <Button
                                size="sm"
                                onClick={() => this.props.handleOppInfoSquadType("La Liga")}
                                active={this
                                .props
                                .oppInfo
                                .oppSquad
                                .includes("La Liga")}>La Liga</Button>
                            <Button
                                size="sm"
                                onClick={() => this.props.handleOppInfoSquadType("Ligue 1")}
                                active={this
                                .props
                                .oppInfo
                                .oppSquad
                                .includes("Ligue 1")}>Ligue 1</Button>
                            <Button
                                size="sm"
                                onClick={() => this.props.handleOppInfoSquadType("Hybrid")}
                                active={this
                                .props
                                .oppInfo
                                .oppSquad
                                .includes("Hybrid")}>Hybrid</Button>
                            <Button
                                size="sm"
                                onClick={() => this.props.handleOppInfoSquadType("1 Nation")}
                                active={this
                                .props
                                .oppInfo
                                .oppSquad
                                .includes("1 Nation")}>1 Nation</Button>
                            <Button
                                size="sm"
                                onClick={() => this.props.handleOppInfoSquadType("Other")}
                                active={this
                                .props
                                .oppInfo
                                .oppSquad
                                .includes("Other")}>Other</Button>
                        </ButtonGroup>
                    </FormGroup>

                </Form>
            </Container>

        );
    }
}

export default OpponentInfo;