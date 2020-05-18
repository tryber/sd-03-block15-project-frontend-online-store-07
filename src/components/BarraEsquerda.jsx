import React, { Component } from 'react';
import { InputLabel, NativeSelect } from '@material-ui/core';

class BarraEsquerda extends Component {
  render() {
    const { categorias, onCategoryChange, selectedCategory } = this.props;
    return (
      <div>
        <InputLabel htmlFor="categories">Selecione a categoria</InputLabel>
        <NativeSelect
          data-testid="category"
          id="categories"
          name="categories"
          checked={selectedCategory}
          onChange={onCategoryChange}
        >
        <option key="0" value=""></option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
        ))}
        </NativeSelect>
      </div>
    );
  }
}
export default BarraEsquerda;
