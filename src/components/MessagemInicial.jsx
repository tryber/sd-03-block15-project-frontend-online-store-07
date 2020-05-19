import React, { Component } from 'react';

class MessagemInicial extends Component {
  render() {
    const { loading } = this.props;
    return !loading ? (
      <h3 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h3>
    ) : (
      <p>Carregando resultados...</p>
    );
  }
}

export default MessagemInicial;
