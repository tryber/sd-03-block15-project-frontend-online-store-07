import React, { Component } from 'react';

export class CardCarrinho extends Component {
  constructor(props) {
    super(props);

    const { product } = this.props;
    const { quantity } = product;

    this.state = { quantity };

    this.quantityButton = this.quantityButton.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  updateQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  handleQuantity(sum, max) {
    this.setState((currentState) => {
      const updatedQuantity = sum
        ? currentState.quantity + 1
        : currentState.quantity - 1;
      if (updatedQuantity >= 0 && updatedQuantity <= max) {
        return { quantity: updatedQuantity };
      }
      return { quantity: 0 };
    });
  }

  quantityButton() {
    const { product } = this.props;
    const { availableQuantity } = product;
    const { quantity } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={() => this.handleQuantity(true, availableQuantity)}
          disabled={quantity === availableQuantity}
        >
          +
        </button>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={() => this.handleQuantity(false, availableQuantity)}
          disabled={quantity === 0}
        >
          -
        </button>
      </div>
    );
  }

  render() {
    const { quantity } = this.state;
    const { product } = this.props;
    const { title, thumbnail, price, id, availableQuantity } = product;
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
