import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import '../pages/Details.css';

export class FormAvaliacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prodId: this.props.prodID,
      email: '',
      nota: 0,
      mensagem: '',
    };
    this.evtMapper = this.evtMapper.bind(this);
    this.insertReview = this.insertReview.bind(this);
    this.secaoAvaliacoes = this.secaoAvaliacoes.bind(this);
  }

  evtMapper(event, name) {
    const { value } = event.target;
    this.setState({ [name]: value });
  }

  insertReview(evt) {
    const { email, nota, mensagem, prodId } = this.state;
    const reviewsLS = localStorage.getItem(prodId) ?
    JSON.parse(localStorage.getItem(prodId)) :
    '';
    evt.preventDefault();
    this.setState(
      {
        email: '',
        nota: 0,
        mensagem: '',
      });
    const novoReview = { email, nota, mensagem };
    localStorage.setItem(prodId, JSON.stringify([...reviewsLS, novoReview]));
  }

  secaoAvaliacoes(reviewsLS) {
    const parsedReviews = JSON.parse(reviewsLS);
    const { prodId } = this.state;
    return (
      <div>
        <h2>Avaliações</h2>
        {parsedReviews.map((ava) => (
          <ul className="avaliacao">
            <li key={`${prodId} - Usu`}><strong>Usuário:</strong> {ava.email}</li>
            <li key={`${prodId} - Ema`}><strong>Nota:</strong> {ava.nota}</li>
            <li key={`${prodId} - Msg`}><strong>Mensagem:</strong> {ava.mensagem}</li>
          </ul>
        ))}
      </div>
    );
  }

  render() {
    const { prodId, email, nota, mensagem } = this.state;
    const reviewsLS = localStorage.getItem(prodId);
    return (
      <form className="formReview" onSubmit={this.insertReview} >
        <h3>Avalie este produto</h3>
        <input
          placeholder="e-mail"
          type="email"
          required
          value={email}
          onChange={(evt) => this.evtMapper(evt, 'email')}
        />
        <Rating
          name="nota"
          precision={0.5}
          required
          value={nota}
          onChange={(evt) => { this.evtMapper(evt, 'nota'); }}
        />
        <textarea
          data-testid="product-detail-evaluation"
          placeholder="Observações (opcional)"
          value={mensagem}
          onChange={(evt) => this.evtMapper(evt, 'mensagem')}
        />
        <button type="submit">Enviar</button>
        {reviewsLS ? this.secaoAvaliacoes(reviewsLS) : <p>Seja o primeiro a avaliar</p>}
      </form>
    );
  }
}

export default FormAvaliacao;
