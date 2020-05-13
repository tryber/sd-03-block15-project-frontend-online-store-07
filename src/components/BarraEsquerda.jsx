import React, { Component } from 'react';

class BarraEsquerda extends Component {
  render() {
    const { categorias } = this.props;
    return (
      <div>
        {categorias.map((categoria) => (
          <li key={categoria.id} data-testid="category">
            {categoria.name}
          </li>
        ))}
      </div>
    );
  }
}
export default BarraEsquerda;
