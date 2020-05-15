import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';
import { GridProdutos } from '../components/GridProdutos';
import CheckoutForm from '../components/CheckoutForm';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      falseProducts: [{
        id: 'MLB1370656442',
        title: 'Motorola G7 Play 32 Gb Dourado 2 Gb Ram',
        price: 849,
        thumbnail: 'http://mlb-s1-p.mlstatic.com/964021-MLA31350197875_072019-I.jpg',
      }],
    };
  }

  render() {
    const { falseProducts } = this.state;
    console.log(falseProducts);
    return (
      <div style={{ flexGrow: 1 }}>
        <Container>
          <Grid item xs={12}>
            <h1>Finalizar Compra</h1>
          </Grid>
          <Grid item xs={12}>
            <GridProdutos products={falseProducts} />
          </Grid>
          <Grid item xs={12}>
            <CheckoutForm />
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Checkout;
