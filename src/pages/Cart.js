import React, { Component } from 'react';
import GridProdutos from '../components/GridProdutos';
import MensagemCarrinho from '../components/MensagemCarrinho';

export class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emptyCart: true,
      cartItems: [],
      cartItemsQuantity: 0,
      cartTotalValue: 0,
    };

    this.emptyCartState = this.emptyCartState.bind(this);
    this.cartValueSum = this.cartValueSum.bind(this);
  }

  componentDidMount() {
    const carStorage = JSON.parse(localStorage.getItem('products') || '[]');
    if (carStorage.length > 0) {
      this.setState({
        emptyCart: false,
        cartItems: carStorage,
        cartItemsQuantity: carStorage.length,
      });
    }
  }

  componentDidUpdate(prevState) {
    const { cartItemsQuantity, cartTotalValue } = this.state;
    if (
      cartItemsQuantity === 0 && cartItemsQuantity !== prevState.cartItemsQuantity
    ) {
      this.emptyCartState();
    }
    if (
      cartTotalValue !== prevState.cartTotalValue ||
      cartItemsQuantity !== prevState.cartItemsQuantity
    ) {
      this.cartValueSum();
    }
  }

  emptyCartState() {
    this.setState({ emptyCart: true });
  }

  cartValueSum() {
    const carStorage = JSON.parse(localStorage.getItem('products') || '[]');
    const carTotal = carStorage
      .map((item) => item.price * item.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    localStorage.setItem('cartTotalValue', JSON.stringify(carTotal));
    this.setState(() => ({ cartTotalValue: carTotal }));
  }

  render() {
    const { emptyCart, cartItems, cartTotalValue } = this.state;

    if (emptyCart) return <MensagemCarrinho />;

    return (
      <div>
        <GridProdutos products={cartItems} />
        <p>{cartTotalValue}</p>
      </div>
    );
  }
}

export default Cart;
