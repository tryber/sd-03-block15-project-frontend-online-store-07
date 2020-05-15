import React, { Component } from 'react';

export class CardCarrinho extends Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price, id, quantity } = product;
    return (
      <div>
        <p>{id}</p>
        <div>
          <img src={thumbnail} alt={title} />
        </div>
        <div data-testid="shopping-products-product-name">{title}</div>
        <div data-testid="shopping-products-product-quantity">{quantity}</div>
        <br />
        <div>
          R$
          {price}
        </div>
      </div>
    );
  }
}

export default CardCarrinho;
