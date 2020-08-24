import React, { Component } from "react";
import "./inscription.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

/*import FormControl from "react-bootstrap/FormControl";*/

class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: null,
      firstname: null,
      email: null,
      password: null,
      gender: null,
      age: null,
      adress: null,
      phone: null,
      cg: false,
    };
  }
  /* toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };*/
  /*fonction pour ecrire dans nos input*/
  change = (event) => {
    this.setState({
      [event.target.name]: event.target.value, // identifier Id de l'input = choisir la valeur qui se trouve dans l'input
    });
  };

  checkboxchange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked, // identifier Id de l'input = choisir la valeur qui se trouve dans l'input
    });
  };

  addNewRegister = (e) => {
    e.preventDefault();
    if (!this.state.cg) {
      this.setState({ message: "Veuillez accepter les CGU-CGV. Merci." });
      return;
    }
    const data = {
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      age: this.state.age,
      adress: this.state.adress,
      phone: this.state.phone,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("http://localhost:8080/client/register", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });

          if (responseObject.success === true) {
            alert(
              "Votre inscription a bien été prise en compte. Vous pouvez désormais accéder à votre compte"
            );
            this.props.history.push("/Connexion");
          } /* pour allez vers la page connexion une fois l'inscription done--success déclaré en back*/
        },

        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <Container className="blocprincipal ">
        <div className="Titre">
          <p>FORMULAIRE D'INSCRIPTION </p>
        </div>

        <Form className="form1">
          <p className="sous-titre">Données requises </p>
          <Form.Group controlId="lastname">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom"
              name="lastname"
              onChange={this.change}
            />
          </Form.Group>
          <Form.Group controlId="firstname">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Prénom"
              name="firstname"
              onChange={this.change}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="mail"
              placeholder="example@gmail.com"
              name="email"
              onChange={this.change}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Mot de passe </Form.Label>
            <p className="reglemdp">
              Doit contenir au moins 8 caractères dont : une minuscule, une
              majuscule, un chiffre et un caractère special.
            </p>
            <Form.Control
              type="password"
              placeholder="**************"
              name="password"
              onChange={this.change}
            />
          </Form.Group>
        </Form>
        <Form className="form2">
          <p className="sous-titre">Données facultatives </p>
          <Form.Group controlId="gender">
            <Form.Label> Genre </Form.Label>
            <Form.Control
              as="select"
              type="text"
              name="gender"
              onChange={this.change}
            >
              <option>-</option>
              <option>Femme</option>
              <option>Homme</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="adress">
            <Form.Label>Ville ou Code Postal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cannes, Nice, Mougins, 06200, ..."
              name="adress"
              onChange={this.change}
            />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Numéro de téléphone</Form.Label>
            <Form.Control
              type="text"
              placeholder="06XXXXXXXX"
              name="phone"
              onChange={this.change}
            />
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre âge ( sans vous rajeunir ;-) )"
              name="age"
              onChange={this.change}
            />
          </Form.Group>
        </Form>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            className="checkbox"
            type="checkbox"
            label="J'accepte les CGU et CGV.*"
            onChange={this.checkboxchange}
            name="cg"
          />

          <p className="asterisque">
            * Vous pouvez retrouvez toutes les conditions en barre d'infos !
          </p>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            className="checkbox"
            type="checkbox"
            label="J'accepte que mes données soient utilisés à des fins commerciales."
          />
        </Form.Group>
        <Button
          className="buttonInscri"
          variant="outline-warning"
          size="sm"
          block
          type="submit"
          onClick={this.addNewRegister}
        >
          S'inscrire
        </Button>
        <br />
        <p>{this.state.message}</p>
      </Container>
    );
  }
}
export default Inscription;
