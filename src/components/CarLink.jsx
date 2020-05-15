import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CarLink extends Component {
  render() {
    const { state } = this.props;
    return (
      <Link
        data-testid="shopping-cart-button"
        to={{ pathname: '/cart', state: { state } }}
      >
        <i className="fas fa-shopping-cart" />
      </Link>
    );
  }
}

export default CarLink;
