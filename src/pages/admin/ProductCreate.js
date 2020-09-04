import React, { useState, useEffect } from "react";
import Layout from "../../layouts";
//actions
import { isAuth, getCookie } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { createProduct } from "../../actions/product";
//material
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Grid from "@material-ui/core/Grid";

//styles
import styles from "../../styles/FormStyles";
import CardDetailed from "../../components/cards/CardDetailed";

const ProductCreate = (props) => {
  //get the user from the localStorage
  const user = isAuth();
  //get the token from the cookie
  const token = getCookie("token");

  const { classes } = props;

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    success: false,
  });
  const {
    name,
    description,
    price,
    category,
    categories,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
    success,
  } = values;

  //load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    //make request to api to create a category
    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
          success: true
        })
      }
    })
  };

  const handleChange = (e) => {
    const value =
      e.target.name === "photo" ? e.target.files[0] : e.target.value;

    //set the form data
    formData.set(e.target.name, value);

    setValues({ ...values, [e.target.name]: value });
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
          Product {createdProduct} has successfully been created!
        </Alert>
      </Snackbar>
    );

  const createProductForm = () => (
    <Paper className={classes.gridPaper}>
      <img src="" />
      {/* <Avatar className={classes.avatar}>
        <PlaylistAddIcon />
      </Avatar> */}
      <Typography variant="h5">Create a Product</Typography>
      <br />
      <Typography Typography variant="body1" color="textPrimary" component="p">
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
        Please fill in the fields below to create a new Product!
      </Typography>

      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={handleChange}
          name="photo"
          hidden
        />
        <label htmlFor="contained-button-file">
          <Fab
            component="span"
            style={{ backgroundColor: "#87556f", color: "white" }}
          >
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">New Product Name</InputLabel>
          <Input
            onChange={handleChange}
            value={name}
            name="name"
            type="text"
            autoFocus
          ></Input>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField
            label="Product Description"
            onChange={handleChange}
            multiline
            rows={4}
            value={description}
            name="description"
            autoFocus
            required
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Price</InputLabel>
          <Input
            onChange={handleChange}
            value={price}
            name="price"
            type="number"
            autoFocus
            startAdornment={
              <InputAdornment position="start">A$</InputAdornment>
            }
          ></Input>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Product Category</InputLabel>
          <Select
            onChange={handleChange}
            name="category"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
          >
            {categories.map((c, i) => (
              <MenuItem key={i} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel>Quantity</InputLabel>
          <Input
            onChange={handleChange}
            value={quantity}
            name="quantity"
            type="number"
            autoFocus
          ></Input>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Shipping Option</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            name="shipping"
          >
            <MenuItem value={0}>No</MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
          </Select>
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
  );

  console.log(photo);

  return (
    <Layout>
      <main className={classes.gridLayout}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            {createProductForm()}
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardDetailed
              product={{
                name: name,
                description: description,
                price: price,
                category: category,
                quantity: quantity,
                shipping: shipping,
                photo: photo,
              }}
            />
          </Grid>
        </Grid>
      </main>
      {showError()}
      {showSuccess()}
    </Layout>
  );
};

export default withStyles(styles)(ProductCreate);
