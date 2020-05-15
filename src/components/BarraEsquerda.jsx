import React, { Component } from 'react';

class BarraEsquerda extends Component {
  render() {
    const { categorias, onCategoryChange, selectedCategory } = this.props;
    return (
      <div>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <input
              data-testid="category"
              type="radio"
              id={categoria.id}
              value={categoria.id}
              name="categories"
              checked={selectedCategory === categoria.id}
              onChange={onCategoryChange}
            />
            <label htmlFor={categoria.id}>{categoria.name}</label>
          </li>
        ))}
      </div>
    );
  }
}
export default BarraEsquerda;
