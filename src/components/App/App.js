import React, { Component } from "react";

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";
import ItemList from "../ItemList";

import PersonDetails from "../PersonDetails";

import "./App.css";
import ErrorIndicator from "../ErrorIndicator";
import PeoplePage from "../PeoplePage";
import SwapiService from "../../services/SwapiService";

class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  };

  componentDidCatch() {
    this.setSatate({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
      // ErrorIndicator will appear in production only
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <div className="mx-5">
        <Header />
        {planet}

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}
        >
          Toggle Random Planet
        </button>

        <PeoplePage />
      </div>
    );
  }
}

export default App;
