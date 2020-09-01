import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/SoulsmileNavbar.css';
import soulsmile from '../images/soulsmile-48.png';

function SoulsmileNavbar() {
  return (
    <>
    <Navbar sticky="top" className="navbar" expand="lg">
      <Navbar.Brand href="/">
        <img
          alt="?"
          src={soulsmile}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        soul<span id="smile">smile</span> club
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/how-it-works">How It Works</Nav.Link>
            <NavDropdown title="Browser Extension" id="basic-nav-dropdown">
              <NavDropdown.Item href="/browser-extension">Get Extension</NavDropdown.Item>
              <NavDropdown.Item href="/how-to-use">How to Use</NavDropdown.Item>
              <NavDropdown.Item href="/privacy-policy">Privacy Policy</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/retailers">Retailers</Nav.Link>
            <Nav.Link href="/causes">Causes</Nav.Link>
            <NavDropdown title="About Us" id="basic-nav-dropdown">
              <NavDropdown.Item href="/vision">Vision</NavDropdown.Item>
              <NavDropdown.Item href="/team">Team</NavDropdown.Item>
              <NavDropdown.Item href="/monthly-reports">Monthly Reports</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/faq">FAQs</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
}

export default SoulsmileNavbar;
