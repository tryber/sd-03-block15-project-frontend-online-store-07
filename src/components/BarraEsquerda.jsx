import React, { Component } from 'react';
import * as api from '../services/api';

class BarraEsquerda extends Component {
  constructor(props) {
    super(props);
    this.state = { categorias: [] };
  }

  componentDidMount() {
    api.getCategories().then((data) => this.setState({ categorias: data }));
  }

  render() {
    const { categorias } = this.state;
    return (
      <div className="categoriesMenu">
        {categorias.map((cat) => <li key={cat.id}>{cat.name}</li>)}
      </div>
    );
  }
}

export default BarraEsquerda;
