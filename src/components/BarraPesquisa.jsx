import React from 'react';
import * as api from '../services/api';

class SearchBar extends React.Component {

  componentDidMount() {
    api.getProductsFromCategoryAndQuery('', 'computador').then((res) => console.log(res));
  }

  render() {
    return (
      <div>
        <input data-testid="query-input" type="text" placeholder="Digite algum termo de pesquisa ou escolha uma categoria." />
        <button data-testid="query-button" onClick={ this.handleSearch() }>Pesquisar</button>
      </div>
    );
  }
}

export default SearchBar;
