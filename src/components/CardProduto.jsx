import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CardProduto extends Component {
  render() {
    const { product } = this.props;
    const { id, title, thumbnail, price, onAddToCart } = product;
    return (
      <div data-testid="product">
        <h4>{title}</h4>
        <h5>{id}</h5>
        <img src={thumbnail} alt={title} />
        <h5>{price}</h5>
        <button
          type="button"
          onClick={onAddToCart}
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
        <Link to={ { pathname: `/details/${id}`, state: { product } } }>Detalhes</Link>
      </div>
    );
  }
}

export default CardProduto;
