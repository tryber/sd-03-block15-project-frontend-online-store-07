import React, { Component } from 'react';

export class GridCheckout extends Component {
  render() {
    const { products } = this.props;
    if (products.length === 0) return <h1>Nenhum Produto foi encontrado</h1>;
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center' }}>
        <h1>Confirme seus itens!</h1>
        {products.map((product) => (
          <div data-testid="product" key={product.id} style={{ textAlign: 'center' }}>
            <h2>{product.title}</h2>
            <h5>{product.id}</h5>
            <img src={product.thumbnail} alt={product.title} />
            <h2>
              {`R$ ${product.price.toFixed(2)}`}
            </h2>
          </div>
        ))}
      </div>
    );
  }
}

export default GridCheckout;
