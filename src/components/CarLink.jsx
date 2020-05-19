import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export class CarLink extends Component {
  render() {
    const { size } = this.props;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/cart">
          <ShoppingCartIcon color="action"/>
        </Link>
        <span data-testid="shopping-cart-size">{size}</span>
      </div>
    );
  }
}

export default CarLink;
