import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import '../pages/Details.css';

export class FormAvaliacao extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nota: 0,
      mensagem: '',
      reviews: [],
    };
    this.evtMapper = this.evtMapper.bind(this);
    this.insertReview = this.insertReview.bind(this);
  }

  evtMapper(event, name) {
    const { value } = event.target;
    this.setState({ [name]: value });
  }

  insertReview(evt) {
    const { email, nota, mensagem, reviews } = this.state;
    evt.preventDefault();
    this.setState(
      {
        reviews: [...reviews, { email, nota, mensagem }],
        email: '',
        nota: 0,
        mensagem: '',
      });
  }

  secaoAvaliacoes() {
    const { reviews } = this.state;
    return (
      <div>
        <h2>Avaliações</h2>
        {reviews.map((ava) => (
          <ul className="avaliacao">
            <li>Usuário: {ava.email}</li>
            <li>Nota: {ava.nota}</li>
            <li>Mensagem: {ava.mensagem}</li>
          </ul>
        ))}
      </div>
    );
  }

  render() {
    const { email, nota, mensagem } = this.state;
    return (
      <form
        className="formReview"
        onSubmit={this.insertReview}
      >
        <legend>Avalie este produto</legend>
        <input
          placeholder="e-mail"
          type="email"
          required={true}
          value={email}
          onChange={(evt) => this.evtMapper(evt, 'email')}
        />
        <Rating
          name="nota"
          precision={0.5}
          required={true}
          value={nota}
          onChange={(evt) => { this.evtMapper(evt, 'nota'); }}
        />
        <textarea
          placeholder="Observações (opcional)"
          value={mensagem}
          onChange={(evt) => this.evtMapper(evt, 'mensagem')}
        />
        <button type="submit">Enviar</button>
        {this.secaoAvaliacoes()}
      </form>
    );
  }
}

export default FormAvaliacao;
