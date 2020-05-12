import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CarLink extends Component {
  render() {
    return (
      <Link data-testid="shopping-cart-button" to="/cart">
        <i className="fas fa-shopping-cart" />
      </Link>
    );
  }
}

export default CarLink;
