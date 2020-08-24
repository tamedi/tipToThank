import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomePageClient.css";

class HomePageClient extends Component {
  render() {
    return (
      <Container className="container">
        <Card className="text-center">
          <Card.Header>Tips sans compte client</Card.Header>
          <Card.Body>
            <Card.Text>Donner un pourboire sans créer de compte. </Card.Text>
            <Link to="/ListeServeurs">
              <Button variant="outline-warning" size="sm">
                Go !
              </Button>
            </Link>
          </Card.Body>
        </Card>

        <Card className="text-center">
          <Card.Header>Tips avec compte client</Card.Header>
          <Card.Body>
            <Card.Text>
              Créer un compte / me connecter et faire partie de la Team
              TiptoThank !<i class="fab fa-angellist"></i>
            </Card.Text>
            <Link to="/Connexion">
              <Button variant="outline-warning" size="sm">
                Go !
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default HomePageClient;
