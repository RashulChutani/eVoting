import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NavBar-moreSize">
      <Navbar color="light" light expand="lg">
        <NavbarBrand href="/"><h1>eVoting</h1></NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/vote">Vote</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/results">Results</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      </div>
    );
  }
}

export default NavBar;
