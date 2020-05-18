import React, { Component } from 'react';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { CarLink } from '../components/CarLink';
import { BotaoRetorno } from '../components/BotaoRetorno';
import { FormAvaliacao } from '../components/FormAvaliacao';
import './Details.css';

export class Details extends Component {
  constructor(props) {
    super(props);

    const itensSelecionados = JSON.parse(localStorage.getItem('cartProducts'));

    this.state = {
      itensCarrinho: [...itensSelecionados],
      quantidade: 0,
      quantidadeCarrinho: 0,
      comentarios: null,
      disableMinBtn: true,
      disableMaxBtn: false,
    };

    this.atualizaQuantidade = this.atualizaQuantidade.bind(this);
    this.adicionarUm = this.adicionarUm.bind(this);
    this.diminuirUm = this.diminuirUm.bind(this);
    this.adicionarAoCarrinho = this.adicionarAoCarrinho.bind(this);
  }

  componentDidMount() {
    this.montaItensCarrinho();
    this.contadorCarrinho();
  }

  componentDidUpdate() {
    this.atualizaCarrinho();
  }

  montaItensCarrinho() {
    const { itensCarrinho, quantidade } = this.state;
    const { location } = this.props;
    const { state } = location;
    const { product } = state;
    const { id } = product;
    const itemIndex = itensCarrinho.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const updatedCart = itensCarrinho;
      updatedCart[itemIndex].quantity += quantidade;
      this.setState({ itensCarrinho: updatedCart });
      this.setState({ quantidade: updatedCart[itemIndex].quantity });
    }
  }

  atualizaCarrinho() {
    const { itensCarrinho } = this.state;
    localStorage.setItem('cartProducts', JSON.stringify(itensCarrinho));
  }

  contadorCarrinho() {
    const itensSelecionados = JSON.parse(localStorage.getItem('cartProducts'));
    if (itensSelecionados) {
      this.setState({
        quantidadeCarrinho: itensSelecionados.reduce(
          (acc, item) => acc + parseInt(item.quantity, 10),
          0,
        ),
      });
    }
  }

  adicionarAoCarrinho(title, price, id, thumbnail, availableQuantity) {
    const { itensCarrinho, quantidadeCarrinho, quantidade } = this.state;
    const itemIndex = itensCarrinho.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const updatedCart = itensCarrinho;
      updatedCart[itemIndex].quantity = quantidade;
      this.setState({
        itensCarrinho: updatedCart,
        quantidadeCarrinho: quantidadeCarrinho + quantidade,
      });
    } else {
      this.setState({
        itensCarrinho: [
          ...itensCarrinho,
          {
            title,
            id,
            price,
            thumbnail,
            availableQuantity,
            quantity: quantidade,
          },
        ],
        quantidadeCarrinho: quantidadeCarrinho + quantidade,
      });
    }
  }

  atualizaQuantidade(event) {
    this.setState({ quantidade: event.target.value });
  }

  adicionarUm(max) {
    const { quantidade } = this.state;
    this.setState(() => ({
      disableMinBtn: false,
      quantidade: quantidade + 1,
    }));
    if (quantidade === max - 1) {
      this.setState({ disableMaxBtn: true });
    }
  }

  diminuirUm() {
    const { quantidade } = this.state;
    this.setState(() => ({
      disableMinBtn: false,
      quantidade: quantidade - 1,
    }));
    if (quantidade < 2) {
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
    const { disableMinBtn, disableMaxBtn, quantidade } = this.state;
    return (
      <div>
        <label htmlFor="quantidade">
          Quantidade:
          <input
            id="quantidade"
            type="number"
            min="0"
            max={availableQuantity}
            value={quantidade}
            onChange={this.atualizaQuantidade}
          />
        </label>
        <button
          type="button"
          disabled={disableMinBtn}
          onClick={() => this.diminuirUm(availableQuantity)}
        >
          -
        </button>
        <button
          type="button"
          disabled={disableMaxBtn}
          onClick={() => this.adicionarUm(availableQuantity)}
        >
          +
        </button>
        {/* <button data-testid="product-detail-add-to-cart" type="button" onClick={this.adicionarAoCarrinho}>
          Adicionar ao carrinho
        </button> */}
      </div>
    );
  }

  render() {
    const { quantidadeCarrinho } = this.state;
    const {
      location: {
        state: { product },
      },
    } = this.props;
    const { id, price, title, thumbnail, attributes } = product;
    return (
      <div className="telaDetalhes">
        <div className="cabecalhoProduto">
          <BotaoRetorno />
          <CarLink size={quantidadeCarrinho} />
          <h2 data-testid="product-detail-name">
            {title} - R$ {price}
          </h2>
          {this.freteGratis()}
        </div>
        <div className="detalhesProduto">
          <img src={thumbnail} alt={`Imagem de ${title}`} height="350px" />
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
        <FormAvaliacao prodID={id} />
      </div>
    );
  }
}

export default Details;
