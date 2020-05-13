import React, { Component } from 'react';

export class BotaoAdicionar extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    console.log(localStorage.products);
    const { product } = this.props;
    const cartItemsTotal = parseInt(localStorage.getItem('cartItemsTotal'), 10) || 0;
    if (!localStorage.products || localStorage.getItem('products') === 'null') {
      localStorage.setItem('cartItemsTotal', cartItemsTotal + 1);
      localStorage.setItem('products', JSON.stringify([product]));
    }
    const products = JSON.parse(localStorage.getItem('products'));
    if (localStorage.products.includes(product.id)) {
      const index = products.findIndex((item) => item.id === product.id);
      products[index].quantity += 1;
      localStorage.setItem('cartItemsTotal', cartItemsTotal + 1);
      localStorage.setItem('products', JSON.stringify(products));
    }
    localStorage.setItem('cartItemsTotal', cartItemsTotal + 1);
    localStorage.setItem('products', JSON.stringify([...products, product]));
  }

  render() {
    return (
      <div>
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

export default BotaoAdicionar;
