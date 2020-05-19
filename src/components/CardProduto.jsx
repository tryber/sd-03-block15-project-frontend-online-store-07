import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import './CardProduto.css';

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
        data-testid="product-add-to-cart"
        value="Adicionar ao Carrinho"
        size="small"
        color="default"
        variant="contained"
        type="button"
        onClick={() => addToCart(title, price, id, thumbnail, availableQuantity)}
      >
        Adicionar ao Carrinho
      </Button>
    );
  }

  cardContent() {
    const { product } = this.props;
    const { id, title, price, available_quantity: availableQuantity, shipping: { free_shipping: freeShipping },
    } = product;
    return (
      <CardContent classes={{ root: 'product-card' }}>
        <Typography gutterBottom color="textSecondary" variant="overline">
          {id}
        </Typography>
        <Typography gutterBottom color="textPrimary" variant="h5">
          {title}
        </Typography>
        <Typography color="textPrimary" variant="subtitle2" gutterBottom>{`Preço: R$ ${price.toFixed(2)}`}</Typography>
        {freeShipping && (
          <Typography
            gutterBottom
            color="secondary"
            variant="caption"
            data-testid="free-shipping"
          >
            <LocalShippingIcon />
            Frete grátis
          </Typography>
        )}
        <Typography gutterBottom color="textPrimary" variant="caption">{`Quantidade disponível: ${availableQuantity}`}</Typography>
      </CardContent>
    );
  }

  render() {
    const { product } = this.props;
    const { id, title, thumbnail } = product;
    return (
      <Card data-testid="product">
        <CardMedia component="img" image={thumbnail} alt={title} />
        {this.cardContent()}
        <CardActionArea>
          <CardActions>
            {this.addToCartButton()}
            <Link
              color="primary"
              size="small"
              data-testid="product-detail-link"
              to={{ pathname: `/details/${id}`, state: { product } }}
            >
              <Button color="primary" size="small">
                Detalhes
              </Button>
            </Link>
          </CardActions>
        </CardActionArea>
      </Card>
    );
  }
}

export default CardProduto;
