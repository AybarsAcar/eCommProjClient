//google login client side
import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { loginWithGoogle, authenticate, isAuth } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";
import { useHistory } from "react-router-dom";
//material
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
//styles
import styles from "../../styles/FormStyles";

const Google = (props) => {

  let history = useHistory();

  const {classes} = props;

  const responseGoogle = (response) => {
    console.log(response);
    const tokenId = response.tokenId;
    const user = {tokenId: tokenId};

    //request to the backend
    loginWithGoogle(user).then(data => {
      if (data.error) {
        console.log(data.error);
        
      } else {
        //authenticate to save user info and redirect
        authenticate(data, () => {
          isAuth() && history.push("/")
        })
      }
    })
  };

  return (
  
      <GoogleLogin
        clientId={`${GOOGLE_CLIENT_ID}`}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className={classes.submit}
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            style={{ backgroundColor: "#DB4437" }}
          >
            <i className="fab fa-google" style={{ marginRight: "1em" }} />
            Sign in with Google
          </Button>
        )}
      />
   
  );
};

export default withStyles(styles)(Google);
