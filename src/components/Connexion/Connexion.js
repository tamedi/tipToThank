import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import React, { Component } from "react";
import "./connexion.css";
import { Link } from "react-router-dom";

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = { email: null, password: null };
  }

  change = (event) => {
    this.setState({
      [event.target.id]: event.target.value, // identifier Id de l'input = choisir la valeur qui se trouve dans l'input
    });
  };

  loginClient = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("http://localhost:8080/client/login", options)
      .then((response) => {
        return response.json();
      })

      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
          if (responseObject.token && responseObject.userId) {
            /*stocker le token et l'userId dans le localStorage pour pouvoir les rappeler une fois la connection reussie */
            localStorage.setItem("token", responseObject.token);
            localStorage.setItem("userID", responseObject.userId);
            /*permet d'allez vers la page profil APRES avoir valider la connexion (et pouvoir recuperer le localstorage aussi)*/
            this.props.history.push("/Profil");
          }
        },

        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <Container className="blocprincipal ">
        <Form>
          <Form.Label className="text">
            Déjà membre? Connectez-vous !
          </Form.Label>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              name="email"
              type="email"
              placeholder="Votre e-mail"
              id="email"
              onChange={this.change}
              value={this.state.email}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              name="password"
              type="password"
              placeholder="Mot de passe"
              className="mb-2"
              id="password"
              onChange={this.change}
              value={this.state.password}
            />
          </Form.Group>

          <Button
            variant="outline-warning"
            size="sm"
            type="submit"
            className="mb-2"
            onClick={this.loginClient}
          >
            Se connecter
          </Button>
          <p>{this.state.message}</p>

          <Button className="forgetpwd" variant="link" size="sm">
            Mot de passe oublié ?
          </Button>

          <Form.Group>
            <Form.Label className="text2">
              Nouveau? Créer votre compte !
            </Form.Label>
          </Form.Group>
          <Link to="/Inscription">
            <Button variant="outline-warning" size="sm" type="submit">
              S'inscrire
            </Button>
          </Link>
        </Form>
      </Container>
    );
  }
}
export default Connexion;
