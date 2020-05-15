import React from 'react';
import { Link } from 'react-router-dom';
import BarraEsquerda from '../components/BarraEsquerda';
import { GridProdutos } from '../components/GridProdutos';
import BarraPesquisa from '../components/BarraPesquisa';
import MessagemInicial from '../components/MessagemInicial';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      apiResults: [],
      categories: [],
      selectedItems: [],
    };

    this.addToCart = this.addToCart.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    return api
      .getCategories()
      .then((data) => this.setState({ categories: data }));
  }

  handleSearchSubmit(query) {
    api
      .getProductsFromCategoryAndQuery('', query)
      .then((data) => this.setState({ apiResults: data.results }));
  }

  addToCart(title, price, id, thumbnail, availableQuantity) {
    const { selectedItems } = this.state;
    const itemIndex = selectedItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const updatedCart = selectedItems;
      updatedCart[itemIndex].quantity += 1;
      this.setState({ selectedItems: updatedCart });
    } else {
      this.setState({
        selectedItems: [
          ...selectedItems,
          { title, id, price, thumbnail, availableQuantity, quantity: 1 },
        ],
      });
    }
  }

  render() {
    const { categories, apiResults, selectedItems } = this.state;
    return (
      <div>
        <div>
          <BarraEsquerda categorias={categories} />
        </div>
        <div>
          <BarraPesquisa onClick={this.handleSearchSubmit} />
        </div>
        <div>
          <Link
            data-testid="shopping-cart-button"
            to={{ pathname: '/cart', state: { selectedItems } }}
          >
            <i className="fas fa-shopping-cart" />
          </Link>
        </div>
        <div>
          {apiResults.length === 0 ? (
            <MessagemInicial />
          ) : (
            <GridProdutos products={apiResults} addToCart={this.addToCart} />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
