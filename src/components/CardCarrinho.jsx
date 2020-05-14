import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as localStorage from '../services/localStorage';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = { added: false };
    this.removeUnitProduct = this.removeUnitProduct.bind(this);
    this.addUnitProduct = this.addUnitProduct.bind(this);
    this.createButtonMoreItem = this.createButtonMoreItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createButtonAddItem = this.createButtonAddItem.bind(this);
    this.createButtonRemoveItem = this.createButtonRemoveItem.bind(this);
  }

  removeItem(func) {
    const { item } = this.props;
    const { id } = item;
    localStorage.removeItem(id);
    this.setState({ added: false });
    func();
  }

  addItem(func) {
    const { item } = this.props;
    const { price, title, thumbnail, id, available_quantity: availableQuantity } = item;
    const obj = {
      id,
      price,
      title,
      thumbnail,
      availableQuantity,
      qtd: 1,
    };
    localStorage.setNewItem(obj);
    this.setState({ added: true });
    func();
  }

  addUnitProduct(func) {
    const { item } = this.props;
    const { id, availableQuantity } = item;
    const value = localStorage.getQtd(id) + 1;
    if (value < availableQuantity) {
      localStorage.UpdateItemQtd(id, value);
    }
    func();
  }

  removeUnitProduct(func) {
    const { item } = this.props;
    const { id } = item;
    const value = localStorage.getQtd(id) - 1;
    if (value > 0) {
      localStorage.UpdateItemQtd(id, value);
    }
    func();
  }

  createButtonAddItem() {
    const { onChange } = this.props;
    return (
      <button
        type="button"
        onClick={() => this.addItem(onChange)}
        className="buttonAddCart"
      >
        Adicionar Item
      </button>
    );
  }

  createButtonRemoveItem() {
    const { onChange } = this.props;
    return (
      <div className="show-btn-remove">
        <button
          type="button"
          onClick={() => this.removeItem(onChange)}
          className="buttonRemoveCart"
        >
          Remover Item
        </button>
        {this.createButtonMoreItem()}
      </div>
    );
  }

  createButtonMoreItem() {
    const { onChange, item } = this.props;
    return (
      <div className="div-qtd">
        <button
          type="button"
          className="left"
          onClick={() => this.addUnitProduct(onChange)}
          disabled={localStorage.getQtd(item.id) === item.available_quantity}
        >
          +
        </button>
        <div className="text-qtd">
          <span>{localStorage.getQtd(item.id)}</span>
        </div>
        <button
          type="button"
          className="right"
          onClick={() => this.removeUnitProduct(onChange)}
        >
          -
        </button>
      </div>
    );
  }

  render() {
    const { added } = this.state;
    const { item } = this.props;
    const { price, title, thumbnail, id } = item;
    const titleSpace = title.split(' ');

    return (
      <section className="content-center">
        <div>
          <div className="title">
            <h3>{`${titleSpace[0]} ${titleSpace[1]}`}</h3>
            <h3>{`${titleSpace[2]} ${titleSpace[3]}`}</h3>
            <p className="value">{`R$ ${price}`}</p>
          </div>
          <div className="info-product">
            <img
              className="img-product"
              alt="imagem do produto"
              src={thumbnail}
            />
          </div>
          <Link
            className="info"
            to={{ pathname: `products/${id}`, state: { productDetails: item } }}
          >
            +Info
          </Link>
          {!added && this.createButtonAddItem()}
          {added && this.createButtonRemoveItem()}
        </div>
      </section>
    );
  }
}

export default ProductCard;
