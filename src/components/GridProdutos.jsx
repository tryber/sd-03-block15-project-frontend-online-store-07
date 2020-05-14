import React, { Component } from 'react';
import Card from './CardProduto';
import { BotaoAdicionar } from './BotaoAdicionar';

export class GridProdutos extends Component {
  render() {
    const { products, onClick } = this.props;
    return (
      <div>
        {products.map((product) => (
          <Card key={product.id} product={product} onClick={onClick} />
        ))}
      </div>
    );
  }
}

export default GridProdutos;
