import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
//helpers
import { trimContent } from "../../helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing.unit * 4,
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#87556f",
    width: "100px",
    height: "100px",
  },
}));

const CardDetailed = (props) => {
  const { product } = props;

  const [wishlisted, setWislisted] = useState(false);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            Pre-view
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.name}
        subheader="Created At"
      />
      <CardMedia
        className={classes.media}
        image="https://dapp.dblog.org/img/default.jpg"
        title="default image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {trimContent(product.description, 200, " ", " ...")}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => setWislisted(!wishlisted)}
        >
          {!wishlisted ? (
            <FavoriteBorderIcon style={{ color: "#cf1b1b" }} />
          ) : (
            <FavoriteIcon style={{ color: "#cf1b1b" }} />
          )}
        </IconButton>
        <Button
          startIcon={<AddShoppingCartIcon />}
          aria-label="share"
          fullWidth
          variant="contained"
          color="primary"
          style={{ backgroundColor: "green" }}
        >
          Add to Cart
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{product.description}</Typography>
          <Typography paragraph>Price: A${product.price}</Typography>
          <Typography paragraph>
            Product Category: {product.category}
          </Typography>
          <Typography paragraph>
            Shipping: {product.shipping ? "Available" : "Not Available"}
          </Typography>
          <Typography paragraph>
            {product.quantity > 0 ? "Available" : "Out of Stock"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardDetailed;
