import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';
import { GridCheckout } from '../components/GridCheckout';
import CheckoutForm from '../components/CheckoutForm';

class Checkout extends Component {
  render() {
    const { products } = this.props.location.state;
    console.log(products);
    return (
      <div style={{ flexGrow: 1 }}>
        <Container>
          <Grid item xs={12}>
            <h1>Finalizar Compra</h1>
          </Grid>
          <Grid item xs={12}>
            <GridCheckout products={products} />
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
