import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class BarraEsquerda extends Component {
  render() {
    const { categorias } = this.props;
    return (
      <div>
        {categorias.map((categoria) => (
          <li key={categoria.id} data-testid="category">
            <Button color="primary">{categoria.name}</Button>
          </li>
        ))}
      </div>
    );
  }
}
export default BarraEsquerda;
