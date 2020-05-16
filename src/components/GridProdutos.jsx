import React, { Component } from 'react';
import { CardProduto } from './CardProduto';

export class GridProdutos extends Component {
  render() {
    const { products, addToCart } = this.props;
    if (!products) return <h1>Nenhum Produto foi encontrado</h1>;
    return (
      <div>
        {products.map((product) => (
          <CardProduto key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    );
  }
}

export default GridProdutos;
