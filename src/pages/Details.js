import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormAvaliacao from '../components/FormAvaliacao';

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidade: 0,
      comentarios: null,
    };
    this.atualizaQuantidade = this.atualizaQuantidade.bind(this);
    this.alteraQuantidade = this.alteraQuantidade.bind(this);
  }

  atualizaQuantidade(event) {
    this.setState({ quantidade: event.target.value });
  }

  alteraQuantidade(soma, max) {
    this.setState((currentState) => {
      const novaQuant = (soma ? currentState.quantidade + 1 : currentState.quantidade - 1);
      if (novaQuant >= 0 && novaQuant <= max) {
        return ({ quantidade: novaQuant });
      }
      return ({ quantidade: 0 });
    });
  }

  seletorQuantidade() {
    const estoque = this.props.location.state.product.available_quantity;
    return (
      <div>
        <label htmlFor="quantidade">Quantidade</label>:
        <input
          name="quantidade"
          type="number"
          min="0"
          max={estoque}
          value={this.state.quantidade}
          onChange={this.atualizaQuantidade}
        />
        <button onClick={() => this.alteraQuantidade(false, estoque)}>-</button>
        <button onClick={() => this.alteraQuantidade(true, estoque)}>+</button>
        <button data-testid="product-detail-add-to-cart">Adicionar ao carrinho</button>
      </div>
    );
  }

  render() {
    const { location: { state: { product } } } = this.props;
    const { price, title, thumbnail, attributes } = product;
    return (
      <div className="detalheProduto">
        <div className="cabecalhoProduto">
          <Link to="/">Voltar</Link>
          <h3 data-testid="product-detail-name">{title} - R$ {price}</h3>
        </div>
        <div className="imagemDetalhe">
          <img src={thumbnail} alt="" />
        </div>
        <div className="dadosProduto">
          <h3>Especificações técnicas</h3>
          {attributes.map((att) => <li>{att.name}: {att.value_name}</li>)}
        </div>
        {this.seletorQuantidade()}
        <FormAvaliacao />
      </div>
    );
  }
}

export default Details;
