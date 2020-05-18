import React, { Component } from 'react';

export class BotaoAdicionarCarrinho extends Component {
  render() {
    const { product, addToCart } = this.props;
    const {
      title,
      price,
      id,
      thumbnail,
      available_quantity: availableQuantity,
    } = product;
    return (
      <button
        data-testid="product-add-to-cart"
        className="btn btn-link"
        type="button"
        onClick={() => addToCart(title, price, id, thumbnail, availableQuantity)}
      >
        Adicionar ao Carrinho
      </button>
    );
  }
}

export default BotaoAdicionarCarrinho;
