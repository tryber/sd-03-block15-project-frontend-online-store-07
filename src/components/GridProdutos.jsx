import React, { Component } from 'react';
import Card from './CardProduto';
import { BotaoAdicionar } from './BotaoAdicionar';
export class GridProdutos extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        {products.map((product) => (
          <Card key={product.id} product={product}>
            <BotaoAdicionar product={this.props} />
          </Card>
        ))}
      </div>
    );
  }
}

export default GridProdutos;
