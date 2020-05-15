import React from 'react';
<<<<<<< HEAD
import { Grid, Container } from '@material-ui/core';
=======
>>>>>>> parent of ce61d63... carrinho de compras funcional
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
<<<<<<< HEAD
    this.callApi = this.callApi.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
=======
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
>>>>>>> parent of ce61d63... carrinho de compras funcional
  }

  componentDidMount() {
    return api.getCategories()
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

<<<<<<< HEAD
  callApi(query) {
    this.setState({ callAPI: true, query });
  }

  categoryChange(value) {
    this.setState({
      selectedCategory: value,
      callAPI: true,
    });
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
                onCategoryChange={(e) => this.categoryChange(e.target.value)}
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
=======
  addToCart(title, price, id, thumbnail, availableQuantity) {
    const { selectedItems } = this.state;
    const itemIndex = selectedItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const updatedCart = selectedItems;
      updatedCart[itemIndex].quantity += 1;
      this.setState({ selectedItems: updatedCart });
      // localStorage.setItem('cart_products', JSON.stringify(updatedCart));
      // console.log(localStorage);
    } else {
      this.setState({
        selectedItems: [
          ...selectedItems,
          { title, id, price, thumbnail, availableQuantity, quantity: 1 },
        ],
      });
      // localStorage.setItem('cart_products', JSON.stringify(selectedItems));
      // console.log(localStorage);
    }
  }

  render() {
    const { categories, apiResults, selectedItemsQuantity } = this.state;
    return (
      <div>
        <div>
          <BarraEsquerda categorias={categories} />
        </div>
        <div>
          <BarraPesquisa onClick={this.handleSearchSubmit} />
        </div>
        <div>
          <CarLink />
          <span>{selectedItemsQuantity}</span>
        </div>
        <div>
          {apiResults.length === 0 ? (
            <MessagemInicial />
          ) : (
            <GridProdutos products={apiResults} addToCart={this.addToCart} />
          )}
        </div>
>>>>>>> parent of ce61d63... carrinho de compras funcional
      </div>
    );
  }
}

export default Home;
