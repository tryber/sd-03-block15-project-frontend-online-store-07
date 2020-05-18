import React, { Component } from 'react';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { BotaoRetorno } from '../components/BotaoRetorno';
import { FormAvaliacao } from '../components/FormAvaliacao';
import './Details.css';

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itensCarrinho: [],
      quantidade: 0,
      comentarios: null,
      disableMinBtn: true,
      disableMaxBtn: false,
    };
    this.atualizaQuantidade = this.atualizaQuantidade.bind(this);
    this.adicionarUm = this.adicionarUm.bind(this);
    this.diminuirUm = this.diminuirUm.bind(this);
  }

  componentDidMount() {
    this.montaItensCarrinho();
  }

  montaItensCarrinho() {
    const { itensCarrinho, quantidade } = this.state;
    const { location } = this.props;
    const { state } = location;
    const { product } = state;
    const { id } = product;
    const itensSelecionados = JSON.parse(
      localStorage.getItem('cartProducts'),
    );
    this.setState({ itensCarrinho: itensSelecionados });
    const itemIndex = itensCarrinho.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const updatedCart = itensCarrinho;
      updatedCart[itemIndex].quantity += quantidade;
      this.setState({ itensCarrinho: updatedCart });
      this.setState({ quantidade: updatedCart[itemIndex].quantity });
    }
  }

  atualizaQuantidade(event) {
    this.setState({ quantidade: event.target.value });
  }

  adicionarUm(max) {
    const { quantidade } = this.state;
    this.setState({ disableMinBtn: false });
    const novaQuant = quantidade + 1;
    this.setState({ quantidade: novaQuant });
    if (novaQuant === max) {
      this.setState({ disableMaxBtn: true });
    }
  }

  diminuirUm() {
    const { quantidade } = this.state;
    this.setState({ disableMaxBtn: false });
    const novaQuant = quantidade - 1;
    this.setState({ quantidade: novaQuant });
    if (novaQuant <= 0) {
      this.setState({ disableMinBtn: true });
    }
  }

  freteGratis() {
    const { location } = this.props;
    const { state } = location;
    const { product } = state;
    const { shipping } = product;
    const { free_shipping: freeShipping } = shipping;
    if (freeShipping) {
      return (
        <p>
          <LocalShippingIcon />
          Frete grátis
        </p>
      );
    }
    return null;
  }

  seletorQuantidade() {
    const { location } = this.props;
    const { state } = location;
    const { product } = state;
    const { available_quantity: availableQuantity } = product;
    const estoqueDisponivel = availableQuantity;
    const { disableMinBtn, disableMaxBtn, quantidade } = this.state;
    return (
      <div>
        <label htmlFor="quantidade">
          Quantidade:
          <input
            id="quantidade"
            type="number"
            min="0"
            max={estoqueDisponivel}
            value={quantidade}
            onChange={this.atualizaQuantidade}
          />
        </label>
        <button
          type="button"
          disabled={disableMinBtn}
          onClick={() => this.diminuirUm(estoqueDisponivel)}
        >
          -
        </button>
        <button
          type="button"
          disabled={disableMaxBtn}
          onClick={() => this.adicionarUm(estoqueDisponivel)}
        >
          +
        </button>
        <button data-testid="product-detail-add-to-cart" type="button">
          Adicionar ao carrinho
        </button>
      </div>
    );
  }

  render() {
    const { location: { state: { product } } } = this.props;
    const { price, title, thumbnail, attributes } = product;
    return (
      <div className="telaDetalhes">
        <div className="cabecalhoProduto">
          <BotaoRetorno />
          <h2 data-testid="product-detail-name">
            {title} - R$ {price}
          </h2>
          {this.freteGratis()}
        </div>
        <div className="detalhesProduto">
          <div className="imagemDetalhe">
            <img src={thumbnail} alt={`Imagem de ${title}`} height="350px" />
          </div>
          <div className="especificProduto">
            <h3>Especificações técnicas</h3>
            {attributes.map((att) => (
              <li key={att.name}>
                {att.name}: {att.value_name}
              </li>
            ))}
          </div>
        </div>
        {this.seletorQuantidade()}
        <FormAvaliacao />
      </div>
    );
  }
}

export default Details;
