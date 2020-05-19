import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class BotaoRetorno extends Component {
  render() {
    return (
      <Link to="/">
        <button type="button">Retornar</button>
      </Link>
    );
  }
}

export default BotaoRetorno;
