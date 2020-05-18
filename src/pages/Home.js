import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { CarLink } from '../components/CarLink';
import BarraEsquerda from '../components/BarraEsquerda';
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
      selectedItems: [],
      cartSize: 0,
      selectedCategory: '',
      query: '',
      callAPI: false,
    };
    this.addToCart = this.addToCart.bind(this);
    this.callApi = this.callApi.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.cartCounter = this.cartCounter.bind(this);
  }

  componentDidMount() {
    this.loadSelectedItems();
    this.cartCounter();
    return api
      .getCategories()
      .then((data) => this.setState({ categories: data }))
      .catch(() => console.log('Erro de Requisição'));
  }

  componentDidUpdate() {
    const { callAPI, selectedCategory, query } = this.state;
    if (callAPI) {
      api
        .getProductsFromCategoryAndQuery(selectedCategory, query)
        .then((data) => this.setState({
          apiResults: data.results,
          callAPI: false,
        }));
    }
    this.updateSelectItems();
  }

  callApi(query) {
    this.setState({ callAPI: true, query });
  }

  categoryChange(value) {
    this.setState({
      selectedCategory: value,
      callAPI: true,
    });
  }

  updateSelectItems() {
    const { selectedItems } = this.state;
    localStorage.setItem('cartProducts', JSON.stringify(selectedItems));
  }

  loadSelectedItems() {
    const storedSelectedItems = JSON.parse(
      localStorage.getItem('cartProducts'),
    );
    if (storedSelectedItems !== null) {
      this.setState({ selectedItems: storedSelectedItems });
    }
  }

  addToCart(title, price, id, thumbnail, availableQuantity) {
    const { selectedItems, cartSize } = this.state;
    const itemIndex = selectedItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const updatedCart = selectedItems;
      updatedCart[itemIndex].quantity += 1;
      this.setState({ selectedItems: updatedCart });
      this.setState(() => ({ cartSize: cartSize + 1 }));
    } else {
      this.setState({
        selectedItems: [
          ...selectedItems,
          { title, id, price, thumbnail, availableQuantity, quantity: 1 },
        ],
      });
      this.setState(() => ({ cartSize: cartSize + 1 }));
    }
  }

  cartCounter() {
    const storedSelectedItems = JSON.parse(
      localStorage.getItem('cartProducts'),
    );
    if (storedSelectedItems) {
      this.setState({
        cartSize: storedSelectedItems.reduce(
          (acc, item) => acc + parseInt(item.quantity, 10),
          0,
        ),
      });
    }
  }

  render() {
    const { categories, apiResults, selectedCategory, cartSize } = this.state;
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
                  <GridProdutos products={apiResults} addToCart={this.addToCart} />
                )}
              </div>
            </Grid>
            <Grid item xs={2}>
              <CarLink size={cartSize} />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Home;
