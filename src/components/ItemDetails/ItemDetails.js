import React, { Component } from "react";

import "./ItemDetails.css";
import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner";

export const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: null,
    loading: true,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    this.setState({ loading: true });
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId).then(item => {
      this.setState({ item, loading: false, image: getImageUrl(item) });
    });
  }

  render() {
    const { item, image } = this.state;
    if (!item) {
      return <span>Select an item from the list</span>;
    }

    const { id, name, gender, birthYear, eyeColor } = this.state.item;

    const content = this.state.loading ? (
      <Spinner />
    ) : (
      <div className="item-details card">
        <img className="item-image" src={image} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child, index) => {
              return React.cloneElement(child, { item });
            })}
          </ul>
        </div>
      </div>
    );

    return content;
  }
}
