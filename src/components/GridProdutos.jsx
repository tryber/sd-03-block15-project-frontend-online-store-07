import React, { Component } from 'react';
import Card from './CardProduto';

export class GridProdutos extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default GridProdutos;
