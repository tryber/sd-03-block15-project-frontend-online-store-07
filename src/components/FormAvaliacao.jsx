import React, { Component } from 'react';
import { Rating } from '@material-ui/lab';

export class FormAvaliacao extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nota: 3,
      mensagem: '',
    };
    this.evtMapper = this.evtMapper.bind(this);
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
          placeholder="e-Mail"
          type="text"
          value={this.state.email}
          onChange={(evt) => this.evtMapper(evt, 'email')}
        />
        <Rating
          precision={0.5}
          value={this.state.nota}
          onChange={(evt) => { this.evtMapper(evt, 'nota'); }}
        />
        <textarea
          placeholder="Observações (opcional)"
          value={this.state.mensagem}
          onChange={(evt) => this.evtMapper(evt, 'mensagem')}
        />
      </form>
    );
  }
}

export default FormAvaliacao;
