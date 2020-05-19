import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { CardProduto } from './CardProduto';

export class GridProdutos extends Component {
  render() {
    const { products, addToCart } = this.props;
    if (products.length === 0) return <h1>Nenhum Produto foi encontrado</h1>;
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        alignContent="space-around"
      >
        {products.map((product) => (
          <Grid item xs={6}>
            <CardProduto
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default GridProdutos;
