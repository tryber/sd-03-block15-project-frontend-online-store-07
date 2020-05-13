import React, { Component } from 'react';

export class CardProduto extends Component {
  render() {
    const { product } = this.props;
    const { id, title, thumbnail, price, onAddToCart } = product;
    return (
      <div data-testid="product">
        <h4>{title}</h4>
        <h5>{id}</h5>
        <img src={thumbnail} alt={title} />
        <h5>{price}</h5>
        <button
          type="button"
          onClick={onAddToCart}
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

export default CardProduto;
