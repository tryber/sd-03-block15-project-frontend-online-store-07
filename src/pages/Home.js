import React from 'react';
import { Grid, Container } from '@material-ui/core';
import BarraEsquerda from '../components/BarraEsquerda';
import { CarLink } from '../components/CarLink';
import { GridProdutos } from '../components/GridProdutos';
import BarraPesquisa from '../components/BarraPesquisa';
import MessagemInicial from '../components/MessagemInicial';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      apiResults: [],
      categories: [],
      selectedCategory: '',
      query: '',
      callAPI: false,
    };
    this.callApi = this.callApi.bind(this);
  }

  componentDidMount() {
    return api
      .getCategories()
      .then((data) => this.setState({ categories: data }));
  }

  componentDidUpdate() {
    const { callAPI, selectedCategory, query } = this.state;
    if (callAPI) {
      api.getProductsFromCategoryAndQuery(selectedCategory, query)
        .then((data) => this.setState({
          apiResults: data.results,
          callAPI: false,
        }));
    }
  }

  callApi(query) {
    this.setState({ callAPI: true, query });
  }

  render() {
    const { categories, apiResults, selectedCategory } = this.state;
    return (
      <div style={{ flexGrow: 1 }}>
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <BarraEsquerda
                categorias={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={(e) => this.setState({
                  selectedCategory: e.target.value,
                  callAPI: true
                })}
              />
            </Grid>
            <Grid item xs={6}>
              <BarraPesquisa onClick={this.callApi} />
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
