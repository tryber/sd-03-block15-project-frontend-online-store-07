import React from 'react';
import BarraEsquerda from '../components/BarraEsquerda';
import { CarLink } from '../components/CarLink';
import { GridProdutos } from '../components/GridProdutos';
import BarraPesquisa from '../components/BarraPesquisa';
import MessagemInicial from '../components/MessagemInicial';
import * as api from '../services/api';
import { Grid, Container } from '@material-ui/core';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      apiResults: [],
      categories: [],
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    return api
      .getCategories()
      .then((data) => this.setState({ categories: data }));
  }

  handleSearchSubmit(category = '', query) {
    api
      .getProductsFromCategoryAndQuery(category, query)
      .then((data) => this.setState({ apiResults: data.results }));
  }

  render() {
    const { categories, apiResults } = this.state;
    return (
      <div style={{ flexGrow: 1 }}>
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <BarraEsquerda categorias={categories} />
            </Grid>
            <Grid item xs={6}>
              <BarraPesquisa onClick={this.handleSearchSubmit} />
              <div>
                {apiResults.length === 0 ? (
                  <MessagemInicial />
                ) : (
                  <GridProdutos products={apiResults} />
                )}
              </div>
            </Grid>
            <Grid item xs={2}>
              <CarLink />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Home;
