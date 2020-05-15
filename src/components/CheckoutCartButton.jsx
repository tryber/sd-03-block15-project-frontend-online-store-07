import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CheckoutCartButton extends Component {
  render() {
    return (
      <div>
        <Link to="/checkout">
          <button type="button">Finalizar compra</button>
        </Link>
      </div>
    );
  }
}

export default CheckoutCartButton;
