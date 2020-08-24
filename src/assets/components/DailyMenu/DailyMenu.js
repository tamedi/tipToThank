import React, { Component } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./DailyMenu.css";

class DailyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: { dailyMenu: { picture: "", label: "" } },
    };
  }

  getDailyMenu = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch("http://localhost:8080/client/getMenu", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          this.setState({ menu: data.menu });
        },
        (err) => {
          console.log(err);
        }
      );
  };

  componentDidMount() {
    this.getDailyMenu();
  }

  render() {
    return (
      <Container className="blocprincipal">
        <Card>
          <h2 className="Titre">MENU DU JOUR</h2>
          <Card.Body>
            <p className="datemenu">{this.state.menu.dailyMenu.label}</p>
          </Card.Body>
          <Card.Img
            variant="top"
            src={"http://localhost:8080/" + this.state.menu.dailyMenu.picture}
            className="dailyMenu"
            alt="Menu du Jour"
          />
          <Link to="/Home">
            <Button className="button" variant="outline-warning" size="lg">
              POURBOIRE
            </Button>
          </Link>
        </Card>
      </Container>
    );
  }
}

export default DailyMenu;
