import React, { Component } from 'react';

export class CardCarrinho extends Component {
  constructor(props) {
    super(props);

    this.quantityButton = this.quantityButton.bind(this);
  }

  quantityButton() {
    const { stock, quantity, onChange, eventHandler, event } = this.props;
    return (
      <div>
        <label htmlFor="quantity">
          Quantidade
          <input
            type="number"
            id="quantity"
            min="0"
            max={stock}
            value={quantity}
            onChange={onChange}
          />
        </label>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={() => eventHandler(event)}
        >
          -
        </button>
        <button
          type="button"
          data-testid="product-decreate-quantity"
          onClick={() => this.eventHandler(event)}
        >
          +
        </button>
      </div>
    );
  }

  render() {
    const { product } = this.props;
    const {
      title,
      thumbnail,
      price,
      id,
      quantity,
      availableQuantity,
    } = product;
    return (
      <div>
        <p>{id}</p>
        <div>
          <img src={thumbnail} alt={title} />
        </div>
        <div data-testid="shopping-cart-product-name">{title}</div>
        <div data-testid="shopping-cart-product-quantity">{quantity}</div>
        <div>
          Quantidade disponível:
          {availableQuantity}
        </div>
        <div>
          R$
          {price}
        </div>
        {this.quantityButton()}
      </div>
    );
  }
}

export default CardCarrinho;
