import React, { Component } from "react";

import SwapiService from "../../services/SwapiService";

import "./RandomPlanet.css";
import Spinner from "../Spinner";
import PlanetView from "./PlanetView";
import ErrorIndicator from "../ErrorIndicator";

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = planet => {
    this.setState({ planet, loading: false });
  };

  onError = error => {
    this.setState({ error: true, loading: false });
  };

  updatePlanet() {
    const id = 15;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}
