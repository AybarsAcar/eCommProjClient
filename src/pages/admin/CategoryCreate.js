import React, { useState } from "react";
import Layout from "../../layouts";
//actions
import { isAuth, getCookie } from "../../actions/auth";
import { createCategory } from "../../actions/category";
//material
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CategoryIcon from "@material-ui/icons/Category";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
//styles
import styles from "../../styles/FormStyles";

const CategoryCreate = (props) => {
  //get the user from the localStorage
  const user = isAuth();
  //get the token from the cookie
  const token = getCookie("token");

  const { classes } = props;

  const [values, setValues] = useState({
    name: "",
    loading: false,
    error: "",
    success: false,
  });
  const { name, loading, error, success } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    //make request to api to create a category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setValues({ ...values, loading: false, error: data.error });
      } else {
        setValues({ ...values, loading: false, error: false, success: true });
      }
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, error: false, success: false, name: e.target.value });
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
          Category {name} has successfully been created!
        </Alert>
      </Snackbar>
    );

  return (
    <Layout>
      <main className={classes.main}>       
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CategoryIcon />
          </Avatar>
          <Typography variant="h5">Create a Category</Typography>
          <br />
          <Typography
            Typography
            variant="body1"
            color="textPrimary"
            component="p"
          >
            Hey {user.name}!
            <Divider />
          </Typography>
          <br />
          <Typography
            Typography
            variant="body1"
            color="textSecondary"
            component="p"
          >
            Please Enter a new Category name to create a new Category!
          </Typography>

          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">New Category Name</InputLabel>
              <Input
                onChange={handleChange}
                value={name}
                type="text"
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
                Create
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

export default withStyles(styles)(CategoryCreate);
