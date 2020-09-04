import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import jwt from "jsonwebtoken";
import Layout from "../../layouts";
//actions
import { resetPassword } from "../../actions/auth";
//material
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
//styles
import styles from "../../styles/FormStyles";

const ResetPassword = (props) => {
  const { classes, match } = props;

  const [values, setValues] = useState({
    name: "",
    token: "",
    password: "",
    passwordConfirmation: "",
    loading: "",
    error: "",
    message: "",
    success: false,
  });
  const {
    password,
    passwordConfirmation,
    loading,
    error,
    success,
    message,
    name,
    token,
  } = values;

  //grab the user info from the token
  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) setValues({ ...values, name, token });
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, error: "", [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    //check password match
    if (password !== passwordConfirmation) {
      setValues({ ...values, loading: false, error: "Passwords don't match" });
    } else {
      resetPassword({ newPassword: password, resetPasswordLink: token }).then((data) => {
        if (data.error) {
          setValues({ ...values, laoding: false, error: data.error });
        } else {
          setValues({
            ...values,
            loading: false,
            message: data.message,
            password: "",
            passwordConfirmation: "",
            error: false,
            success: true,
          });
        }
      });
    }
  };

  const showError = () =>
    error && (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open
      >
        <Alert style={{ border: "2px solid red" }} severity="error">
          {error}
        </Alert>
      </Snackbar>
    );
  const showSuccess = () =>
    success && (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open
      >
        <Alert style={{ border: "2px solid green" }} severity="success">
          {message}! <Link to="/signin">SIGN IN</Link>
        </Alert>
      </Snackbar>
    );

  return (
    <Layout>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Reset Password</Typography>
          <br />
          <Typography
            Typography
            variant="body1"
            color="textSecondary"
            component="p"
          >
            Hey {name}! Please Enter your email to receive a link to reset your
            password
          </Typography>

          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Password</InputLabel>
              <Input
                onChange={handleChange}
                value={password}
                type="password"
                name="password"
                autoFocus
              ></Input>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">PasswordConfirmation</InputLabel>
              <Input
                onChange={handleChange}
                value={passwordConfirmation}
                type="password"
                name="passwordConfirmation"
                autoFocus
              ></Input>
            </FormControl>

            {!success && (
              <Button
                className={classes.submit}
                variant="contained"
                type="submit"
                fullWidth
                disabled={loading}
                color="primary"
                style={{ backgroundColor: "#87556f" }}
              >
                Reset Password
              </Button>
            )}
          </form>
        </Paper>
      </main>
      {showError()}
      {showSuccess()}
    </Layout>
  );
};

export default withStyles(styles)(ResetPassword);
