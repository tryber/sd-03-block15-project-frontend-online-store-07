import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CardProduto extends Component {
  constructor(props) {
    super(props);

    this.addToCartButton = this.addToCartButton.bind(this);
  }

  addToCartButton() {
    const { product, addToCart } = this.props;
    const {
      title,
      price,
      id,
      thumbnail,
      available_quantity: availableQuantity,
    } = product;
    return (
      <button
        data-testid="product-add-to-cart"
        className="btn btn-link"
        value="Adicionar ao Carrinho"
        type="button"
        onClick={() => addToCart(title, price, id, thumbnail, availableQuantity)}
      >
        Adicionar ao Carrinho
      </button>
    );
  }

  render() {
    const { product } = this.props;
    const {
      id,
      title,
      thumbnail,
      price,
      available_quantity: availableQuantity,
      shipping: { free_shipping: freeShipping },
    } = product;
    return (
      <div data-testid="product">
        <h4>{title}</h4>
        <h5>{id}</h5>
        <img src={thumbnail} alt={title} />
        <h5>
          Preço: R$
          {price.toFixed(2)}
        </h5>
        <h5>
          Quantidade disponível:
          {availableQuantity}
        </h5>
        {freeShipping === true ? (
          <h6 data-testid="free-shipping">FRETE GRÁTIS</h6>
        ) : (
          <h6>FRETE PAGO</h6>
        )}
        {this.addToCartButton()}
        <Link to={{ pathname: `/details/${id}`, state: { product } }}>
          Detalhes
        </Link>
      </div>
    );
  }
}

export default CardProduto;
