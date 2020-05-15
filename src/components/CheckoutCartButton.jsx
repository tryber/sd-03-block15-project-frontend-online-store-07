import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CheckoutCartButton extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        <Link to={{ pathname: '/checkout', state: { products } }}>
          <button data-testid="checkout-products" type="button">Finalizar compra</button>
        </Link>
      </div>
    );
  }
}

export default CheckoutCartButton;
