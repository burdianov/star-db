import React, { Component } from "react";

import "./PeoplePage.css";
import ItemList from "../ItemList";
import PersonDetails from "../PersonDetails";
import ErrorIndicator from "../ErrorIndicator";
import SwapiService from "../../services/SwapiService";
import Row from "../Row/Row";

class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
    hasError: false
  };

  componentDidCatch(error, info) {
    debugger;

    this.setState({ hasError: true });
  }

  onPersonSelected = id => {
    this.setState({
      selectedPerson: id
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, gender, birthYear }) =>
          `${name} (${gender}, ${birthYear})`
        }
      />
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );

    return <Row left={itemList} right={personDetails} />;
  }
}

export default PeoplePage;
