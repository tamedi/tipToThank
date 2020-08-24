/**
 * App.js - Main app component
 */

/*Module imports*/
import React, { Component } from "react";
import Inscription from "../Inscription/Inscription";
import "bootstrap/dist/css/bootstrap.min.css";
import Connexion from "../Connexion/Connexion";
import Profil from "../Profil/Profil";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "../../assets/components/Footer/Footer";
import HomePageClient from "../HomePageClient/HomePageClient";
import Liste from "../ListeServeurs/ListeServeurs";
import BarreMenu from "../../assets/components/Navbar/Navbar";
import Payment from "../Payment/Payment";
import Menu from "../Menu/Menu";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.

/*Main app component*/
class App extends Component {
  /* constructor(props) {
    super(props);
  }*/

  render() {
    return (
      <div>
        <Router>
          <BarreMenu />
          <Switch>
            <Route path="/Inscription" exact component={Inscription} />
            <Route path="/Connexion" exact component={Connexion} />
            <Route path="/Profil" exact component={Profil} />
            <Route path="/Home" exact component={HomePageClient} />
            <Route path="/ListeServeurs" exact component={Liste} />
            <Route path="/Payment" exact component={Payment} />
            <Route path="/LaBrasseRit" exact component={Menu} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
export default App;
