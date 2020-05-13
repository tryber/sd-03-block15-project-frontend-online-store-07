import React, { Component } from 'react';

export class CardProduto extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    console.log(localStorage.products);
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
  }

  render() {
    const { product } = this.props;
    const {
      id,
      title,
      thumbnail,
      price,
      available_quantity,
      shipping: { free_shipping },
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
          {available_quantity}
        </h5>
        {free_shipping === true ? <h6>FRETE GRÁTIS</h6> : <h6>FRETE PAGO</h6>}
        <button
          type="button"
          onClick={this.addToCart}
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

export default CardProduto;
