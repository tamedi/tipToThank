import React, { Component } from "react";
//import Navbar from "../../assets/components/Navbar/Navbar";
//import Historique from "../Historique/Historique";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

//import Historique from "../Historique/Historique";

/*style import*/
import "./profil.css";

class Client extends Component {
  constructor(props) {
    console.log();
    super(props);
    this.state = {
      client: { historique: [] },
    };
  }
  click = () => {
    this.props.history.push({
      pathname: "/ListeServeurs",
    });
  };

  /* dataHistorique = () => {
    let contentDataHistorique = [];
    this.state.client.historique.forEach((element, index) => {
      contentDataHistorique.push(
        <Historique
          key={index}
          montant={element.montant}
          waiter={element.waiter}
          date={element.date}
          restaurantName={element.restaurantName}
        />
      );
    });
    return contentDataHistorique;
  };*/

  change = (event) => {
    let client = this.state.client;
    client[event.target.name] = event.target.value;
    this.setState({
      client: client,
      // identifier name de l'input = choisir la valeur qui se trouve dans l'input donc necessité d'avoir le bon name!!
    });
  };

  postDataClient = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      /**on ajoute  pour l'AUTHENTIFICATION le header autorization qui a comme valeur bearer(puis espace) suivi par le token de l'user */
      Authorization: "bearer " + localStorage.getItem("token"),
    });
    const data = {
      /*on appel l'userId dans le body en le recuperant du localstorage */
      userId: localStorage.getItem("userId"),
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("http://localhost:8080/client/getDataClient", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          const clientInfo = responseObject;
          this.setState({ client: clientInfo, object: clientInfo });
          console.log(this.state);
        },

        (error) => {
          console.log(error);
        }
      );
  };
  componentDidMount() {
    this.postDataClient();
  }

  editClient = (e) => {
    e.preventDefault();
    const data = {
      userId: localStorage.getItem(
        "userID"
      ) /*on get l'Id qu'on a stocké durant la connexion*/,
      /*userID avec le ID en majuscule car c'est comme ca qu'on l'a mis dans le local storage (/connexion) */
      client: this.state.client,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      /**on ajoute pour l'AUTHENTIFICATION le header autorization qui a comme valeur bearer(puis espace) suivi par le token de l'user */
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("http://localhost:8080/client/edit", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
        },

        (error) => {
          console.log(error);
        }
      );
  };

  deleteClient = (e) => {
    window.confirm(
      "Etes-vous sur de vouloir supprimer votre compte? Cette action est irréversible."
    );

    e.preventDefault();
    const data = {
      userId: localStorage.getItem(
        "userID"
      ) /*on get l'Id qu'on a stocké durant la connexion*/,
      /*userID avec le ID en majuscule car c'est comme ca qu'on l'a mis dans le local storage (/connexion) */
      client: this.state.client,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "bearer " + localStorage.getItem("token"),
      /**"Bearer Token" est un JSON Web Token dont le rôle est d'indiquer que l'utilisateur 
       qui accède aux ressources est bien authentifié. */
    });

    const options = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("http://localhost:8080/client/delete", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
          alert(
            "La suppression de votre compte a bien été prise en compte. Merci."
          );
          this.props.history.push("/Home");
        },

        (error) => {
          console.log(error);
        }
      );
  };
  signOut = () => {
    localStorage.clear();
    this.props.history.push("/Connexion");
  };
  render() {
    return (
      <Container className="blocprincipal ">
        <Button
          className="buttontip"
          variant="warning"
          size="sm"
          onClick={this.click}
        >
          POURBOIRE
        </Button>
        <p className="Titre-profil">MON PROFIL CLIENT</p>
        <div className="Titre">
          <Button
            className="buttondeco"
            variant="outline-warning"
            type="submit"
            onClick={this.signOut}
          >
            <i class="fas fa-sign-out-alt"></i>
          </Button>
        </div>
        <Form>
          <Form.Group controlId="lastname">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom"
              name="lastname"
              value={this.state.client.lastname}
              onChange={this.change}
            />
          </Form.Group>

          <Form.Group controlId="firstname">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Prénom"
              name="firstname"
              value={this.state.client.firstname}
              onChange={this.change}
            />
          </Form.Group>

          <Form.Group controlId="gender">
            <Form.Label> Genre </Form.Label>
            <Form.Control
              as="select"
              type="text"
              name="gender"
              value={this.state.client.gender}
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
              value={this.state.client.adress}
              onChange={this.change}
            />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Numéro de téléphone</Form.Label>
            <Form.Control
              type="text"
              placeholder="06XXXXXXXX"
              name="phone"
              value={this.state.client.phone}
              onChange={this.change}
            />
          </Form.Group>

          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre âge ( sans vous rajeunir ;-) )"
              name="age"
              value={this.state.client.age}
              onChange={this.change}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
        </Form>
        <Button
          className="buttonedit"
          variant="outline-warning"
          type="submit"
          onClick={this.editClient}
        >
          <i class="fas fa-user-edit"></i>
        </Button>
        <Button
          className="buttondelete"
          variant="outline-warning"
          type="submit"
          onClick={this.deleteClient}
        >
          <i class="far fa-trash-alt"></i>
        </Button>
        <br></br>
        <br></br>
        <br></br> <br></br> <br></br>
        <p>{this.state.message}</p>
      </Container>
    );
  }
}

export default Client;
