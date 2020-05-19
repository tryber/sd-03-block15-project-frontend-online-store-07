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

  componentDidUpdate() {
    // const { id } = this.props;
    const carrinhoLS = JSON.parse(localStorage.getItem('cartProducts'));
    const indItem = carrinhoLS.findIndex(item => item.id === this.props.product.id);
    carrinhoLS[indItem].quantity = this.state.quantity;
    localStorage.setItem('cartProducts', JSON.stringify(carrinhoLS));
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
          data-testid="product-decrease-quantity"
          onClick={() => this.handleQuantity(false, availableQuantity)}
          disabled={quantity < 1}
        >
          -
        </button>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={() => this.handleQuantity(true, availableQuantity)}
          disabled={quantity === availableQuantity}
        >
          +
        </button>
      </div>
    );
  }

  render() {
    const { quantity } = this.state;
    const { product } = this.props;
    const { title, price, thumbnail, id, availableQuantity } = product;
    return (
      <div key={id}>
        <div data-testid="shopping-cart-product-name">{title}</div>
        <div>
          <img src={thumbnail} width="25px" alt={title} />
        </div>
        <div>
          R$ {price}
        </div>
        <div>
          Quantidade disponível: {availableQuantity}
        </div>
        {this.quantityButton()}
        <div data-testid="shopping-cart-product-quantity">No carrinho: {quantity}</div>
      </div>
    );
  }
}

export default CardCarrinho;
