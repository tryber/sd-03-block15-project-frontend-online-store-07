import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, GridList } from '@material-ui/core/';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      adress: '',
      paymentMethod: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, type) {
    const input = e.target;
    this.setState({ [type]: input.value });
    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      adress: '',
      paymentMethod: '',
      redirect: true,
    });
  }

  payments() {
    const { paymentMethod } = this.state;
    return (
      <div>
        <label htmlFor="payment-method">
          Método de pagamento
          <select id="payment-method" value={paymentMethod} onChange={(e) => this.handleChange(e, 'payment-method')}>
            <option value="credit-card">Cartão de Credíto</option>
            <option value="debit-card">Cartão de Débito</option>
            <option value="billet">Boleto Bancário</option>
          </select>
        </label>
      </div>
    );
  }

  personalInfo() {
    const { fullname, email, cpf, phone } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome completo
          <input type="text" required data-testid="checkout-fullname" id="name" value={fullname} onChange={(e) => this.handleChange(e, 'fullname')} />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" required data-testid="checkout-email" id="email" value={email} onChange={(e) => this.handleChange(e, 'email')} />
        </label>
        <label htmlFor="cpf">
          CPF
          <input type="text" required data-testid="checkout-cpf" id="cpf" value={cpf} onChange={(e) => this.handleChange(e, 'cpf')} />
        </label>
        <label htmlFor="telefone">
          Telefone
          <input type="text" required data-testid="checkout-phone" id="telefone" value={phone} onChange={(e) => this.handleChange(e, 'phone')} />
        </label>
      </div>
    );
  }

  adressInfo() {
    const { cep, adress } = this.state;
    return (
      <div>
        <label htmlFor="cep">
          CEP
          <input type="text" required data-testid="checkout-cep" id="cep" value={cep} onChange={(e) => this.handleChange(e, 'cep')} />
        </label>
        <label htmlFor="endereco">
          Endereço
          <input type="text" required data-testid="checkout-address" id="endereco" value={adress} onChange={(e) => this.handleChange(e, 'adress')} />
        </label>
      </div>
    );
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/" />;
    return (
      <div style={{ flexGrow: 1 }}>
        <form onSubmit={this.handleSubmit}>
          <GridList cellHeight={90} cols={1}>
            {this.payments()}
            <Grid item xs={8}>
              {this.personalInfo()}
            </Grid>
            <Grid item xs={6}>
              {this.adressInfo()}
            </Grid>
          </GridList>
          <div>
            <button type="submit">Finalizar Compra</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
