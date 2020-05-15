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
  }

  componentDidMount() {
    const products = JSON.parse(localStorage.getItem('cart_products'));
    if (products !== null) {
      this.setState({ cartProducts: products });
    }
  }

  componentDidUpdate() {
    const { cartProducts } = this.state;
    localStorage.setItem('cart_products', JSON.stringify(cartProducts));
    if (cartProducts) {
      const totalCartItems = cartProducts.reduce((acc, cur) => {
        const quantity = parseInt(cur.quantity, 10);
        return acc + quantity;
      }, 0);
      localStorage.setItem('totalCartItems', totalCartItems);
    }
  }

  redirectPath(url) {
    this.setState({
      isShouldRedirect: true,
      redirectToPath: url,
    });
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

  // priceTotal() {
  //   return (
  //     <div>
  //       <h2>Valor total:</h2>
  //     </div>
  //   );
  // }

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
          {/* <div>{this.priceTotal()}</div> */}
          <CheckoutCartButton />
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
