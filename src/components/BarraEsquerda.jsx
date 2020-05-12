import React, { Component } from 'react';

class BarraEsquerda extends Component {
  render() {
    const { categorias } = this.props;
    return (
      <div data-testid="category">
        {categorias.map((categoria) => (
          <li key={categoria.id}>{categoria.name}</li>
        ))}
      </div>
    );
  }
}
export default BarraEsquerda;
