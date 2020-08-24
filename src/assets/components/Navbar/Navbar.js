import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";
//import Deconnexion from "../Deconnexion/Deconnexion";

class BarreMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  connect = () => {
    if (localStorage.getItem("token") === null) {
      return (
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Link className="navlink">
              <Link className="link" to="/Connexion">
                Se connecter
              </Link>
            </Nav.Link>
            <Nav.Link className="navlink">
              <Link className="link" to="/Inscription">
                S'inscrire
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      );
    } else {
      return (
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Link className="navlink">
              <Link className="link" to="/Profil">
                Gérer mon compte
              </Link>
            </Nav.Link>
            <Nav.Link className="navlink">
              <Link className="link" to="/Historique">
                Historique de pourboires
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      );
    }
  };

  componentDidMount() {
    this.connect();
  }

  render() {
    return (
      <div className="barre-de-menu">
        <Navbar expand="lg">
          <Nav.Link>
            <Link to="/Home">
              <img src="logoTTT/logotranspblanc.png" className="logo" />
            </Link>
          </Nav.Link>
          <Navbar.Toggle
            className="justify-content-end"
            aria-controls="basic-navbar-nav"
          >
            <i class="fas fa-ellipsis-v"></i>
          </Navbar.Toggle>
          {this.connect()}
        </Navbar>
      </div>
    );
  }
}
export default BarreMenu;
