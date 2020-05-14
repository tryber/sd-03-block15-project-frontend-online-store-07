import React, { Component } from 'react';

class BarraEsquerda extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategory: '' };
  }

  render() {
    const { categorias, onCategoryChange, selectedCategory } = this.props;
    return (
      <div>
        {categorias.map((categoria) => (
          <li key={categoria.id} data-testid="category">
            <input
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
