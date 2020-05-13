import React, { Component } from 'react';

export class CardProduto extends Component {
  render() {
    const { product, children } = this.props;
    const {
      id,
      title,
      thumbnail,
      price,
      available_quantity: availableQuantity,
      shipping: { free_shipping: freeShipping },
    } = product;
    return (
      <div data-testid="product">
        <h4>{title}</h4>
        <h5>{id}</h5>
        <img src={thumbnail} alt={title} />
        <h5>
          Preço: R$
          {price.toFixed(2)}
        </h5>
        <h5>
          Quantidade disponível:
          {availableQuantity}
        </h5>
        {freeShipping === true ? <h6>FRETE GRÁTIS</h6> : <h6>FRETE PAGO</h6>}
        <div>{children}</div>
      </div>
    );
  }
}

export default CardProduto;
