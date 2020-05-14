import React from 'react';
import BarraEsquerda from '../components/BarraEsquerda';
import { CarLink } from '../components/CarLink';
import { GridProdutos } from '../components/GridProdutos';
import MessagemInicial from '../components/MessagemInicial';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      apiResults: [],
      categories: [],
      cartItemsQuantity: 0,
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.searchBar = this.searchBar.bind(this);
  }

  componentDidMount() {
    return api
      .getCategories()
      .then((data) => this.setState({ categories: data }));
  }

  handleSearchInput(e) {
    this.setState({ query: e.target.value });
  }

  handleSearchSubmit() {
    const { query } = this.state;
    api
      .getProductsFromCategoryAndQuery('', query)
      .then((data) => this.setState({ apiResults: data.results }));
  }

  addToCart(product) {
    const { id, title, price, thumbnail } = product;
    const quantity = 1;
    const cartStorage = JSON.parse(localStorage.getItem('products') || '[]');
    const itemFilter = cartStorage.find((item) => item.id === id);
    if (itemFilter) {
      itemFilter.quantity += 1;
      const filteredCartStorage = cartStorage.filter((item) => item.id !== id);
      filteredCartStorage.push(itemFilter);
      localStorage.setItem('products', JSON.stringify(cartStorage));
    } else {
      cartStorage.push({
        id,
        title,
        price: parseFloat(price),
        thumbnail,
        quantity,
      });
      localStorage.setItem('products', JSON.stringify(cartStorage));
    }
    this.setState({
      cartItemsQuantity: cartStorage.reduce(
        (acum, curr) => parseInt(acum, 10) + parseInt(curr.quantity, 10),
        0,
      ),
    });
    console.log(localStorage.products);
  }

  searchBar() {
    const { query } = this.state;
    return (
      <div>
        <input
          data-testid="query-input"
          placeholder="Insira o caminho da imagem"
          id="search-input"
          type="text"
          value={query}
          onChange={this.handleSearchInput}
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={this.handleSearchSubmit}
        >
          Pesquisar
        </button>
      </div>
    );
  }

  render() {
    const { categories, apiResults, cartItemsQuantity } = this.state;
    return (
      <div>
        <div>
          <BarraEsquerda categorias={categories} />
        </div>
        {this.searchBar()}
        <div>
          <CarLink />
          <span>{cartItemsQuantity}</span>
        </div>
        <div>
          {apiResults.length === 0 ? (
            <MessagemInicial />
          ) : (
            <GridProdutos products={apiResults} onClick={this.addToCart} />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
