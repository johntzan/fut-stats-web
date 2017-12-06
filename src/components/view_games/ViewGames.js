import React, {Component} from 'react';
import './ViewGames.css';
import {
    Container,
    Row,
    Col,
    Navbar,
    Button,
    NavbarBrand
} from 'reactstrap';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
class ViewGames extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Container className="container-main">
                <Navbar xs="12" color="transparent" dark expand="md">
                    <Button
                        onClick={this.props.history.goBack}
                        size="lg"
                        className="back-btn float-left"><MdArrowBack/></Button>
                    <NavbarBrand >
                        <h3 className="page-title">View Games</h3>
                    </NavbarBrand>
                </Navbar>

                <Row>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

export default ViewGames;