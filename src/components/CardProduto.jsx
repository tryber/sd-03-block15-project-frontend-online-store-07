import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardActions, Typography, Button } from '@material-ui/core';

export class CardProduto extends Component {
  constructor(props) {
    super(props);

    this.addToCartButton = this.addToCartButton.bind(this);
  }

  addToCartButton() {
    const { product, addToCart } = this.props;
    const {
      title,
      price,
      id,
      thumbnail,
      available_quantity: availableQuantity,
    } = product;
    return (
      <Button
        color="secondary"
        data-testid="product-add-to-cart"
        className="btn btn-link"
        value="Adicionar ao Carrinho"
        type="button"
        onClick={() => addToCart(title, price, id, thumbnail, availableQuantity)}
      >
        Adicionar ao Carrinho
      </Button>
    );
  }

  render() {
    const { product, cart } = this.props;
    const {
      id,
      title,
      thumbnail,
      price,
      available_quantity: availableQuantity,
      shipping: { free_shipping: freeShipping },
    } = product;

    return (
      <div data-testid="product">
        <Card>
          <CardHeader
            title={title}
            subheader={id}
          />
          <img src={thumbnail} alt={title} />
          <CardContent>
            <Typography variant="h6" color="textPrimary" component="">
              R${price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {freeShipping && <span data-testid="free-shipping">FRETE GRÁTIS</span>}
              <br/>
              {`Quantidade disponível: ${availableQuantity}`}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
              {this.addToCartButton()}
            <Button size="small" color="secondary">
              <Link
              data-testid="product-detail-link"
              to={{ pathname: `/details/${id}`, state: { product, cart } }}
              >
                Detalhes
              </Link>
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default CardProduto;
