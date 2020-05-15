import React from 'react';
import { CardCarrinho } from '../components/CardCarrinho';
import { CheckoutCartButton } from '../components/CheckoutCartButton';
import MensagemCarrinho from '../components/MensagemCarrinho';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShouldRedirect: false,
      redirectToPath: '',
      cartProducts: [],
    };
    this.redirectPath = this.redirectPath.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  componentDidMount() {
    this.mountCart();
  }

  mountCart() {
    const { location } = this.props;
    const { state } = location;
    const { selectedItems } = state;
    this.setState({ cartProducts: [...selectedItems] });
  }

  redirectPath(url) {
    this.setState({
      isShouldRedirect: true,
      redirectToPath: url,
    });
  }

  updateQuantity(event) {
    this.props;
  }

  returnButton() {
    return (
      <div>
        <button
          label="return"
          type="button"
          onClick={() => this.redirectPath('/')}
        >
          Retornar
        </button>
      </div>
    );
  }

  render() {
    const { history } = this.props;
    const { cartProducts, isShouldRedirect, redirectToPath } = this.state;
    if (isShouldRedirect) history.push(redirectToPath);
    if (cartProducts && cartProducts.length !== 0) {
      return (
        <div>
          {this.returnButton()}
          <div>
            <h2>Carrinho de compras: </h2>
            {cartProducts.map((product) => (
              <CardCarrinho key={product.id} product={product} />
            ))}
          </div>
          <CheckoutCartButton products={cartProducts} />
        </div>
      );
    }
    return (
      <div>
        {this.returnButton()}
        <MensagemCarrinho />
      </div>
    );
  }
}

export default Cart;
