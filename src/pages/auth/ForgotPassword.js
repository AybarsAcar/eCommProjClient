import React, { useState } from "react";
import Layout from "../../layouts";
//actions
import { forgotPassword } from "../../actions/auth";
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

const ForgotPassword = (props) => {
  const { classes } = props;

  const [values, setValues] = useState({
    email: "",
    loading: "",
    error: "",
    message: "",
    success: false,
  });
  const { email, loading, error, success, message } = values;

  const handleChange = (e) => {
    setValues({ error: "", email: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, message: "", error: "" });
    //send the email to our backend
    forgotPassword({ email }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: "",
          success: true,
          loading: false,
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
        <Alert style={{ border: "2px solid red" }} severity="error">
          {error}
        </Alert>
      </Snackbar>
    );
  const showSuccess = () =>
    success && (
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open>
        <Alert style={{ border: "2px solid green" }} severity="success">
          {message}
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
          <Typography variant="h5">Forgot Password</Typography>
          <br />
          <Typography
            Typography
            variant="body1"
            color="textSecondary"
            component="p"
          >
            Please Enter your email to receive a link to reset your password
          </Typography>

          <form onSubmit={handleSubmit} className={classes.form}>
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
                Send Email
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

export default withStyles(styles)(ForgotPassword);
