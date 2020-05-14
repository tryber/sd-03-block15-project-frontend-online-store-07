import React, { Component } from 'react';
//import { Rating } from "@material-ui/lab/Rating";

export class FormAvaliacao extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nota: 3,
      mensagem: '',
    };
    this.evtMapper = this.evtMapper.bind(this);
    this.setaNota = this.setaNota.bind(this);
  }

  evtMapper(event, name) {
    const { value } = event.target;
    this.setState({ [name]: value });
  }

  setaNota(valor) {
    this.setState({nota: valor})
  }

  render() {
    return (
      <form>
        <legend>Avaliações</legend>
        <input 
          type="text"
          value={this.state.email}
          onChange={(evt) => this.evtMapper(evt, 'email')}
        />
        <textarea 
          value={this.state.mensagem}
          onChange={(evt) => this.evtMapper(evt, 'mensagem')}
        />
      </form>
    );
  }
}

export default FormAvaliacao;
