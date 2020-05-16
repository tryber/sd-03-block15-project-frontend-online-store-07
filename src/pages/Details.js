import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { FormAvaliacao } from '../components/FormAvaliacao';
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
    this.setState({ disableMinBtn: false });
    const novaQuant = this.state.quantidade + 1;
    this.setState({ quantidade: novaQuant });
    if (novaQuant === max) {
      this.setState({ disableMaxBtn: true });
    }
  }

  diminuirUm() {
    this.setState({ disableMaxBtn: false });
    const novaQuant = this.state.quantidade - 1;
    this.setState({ quantidade: novaQuant });
    if (novaQuant <= 0) {
      this.setState({ disableMinBtn: true });
    }
  }

  freteGratis() {
    if (this.props.location.state.product.shipping.free_shipping) {
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
    const estoqueDisponivel = this.props.location.state.product
      .available_quantity;
    return (
      <div>
        <label htmlFor="quantidade">Quantidade: </label>
        <input
          name="quantidade"
          type="number"
          min="0"
          max={estoqueDisponivel}
          value={this.state.quantidade}
          onChange={this.atualizaQuantidade}
        />
        <button
          disabled={this.state.disableMinBtn}
          onClick={() => this.diminuirUm(estoqueDisponivel)}
        >
          -
        </button>
        <button
          disabled={this.state.disableMaxBtn}
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
          <Link to="/">Voltar</Link>
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
