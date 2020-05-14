import React, { Component } from 'react';

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

    setaNota(valor) {
      this.setState({ nota: valor });
    }

  evtMapper(event, name) {
    const { value } = event.target;
    this.setState({ [name]: value });
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
