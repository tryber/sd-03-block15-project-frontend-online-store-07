import React, { Component } from 'react';
import GridProdutos from '../components/GridProdutos';
import MensagemCarrinho from '../components/MensagemCarrinho';

export class Cart extends Component {
  constructor(props) {
    super(props);

    const cartProducts = JSON.parse(localStorage.getItem('products'));

    this.state = { selectedProducts: cartProducts };

    this.removeFromCart = this.removeFromCart.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  changeQuantity(value, id) {
    const { selectedProducts } = this.state;
    parseInt(id, 10);
    const productIndex = selectedProducts.findIndex((element) => element.id === id);
    if (value === 'up') selectedProducts[productIndex].quantity += 1;
    else if (selectedProducts[productIndex].quantity > 1) {
      selectedProducts[productIndex].quantity -= 1;
    }
    this.setState({ selectedProducts });
  }

  createQtdButton(quantity, id) {
    return (
      <div>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={() => this.changeQuantity('up', id)}
        >
          <i className="fas fa-plus-square" />
        </button>
        <input type="input" className="input_qtd" value={quantity} />
        <button
          data-testid="product-decreate-quantity"
          type="button"
          onClick={() => this.changeQuantity('down', id)}
        >
          <i className="fas fa-minus-square" />
        </button>
      </div>
    );
  }

  removeFromCart(event) {
    const { selectedProducts } = this.state;
    const { id } = event.target;
    const items = selectedProducts.map((product) => product.id).indexOf(id);
    selectedProducts.splice(items, 1);
    this.setState({ selectedProducts });
  }

  createRemoveButton(id) {
    return (
      <div>
        <button type="button" id={id} onClick={this.removeFromCart}>
          <i className="fas fa-trash-alt">REMOVER TUDO</i>
        </button>
      </div>
    );
  }

  createCardProducts(title, thumbnail, price, id, quantity) {
    return (
      <div key={id}>
        <div>{this.createRemoveButton(id)}</div>
        <div>
          <img src={thumbnail} alt={title} />
        </div>
        <div>{title}</div>
        <div>{this.createQtdButton(quantity, id)}</div>
        <div>{price}</div>
      </div>
    );
  }

  cartTotal() {
    const { selectedProducts } = this.state;
    const cartTotal = selectedProducts.reduce((accumulator, currentValue) => {
      const { price, quantity } = currentValue;
      const totalValue = parseFloat(accumulator + price * quantity);
      return totalValue;
    });
    localStorage.setItem('cartTotal', cartTotal);
    return (
      <div>
        <p>
          Total da Compra:
          {cartTotal}
        </p>
      </div>
    );
  }

  render() {
    const { selectedProducts } = this.state;
    console.log(selectedProducts);
    if (selectedProducts && selectedProducts.length !== 0) {
      return (
        <div>
          <div>
            {selectedProducts.map(
              ({ title, thumbnail, price, id, quantity }) => {
                return this.createCardProducts(
                  title,
                  thumbnail,
                  price,
                  id,
                  quantity,
                );
              },
            )}
          </div>
          {this.cartTotal()}
        </div>
      );
    }
    return <MensagemCarrinho />;
  }
}

export default Cart;
