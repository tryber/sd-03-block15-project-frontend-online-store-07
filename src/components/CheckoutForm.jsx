import React, { Component } from 'react';

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, type) {
    const input = e.target;
    this.setState({ [type]: input.value });
    console.log(this.state);
  }

  handleSubmit() {
    const { onClick } = this.props;
    onClick(this.state);
    this.setState({
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      adress: '',
    });
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
          <input type="text" required data-testid="checkout-email" id="email" value={email} onChange={(e) => this.handleChange(e, 'email')} />
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
    return (
      <div>
        <form>
          {this.personalInfo()}
          {this.adressInfo()}
          <div>
            <button type="button" onClick={this.handleSubmit}>Finalizar Compra</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
