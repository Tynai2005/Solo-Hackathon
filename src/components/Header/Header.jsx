import React, { useContext } from "react";
import logo from "../../IMG/logo2.png";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Navbar from "./Navbar";
import { Button } from "@material-ui/core";
import ContactsIcon from "@material-ui/icons/Contacts";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
import { AuthContext} from "../../contexts/AuthContext";
import { useMotos } from "../../contexts/MotoContext";
import firebase from "../../base";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: "orange",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navbarBtn: {
    color: "white",
  },
  logo: {
    color: "inherit",
    textDecoration: "none",
    width: "300px",
    height: '100px',
    marginLeft: '0px',
  },
  a: {
    textDecoration: "none",
    color: "black",
  },
}));

export default function Header() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext)
  const {toMotosList,history} = useMotos()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!currentUser ? (
        <div>
          <Link to="/login" className={classes.a}>
            <MenuItem onClick={handleMenuClose}>Log in</MenuItem>
          </Link>
          <Link to="/signup" className={classes.a}>
            <MenuItem onClick={handleMenuClose}>Sign up</MenuItem>
          </Link>
        </div>
      ) : (
        <MenuItem onClick={() => (handleMenuClose(), firebase.auth().signOut(),localStorage.removeItem('user'))}>Log out</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => history.push("/contacts")}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <ContactsIcon />
        </IconButton>
        <p>Contacts</p>
      </MenuItem>
      <MenuItem onClick={() => history.push("/aboutus")}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <InfoIcon />
        </IconButton>
        <p> About us</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {currentUser ? <>{currentUser.email}</> : "Profile"}
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="sticky" className={classes.navbar}>
          <Toolbar>
            <Link to="/" onClick={toMotosList} className={classes.logo}>
              <Typography className={classes.title} variant="h4" noWrap>
                <img src={logo} alt="logo" className={classes.logo} />
              </Typography>
            </Link>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Button
                className={classes.navbarBtn}
                onClick={() => history.push("/contacts")}
              >
                <ContactsIcon style={{ marginRight: "5px" }} />
                Contacts
              </Button>
              <Button
                className={classes.navbarBtn}
                onClick={() => history.push("/aboutus")}
              >
                <InfoIcon style={{ marginRight: "5px" }} />
                About us
              </Button>
              <Button
                className={classes.navbarBtn}
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle style={{ marginRight: "5px" }} />
                {currentUser ? <>{ currentUser.email}</> : null}
              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      <Navbar />
    </>
  );
}
