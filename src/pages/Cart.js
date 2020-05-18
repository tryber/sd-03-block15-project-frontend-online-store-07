import React from 'react';
import { BotaoRetorno } from '../components/BotaoRetorno';
import { CardCarrinho } from '../components/CardCarrinho';
import { CheckoutCartButton } from '../components/CheckoutCartButton';
import MensagemCarrinho from '../components/MensagemCarrinho';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { cartProducts: [] };

    this.clearCart = this.clearCart.bind(this);
  }

  componentDidMount() {
    this.mountCart();
  }

  mountCart() {
    const storedSelectedItems = JSON.parse(
      localStorage.getItem('cartProducts'),
    );
    this.setState({ cartProducts: storedSelectedItems });
  }

  clearCart() {
    localStorage.removeItem('cartProducts');
    this.setState({ cartProducts: [] });
  }

  clearButton() {
    return (
      <div>
        <button type="button" onClick={this.clearCart}>
          Limpar Carrinho
        </button>
      </div>
    );
  }

  render() {
    const { cartProducts } = this.state;
    if (cartProducts && cartProducts.length !== 0) {
      return (
        <div>
          <BotaoRetorno />
          <div>
            <h2>Carrinho de compras: </h2>
            {cartProducts.map((product) => (
              <CardCarrinho key={product.id} product={product} />
            ))}
          </div>
          <CheckoutCartButton products={cartProducts} />
          {this.clearButton()}
        </div>
      );
    }
    return (
      <div>
        <BotaoRetorno />
        <MensagemCarrinho />
      </div>
    );
  }
}

export default Cart;
