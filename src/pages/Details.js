import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidade: 0,
    };
    this.atualizaQuantidade = this.atualizaQuantidade.bind(this);
    this.alteraQuantidade = this.alteraQuantidade.bind(this);
  }

  atualizaQuantidade(event) {
    this.setState({ quantidade: event.target.value });
  }

  alteraQuantidade(soma, max) {
    this.setState((currentState) => {
      const novaQuantidade = (soma ? currentState.quantidade + 1 : currentState.quantidade - 1)
      if (novaQuantidade >= 0 && novaQuantidade < max)
      return ({quantidade: novaQuantidade})
    });
  }

  seletorQuantidade() {
    const {available_quantity} = this.props.apiResults;
    return(
      <div>
        <label for='quantidade'>Quantidade</label>: 
        <input
          name="quantidade"
          type="number"
          min="0"
          max={available_quantity}
          value={this.state.quantidade}
          onChange={this.atualizaQuantidade}>
        </input>
        <button onClick={() => this.alteraQuantidade(false, available_quantity)}>-</button>
        <button onClick={() => this.alteraQuantidade(true, available_quantity)}>+</button>
        <button>Adicionar ao carrinho</button>
      </div>
    )
  }

  render() {
    const { price, title, thumbnail, attributes } = this.props.apiResults;
    return (
      <div className="detalheProduto">
        <div className="cabecalhoProduto">
          <Link to='/'>Voltar</Link>
          <h3 data-testid='product-detail-name'>{title} - R$ {price}</h3>
        </div>
        <div className="imagemDetalhe">
          <img src={thumbnail} alt=""></img>
        </div>
        <div className="dadosProduto">
          <h3>Especificações técnicas</h3>
          {attributes.map((att) => <li>{att.name}: {att.value_name}</li>)}
        </div>
          {this.seletorQuantidade()}
      </div>
    );
  }
}

export default Details;
