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
