import React, { Component } from "react";
import Cards from "../../assets/components/Cards/Cards";

class Liste extends Component {
  constructor(props) {
    console.log();
    super(props);
    this.state = { serveur: [] };
  }

  componentDidMount() {
    this.postDataServeurs();
  }

  postDataServeurs = (e) => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "GET",
      headers: headers,
      /*body: JSON.stringify(data),*/
    };

    fetch("http://localhost:8080/client/getDataServeur", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          this.setState({ serveur: data });
        },

        (error) => {
          console.log(error);
        }
      );
  };

  display = () => {
    let contentDisplay = [];
    this.state.serveur.forEach((element, index) => {
      contentDisplay.push(
        <Cards
          key={index}
          image={element.picture}
          lastname={element.lastname}
          firstname={element.firstname}
          id={element._id}
          history={this.props.history}
        />
      );
    });

    return contentDisplay;
  };

  render() {
    return (
      <div>
        <h1 className="Titre">LISTE DES SERVEURS</h1>
        {this.display()}
      </div>
    );
  }
}

export default Liste;
