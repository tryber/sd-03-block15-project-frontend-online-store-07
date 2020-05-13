import React, { Component } from 'react';
import { GridProdutos } from '../components/GridProdutos';
import CheckoutForm from '../components/CheckoutForm';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      falseProduct: [{
        id: 'MLB1370656442',
        title: 'Motorola G7 Play 32 Gb Dourado 2 Gb Ram',
        price: 849,
        thumbnail: 'http://mlb-s1-p.mlstatic.com/964021-MLA31350197875_072019-I.jpg',
      }],
      comprador: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(comprador) {
    await this.setState({ comprador });
    console.log(comprador);
  }

  render() {
    const { falseProduct } = this.state;
    console.log(falseProduct);
    return (
      <div>
        <h1>Finalizar Compra</h1>
        <div>
          <GridProdutos products={falseProduct} />
        </div>
        <div>
          <CheckoutForm onClick={this.handleSubmit} />
        </div>
        <div>
          Informações do comprador:
        </div>
      </div>
    );
  }
}

export default Checkout;
