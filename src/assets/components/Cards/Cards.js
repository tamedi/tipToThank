import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  click = () => {
    this.props.history.push({
      pathname: "/Payment",
      state: {
        serveurId: this.props.id,
      },
    });
  };

  render() {
    return (
      <Container className="blocprincipal">
        <Card>
          <Card.Img
            variant="top"
            src={"http://localhost:8080" + this.props.image}
          />
          <Card.Body>
            <Card.Title>{this.props.lastname}</Card.Title>
            <Card.Text>{this.props.firstname}</Card.Text>

            <Button variant="warning" size="sm" onClick={this.click}>
              Donner un Tip
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Cards;
