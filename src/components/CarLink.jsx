import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CarLink extends Component {
  render() {
    const { params, size } = this.props;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/cart">
          <i className="fas fa-shopping-cart" />
        </Link>
        <span data-testid="shopping-cart-size">{size}</span>
      </div>
    );
  }
}

export default CarLink;
