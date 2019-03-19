import React, { Component } from "react";

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";

import ItemDetails from "../ItemDetails";
import { Record } from "../ItemDetails/ItemDetails";

import "./App.css";
import ErrorIndicator from "../ErrorIndicator";
import SwapiService from "../../services/SwapiService";
import Row from "../Row";
import ErrorBoundary from "../ErrorBoundary";

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

    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage
    } = this.swapiService;

    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );

    return (
      <ErrorBoundary>
        <div className="stardb-app">
          <Header />
          {/* {planet} */}

          {/* <div className="row mb2 button-row">
            <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}
            >
              Toggle Random Planet
            </button>
          </div>

          <PeoplePage /> */}

          <Row left={personDetails} right={starshipDetails} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
