//imports
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//actions
import { preSignup, isAuth } from "../../actions/auth";
//material
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
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
import Layout from "../../layouts";

const Signup = (props) => {

  let history = useHistory();

  if (isAuth()) history.push("/");

  const { classes } = props;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    buttonText: "Send confirmation email",
    error: "",
    success: false,
    loading: false,
  });
  const {
    name,
    email,
    password,
    passwordConfirmation,
    buttonText,
    error,
    success,
    loading,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });

    //request to the server
    if (password !== passwordConfirmation) {
      setValues({
        ...values,
        loading: false,
        buttonText: "Sending email",
        error: "Passwords don't match",
      });
    } else {
      preSignup({ name, email, password }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            buttonText: "confirmation email is sent",
            error: "",
            success: true,
          });
        }
      });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, error: "", [e.target.name]: e.target.value });
  };

  const showError = () =>
    error && (
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open>
        <Alert style={{ border: "2px solid red" }} severity="error">{error}</Alert>
      </Snackbar>
    );
  const showSuccess = () =>
    success && (
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open>
        <Alert style={{ border: "2px solid green" }} severity="success">Email has successfully been sent!</Alert>
      </Snackbar>
    );

  return (
    <Layout>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Sign up</Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                onChange={handleChange}
                value={name}
                type="text"
                name="name"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                onChange={handleChange}
                value={email}
                type="email"
                name="email"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                onChange={handleChange}
                value={password}
                type="password"
                name="password"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password Confirmation</InputLabel>
              <Input
                onChange={handleChange}
                value={passwordConfirmation}
                type="password"
                name="passwordConfirmation"
                autoFocus
              />
            </FormControl>

            <Button
              className={classes.submit}
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              style={{ backgroundColor: "#87556f" }}
              disabled={loading}
            >
              {buttonText}
            </Button>
          </form>
        </Paper>
        {loading && <h1>LOADING</h1>}
        {error && showError()}
        {success && showSuccess()}
      </main>
    </Layout>
  );
};

export default withStyles(styles)(Signup);
