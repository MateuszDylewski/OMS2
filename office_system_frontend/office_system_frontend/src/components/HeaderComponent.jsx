import React, { Component } from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    navToEmplList(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand href="http://localhost:3000/employees">Employee List App</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="http://localhost:3000/employees">Employee List</Nav.Link>
                                <Nav.Link href="http://localhost:3000/add-employee/-1">Add Employee</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default HeaderComponent;