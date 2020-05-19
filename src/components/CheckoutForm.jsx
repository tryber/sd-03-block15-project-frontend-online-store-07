import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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

  personalInfo() {
    const { fullname, email, cpf, phone } = this.state;
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <TextField label="Nome completo" fullWidth type="text" required data-testid="checkout-fullname" id="name" value={fullname} onChange={(e) => this.handleChange(e, 'fullname')} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" type="email" required data-testid="checkout-email" id="email" value={email} onChange={(e) => this.handleChange(e, 'email')} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="CPF" type="text" required data-testid="checkout-cpf" id="cpf" value={cpf} onChange={(e) => this.handleChange(e, 'cpf')} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Telefone" type="text" required data-testid="checkout-phone" id="telefone" value={phone} onChange={(e) => this.handleChange(e, 'phone')} />
        </Grid>
      </React.Fragment>
    );
  }

  adressInfo() {
    const { cep, adress } = this.state;
    return (
      <React.Fragment>
        <Grid item xs={12} sm={6}>
          <TextField label="CEP" type="text" required data-testid="checkout-cep" id="cep" value={cep} onChange={(e) => this.handleChange(e, 'cep')} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Endereço" fullWidth type="text" required data-testid="checkout-address" id="endereco" value={adress} onChange={(e) => this.handleChange(e, 'adress')} />
        </Grid>
      </React.Fragment>
    );
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Typography variant="h6" gutterBottom>
            Informações de Entrega
          </Typography>
          {this.personalInfo()}
          {this.adressInfo()}
        </Grid>
      </React.Fragment>
    );
  }
}

export default CheckoutForm;
