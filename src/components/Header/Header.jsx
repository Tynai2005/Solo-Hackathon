import React, { useContext } from "react";
import logo from "../../IMG/logo3.png";
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
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import firebase from "../../base";
import '../../variables/Variables.css'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: "white  !important",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontFamily: 'Bebas Neue, cursive',
    fontStyle: 'italic',
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
    fontFamily: 'Bebas Neue, cursive',
    fontStyle: 'italic',
    fontSize: '18px',
    '&:hover':{
      transition: '0.5s',
      transform: 'scale(1.1)',
    },
  },
  logo: {
    color: "inherit",
    textDecoration: "none",
    width: "200px",
    height: '100px',
    marginLeft: '0px',
  },
  a: {
    textDecoration: "none",
    color: "black",
    fontFamily: 'Bebas Neue, cursive !important',
    fontStyle: 'italic !important',
  },
  navbarBtnMobile:{
    fontFamily: 'Bebas Neue, cursive !important',
    fontStyle: 'italic !important',
  },
  p:{
    color: 'black',
  }

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
            <MenuItem className={classes.a}  onClick={handleMenuClose}>Log in</MenuItem>
          </Link>
          <Link to="/signup" className={classes.a}>
            <MenuItem  className={classes.a} onClick={handleMenuClose}>Sign up</MenuItem>
          </Link>
        </div>
      ) : (
        <MenuItem className={classes.a} onClick={() => (handleMenuClose(), firebase.auth().signOut(),localStorage.removeItem('user'))}>Log out</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <>
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.p}
    >
      <MenuItem onClick={() => history.push("/contacts")}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <ContactSupportOutlinedIcon />
        </IconButton>
        <p className={classes.navbarBtnMobile}>Contacts</p>
      </MenuItem>
      <MenuItem onClick={() => history.push("/aboutus")}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <InfoIcon />
        </IconButton>
        <p className={classes.navbarBtnMobile}> About us</p>
      </MenuItem>
      <MenuItem className={classes.navbarBtnMobile} onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton  >
        {currentUser ? <>{currentUser.email}</> : "Profile"}
      </MenuItem>
    </Menu>
    </>
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="sticky" className={classes.navbar}>
          <Toolbar className={classes.navbar}>
            <Link to="/"  onClick={toMotosList} className={classes.logo}>
                <img src={logo} alt="logo" className={classes.logo} />
            </Link>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Button
                className={classes.navbarBtn}
                onClick={() => history.push("/contacts")}
              >
                <ContactSupportOutlinedIcon className={classes.p} />
                <div className={classes.p}>Contacts</div>
              </Button>
              <Button
                className={classes.navbarBtn}
                onClick={() => history.push("/aboutus")}
              >
                <InfoIcon className={classes.p} style={{ marginRight: "5px" }} />
               <div className={classes.p}>About us</div>
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
                <AccountCircle className={classes.p} style={{ marginRight: "5px" }} />
                {currentUser ? <div className={classes.p}>{ currentUser.email}</div> : null}
              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="black"
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
