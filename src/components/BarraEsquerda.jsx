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
              id={categoria.id}
              value={categoria.id}
              name="categories"
              type="radio"
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
