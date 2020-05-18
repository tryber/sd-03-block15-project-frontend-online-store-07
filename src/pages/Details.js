import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import FormAvaliacao from '../components/FormAvaliacao';
import CarLink from '../components/CarLink';
import './Details.css';

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidade: 0,
      comentarios: null,
      disableMinBtn: true,
      disableMaxBtn: false,
    };

    this.atualizaQuantidade = this.atualizaQuantidade.bind(this);
    this.adicionarUm = this.adicionarUm.bind(this);
    this.diminuirUm = this.diminuirUm.bind(this);
  }

  atualizaQuantidade(event) {
    this.setState({ quantidade: event.target.value });
  }

  adicionarUm(max) {
    this.setState({ 
      disableMinBtn: false,
      quantidade: this.state.quantidade + 1,
    });
    if (this.state.quantidade === max - 1) {
      this.setState({ disableMaxBtn: true });
    }
  }

  diminuirUm() {
    this.setState({ 
      disableMaxBtn: false,
      quantidade: this.state.quantidade - 1,
    });
    if (this.state.quantidade < 2) {
      this.setState({ disableMinBtn: true });
    }
  }

  // Código antigo (uma função no lugar de duas, mas bloated AF e ainda com bugs)
  // alteraQuantidade(soma, max) {
  //   this.setState((currentState) => {
  //     const novaQuant = (soma ? currentState.quantidade + 1 : currentState.quantidade - 1);
  //     if (novaQuant > max) {
  //       return ({
  //         disableMaxBtn: true,
  //         disableMinBtn: false});
  //       }
  //     if (novaQuant < 1) {
  //       return ({
  //         disableMaxBtn: false,
  //         disableMinBtn: true});
  //     }
  //     return({quantidade: novaQuant});
  //   });
  // }

  freteGratis() {
    if (this.props.location.state.product.shipping.free_shipping) {
      return (<p><LocalShippingIcon />Frete grátis</p>);
    }
    return null;
  }

  adicionarAoCarrinho() {

  }

  seletorQuantidade() {
    const availableQuantity = this.props.location.state.product.available_quantity;
    return (
      <div>
        <label htmlFor="quantidade">Quantidade: </label>
        <input
          name="quantidade"
          type="number"
          min="0"
          max={availableQuantity}
          value={this.state.quantidade}
          onChange={this.atualizaQuantidade}
        />
        <button
          disabled={this.state.disableMinBtn}
          onClick={() => this.diminuirUm(availableQuantity)}
        >-
        </button>
        <button
          disabled={this.state.disableMaxBtn}
          onClick={() => this.adicionarUm(availableQuantity)}
        >+
        </button>
      </div>
    );
  }

  render() {
    const { location: { state: { product, cart } } } = this.props;
    const { id, price, title, thumbnail, attributes } = product;
    // const availableQuantity = product.available_quantity;
    return (
      <div className="telaDetalhes">
        <div className="cabecalhoProduto">
          <Link to="/">Voltar</Link>
          <h2 data-testid="product-detail-name">{title} - R$ {price}</h2>{this.freteGratis()}
          <CarLink params={{ pathname: '/cart', state: { cart } }} />
        </div>
        <div className="detalhesProduto">
            <img src={thumbnail} alt={`Imagem de ${title}`} height="350px" />
          <div className="especificProduto">
            <h3>Especificações técnicas</h3>
            {attributes.map((att) => <li key={att.name}>{att.name}: {att.value_name}</li>)}
          </div>
        </div>
        {this.seletorQuantidade()}
        <button
          data-testid="product-detail-add-to-cart"
          // onClick={() => addToCart(title, price, id, thumbnail, availableQuantity)}
        >
          Adicionar ao carrinho
        </button>
        <FormAvaliacao prodID={id}/>
      </div>
    );
  }
}

export default Details;
