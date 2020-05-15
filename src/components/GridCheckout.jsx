import React, { Component } from 'react';

export class GridCheckout extends Component {
  render() {
    const { products } = this.props;
    if (products.length === 0) return <h1>Nenhum Produto foi encontrado</h1>;
    return (
      <div>
        {products.map((product) => (
          <div data-testid="product" key={product.id}>
            <h4>{product.title}</h4>
            <h5>{product.id}</h5>
            <img src={product.thumbnail} alt={product.title} />
            <h5>
              {`Preço: R$ ${product.price.toFixed(2)}`}
            </h5>
          </div>
        ))}
      </div>
    );
  }
}

export default GridCheckout;
