import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//actions
import { signin, authenticate, isAuth } from "../../actions/auth";
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
import Layout from "../../layouts";
import styles from "../../styles/FormStyles";
//components
import Google from "../../components/social-login/Google";
import Facebook from "../../components/social-login/Facebook";

const Signin = (props) => {
  let history = useHistory();

  if (isAuth()) history.push("/");

  const { classes } = props;

  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Sign in",
    showButton: true,
    error: "",
    success: false,
    loading: false,
  });
  const {
    email,
    password,
    buttonText,
    showButton,
    error,
    success,
    loading,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, loading: false, error: data.error });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            success: true,
            loading: false,
            redirectTo: true,
          });
          isAuth().role === 1
            ? history.push("/admin/dashboard")
            : history.push("/");
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      error: "",
      success: false,
      [e.target.name]: e.target.value,
    });
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

  return (
    <Layout>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Sign in</Typography>

          <Google />
          <Facebook />
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                onChange={handleChange}
                value={email}
                type="email"
                name="email"
                autoFocus
              ></Input>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                onChange={handleChange}
                value={password}
                type="password"
                name="password"
                autoFocus
              ></Input>
            </FormControl>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me!"
            />
            {showButton && (
              <Button
                className={classes.submit}
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
                style={{ backgroundColor: "#87556f" }}
              >
                {buttonText}
              </Button>
            )}
          </form>
          <Link to="/auth/password/forgot" className={classes.forgot}>
            Forgot Password?
          </Link>
        </Paper>
      </main>
      {showError()}
    </Layout>
  );
};

export default withStyles(styles)(Signin);
