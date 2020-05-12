import React, { Component } from 'react';

export class CardProduto extends Component {
  render() {
    const { product } = this.props;
    const { id, title, thumbnail, price, onAddToCart } = product;
    return (
      <div>
        <h4 data-testid="product">{title}</h4>
        <h5 data-testid="product">{id}</h5>
        <img data-testid="product" src={thumbnail} alt={title} />
        <h5 data-testid="product">{price}</h5>
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
