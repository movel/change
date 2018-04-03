import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class App extends Component {
    onLoginClick(){
			this.props.onLoginClick();
		}

    render() {
        return ( 
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        ReactAuth App
                    </Navbar.Brand> 
                </Navbar.Header>
                <Nav>
                    <NavItem onClick={this.onLoginClick.bind(this)} href="#">Login</NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default App; 