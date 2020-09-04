import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
//actions
import { signup } from "../../actions/auth";
//material
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
//styles
import { useStyles } from "../../styles/ActivateStyles";
import Layout from "../../layouts"

const Activate = (props) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    token: "",
    showButton: true,
    loading: false,
    error: "",
    success: false,
  });
  const { name, token, showButton, loading, error, success } = values;

  //grab the token from the router
  useEffect(() => {
    //get the token from the route parameters
    let token = props.match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setValues({ ...values, name: name, token: token });
    }
  }, []);

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });

    //make a request to the sign up endpoin in the server
    signup({ token }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          showButton: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          success: true,
          showButton: false,
        });
      }
    });
  };

  const showError = () =>
    error && (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open
      >
        <Alert style={{ border: "2px solid red" }} severity="error">{error}</Alert>
      </Snackbar>
    );

  const showSuccess = () =>
    success && (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open
      >
        <Alert style={{ border: "2px solid green" }} severity="success">
          Signed up successfully! you can now <Link to="/signin">SIGN IN</Link>
        </Alert>
      </Snackbar>
    );

  return (
    <Layout>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image="https://images.adsttc.com/media/images/573c/90c0/e58e/ce1e/1600/0007/newsletter/Here_is_a_theater_to_unfold_an_outstanding_drama__and_the_characters_are_book_lovers_sitting_on_the_soft_couch_or_standing_beside_the_bookshelves._0004.jpg?1463587001"
          title="photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="h2">
            Hey {name}!
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Almost there! Please click on the <em>LINK</em> below to activate
            your account!
          </Typography>
        </CardContent>
        <CardActions>
          {showButton && (
            <Button
              onClick={handleSubmit}
              size="large"
              color="primary"
              fullWidth
              style={{ color: "green" }}
            >
              Activate your account!
            </Button>
          )}
        </CardActions>
      </Card>
      {showError()}
      {showSuccess()}
    </Layout>
  );
};

export default Activate;
