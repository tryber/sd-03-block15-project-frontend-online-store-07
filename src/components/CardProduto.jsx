import React, { Component } from 'react';

export class CardProduto extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = {
      product: this.props.product,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick } = this.props;
    onClick(this.state.product);
  }

  render() {
    const { product } = this.state;
=======

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    const { product } = this.props;
    const cartItems = parseInt(localStorage.getItem('cartItems'), 10) || 0;
    if (!localStorage.products || localStorage.getItem('products') === 'null') {
      localStorage.setItem('cartItems', cartItems + 1);
      localStorage.setItem('products', JSON.stringify([product]));
    }
    const products = JSON.parse(localStorage.getItem('products'));
    if (localStorage.products.includes(product.id)) {
      const index = products.findIndex((item) => item.id === product.id);
      products[index].quantity += 1;
      localStorage.setItem('cartItems', cartItems + 1);
      localStorage.setItem('products', JSON.stringify(products));
    }
    localStorage.setItem('cartItems', cartItems + 1);
    localStorage.setItem('products', JSON.stringify([...products, product]));
    console.log(localStorage.products);
  }

  render() {
    const { product } = this.props;
>>>>>>> eb674d90ee74e08a57dade137dcbfef860cda37c
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
        <button
          type="button"
<<<<<<< HEAD
          onClick={this.handleClick}
=======
          onClick={this.addToCart}
>>>>>>> eb674d90ee74e08a57dade137dcbfef860cda37c
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

export default CardProduto;
