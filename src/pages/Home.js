import React from 'react';
import CarLink from '../components/CarLink';
import GridProdutos from '../components/GridProdutos';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      apiResults: [],
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
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

  render() {
    const { query, apiResults } = this.state;
    console.log(query);
    return (
      <div>
        <div>Barra esquerda</div>
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
        <div>
          <CarLink />
        </div>
        <div>
          <GridProdutos products={apiResults}/>
        </div>
      </div>
    );
  }
}

export default Home;
