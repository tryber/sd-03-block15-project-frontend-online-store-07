import React, { Component } from 'react';

class BarraPesquisa extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  handleSearchInput(e) {
    this.setState({ query: e.target.value });
  }

  handleSearchSubmit() {
    const { onClick } = this.props;
    const { query } = this.state;
    onClick(query);
  }

  render() {
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
}
export default BarraPesquisa;
