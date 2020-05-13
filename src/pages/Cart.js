import React, { Component } from 'react';
import { GridProdutos } from '../components/GridProdutos';
import MensagemCarrinho from '../components/MensagemCarrinho';

export class Cart extends Component {
  constructor(props) {
    super(props);

    const cartProducts = JSON.parse(localStorage.getItem('products'));

    this.state = {
      selectedProducts: cartProducts,
    };
  }

  render() {
    return (
      <div>
        <MensagemCarrinho />
        <div>
          <GridProdutos products={this.state.selectedProducts} />
        </div>
      </div>
    );
  }
}

export default Cart;
