import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class BotãoRetorno extends Component {
  render() {
    return (
      <Link to="/">
        <button type="button">Retornar</button>
      </Link>
    );
  }
}

export default BotãoRetorno;
