import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./footer.css";
class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Navbar
          collapseOnSelect
          expand="sm"
          bg="#edeaea"
          fixed="bottom"
          className="footer"
        >
          <Link to="/Home">
            <Navbar.Brand href="#home" className="textFooter">
              #TiptoThank
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <i class="fas fa-book-open"></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown
                title="Conditions générales"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="cgu-cgv/CGV_TIPTOTHANK.pdf">
                  CG de vente
                </NavDropdown.Item>
                <NavDropdown.Item href="cgu-cgv/CGU_MangoPay.pdf">
                  CG d'utilisation
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown title="Nous contacter" id="collasible-nav-dropdown">
                <NavDropdown.Item href="mailto:tiptothank@gmail.com">
                  <i class="far fa-envelope"></i>
                </NavDropdown.Item>
                <NavDropdown.Item href="https://facebook.fr">
                  <i class="fab fa-facebook-f"></i>
                </NavDropdown.Item>
                <NavDropdown.Item href="https://instagram.fr">
                  <i class="fab fa-instagram"></i>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="mr-auto">
              <NavDropdown title="Langues" id="collasible-nav-dropdown">
                <NavDropdown.Item>Francais</NavDropdown.Item>
                <NavDropdown.Item>English</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="mr-auto">
              <NavDropdown
                title="A propos de TiptoThank"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item>Les fondateurs</NavDropdown.Item>
                <NavDropdown.Item>Etcetera</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
