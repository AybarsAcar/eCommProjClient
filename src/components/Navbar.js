import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { navStyles } from "../styles/navbarStyles";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import DashboardIcon from "@material-ui/icons/Dashboard";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import TuneIcon from "@material-ui/icons/Tune";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import TranslateIcon from "@material-ui/icons/Translate";

//actions
import { isAuth, signout } from "../actions/auth";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #3c2c3e",
    background: "#d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElLang, setAnchorElLang] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguage = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseLang = () => {
    setAnchorElLang(null);
  };

  let history = useHistory();

  const classes = navStyles();

  const handleSignout = () => {
    signout(() => {
      history.push("/signin");
    });
  };

  const languageMenu = () => (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorElLang}
      keepMounted
      open={Boolean(anchorElLang)}
      onClose={handleCloseLang}
    >
      <StyledMenuItem>
        <ListItemText primary="English" />
      </StyledMenuItem>
      <StyledMenuItem>
        <ListItemText primary="Türkçe" />
      </StyledMenuItem>
      <StyledMenuItem>
        <ListItemText primary="中文" />
      </StyledMenuItem>
    </StyledMenu>
  );

  const userMenu = () => (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {isAuth() && isAuth().role === 1 ? (
        <>
          <Link
            to="/admin/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Admin Dashboard" />
            </StyledMenuItem>
          </Link>
          <Divider />
          <Link
            to="/admin/create/category"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <NoteAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Create a Category" />
            </StyledMenuItem>
          </Link>
          <Link
            to="/admin/create/product"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <PlaylistAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Create a Product" />
            </StyledMenuItem>
            <Divider />
          </Link>
          <Link
            to="/admin/manage/products"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <TuneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Products" />
            </StyledMenuItem>
          </Link>
          <Link
            to="/admin/manage/orders"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <SendIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="View Orders" />
            </StyledMenuItem>
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/user/profile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="User Profile" />
            </StyledMenuItem>
          </Link>
          <Divider />
          <Link
            to="/user/wishlist"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </StyledMenuItem>
          </Link>
          <Link
            to="/user/history"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <HistoryIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Purchase History" />
            </StyledMenuItem>
          </Link>
        </>
      )}
    </StyledMenu>
  );

  return (
    <div>
      <AppBar style={{ backgroundColor: "#3c2c3e" }} position="fixed">
        <Toolbar>
          <Link to="/" style={{ color: "white" }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            the Perch Merch
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.profile}>
            <Link to="/cart" style={{ color: "white" }}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

            {isAuth() && (
              <>
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                {userMenu()}
              </>
            )}
          </div>
          {!isAuth() ? (
            <>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button
                  className={classes.buttons}
                  variant="contained"
                  color="primary"
                >
                  Sign in
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  className={classes.buttons}
                  variant="contained"
                  color="secondary"
                >
                  Sign up!
                </Button>
              </Link>
            </>
          ) : (
            <Button
              className={classes.buttons}
              variant="contained"
              color="secondary"
              onClick={handleSignout}
            >
              Sign out
            </Button>
          )}
          <div className={classes.profile}>
            <IconButton
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={handleLanguage}
              color="inherit"
            >
              <TranslateIcon />
            </IconButton>
            {languageMenu()}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
