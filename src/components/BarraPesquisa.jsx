import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';

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
        <TextField
          data-testid="query-input"
          placeholder="O que deseja pesquisar?"
          id="search-input"
          type="text"
          value={query}
          onChange={this.handleSearchInput}
        />
        <Button
          color="secondary"
          data-testid="query-button"
          type="button"
          onClick={this.handleSearchSubmit}
        >
          Pesquisar
        </Button>
      </div>
    );
  }
}
export default BarraPesquisa;
