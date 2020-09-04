//facebook login client side
import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FACEBOOK_CLIENT_ID } from "../../config";
import { loginWithFacebook, authenticate, isAuth } from "../../actions/auth";
import { useHistory } from "react-router-dom";
//material
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
//styles
import styles from "../../styles/FormStyles";

const Facebook = (props) => {
  let history = useHistory();

  const { classes } = props;

  const responseFacebook = (response) => {
    const accessToken = response.accessToken;
    const userID = response.userID;

    const userInfo = { accessToken, userID };

    loginWithFacebook(userInfo).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //authenticate to save the user info in the db
        authenticate(data, () => {
          history.push("/");
        });
      }
    });
  };

  return (
    <FacebookLogin
      appId={`${FACEBOOK_CLIENT_ID}`}
      autoLoad={false}
      callback={responseFacebook}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          className={classes.submit}
          variant="contained"
          tyle="submit"
          color="primary"
          fullWidth
        >
          <i className="fab fa-facebook-f" style={{ marginRight: "1em" }} />
          Sign in with Facebook
        </Button>
      )}
    />
  );
};

export default withStyles(styles)(Facebook);
