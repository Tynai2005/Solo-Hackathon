
import {
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState,useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../../base";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import './assets/Login.css'

const Login = () => {
    const {
    visible,
    handleVisible,
    typePass,
    handleInpType,
    history,
  } = useContext(AuthContext);

  const [exist,setExist] = useState(false)

  const [newUser, setNewUser] = useState({
    nickname: "",
    name: "",
    password: "",
    cart: [],
    library: [],
    isAdmin: false,
    id: "", 
  });

  const handleLogin = async (event) => {
      event.preventDefault();
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(newUser.name, newUser.password);
        history.push("/");
      } catch (error) {
        if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
          setExist(true)
        }else{
          alert(error)
        }
    };

  }

  const { currentUser } = useContext(AuthContext);

  return (
    <Container component="main" maxWidth="xs">
      <form action="" className='cont-auth'>
        <Grid container className='containers-auth'>
          <div>
            <Typography component="h1" variant="h5" color='black' style={{ color: "black"}}>
              Authorization
            </Typography>
          </div>
         <Grid className='grids-auth'>
            <TextField
              variant="filled"
              name="email"
              required
              label="Email"
              InputLabelProps={{
                style: { color: "black" },
              }}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  name: e.target.value,
                })
              }
            />
          </Grid>
          <Grid className='grids-auth'>
            <TextField
              variant="filled"
              type={typePass}
              name="password"
              required
              label="Password"
              InputLabelProps={{
                style: { color: "black" },
              }}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <IconButton
              className='visBtn-auth'
              onClick={() => {
                handleVisible();
                handleInpType();
              }}
            >
              {!visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Grid>
          <Grid > 
            {exist ? (
              <Typography className='text-auth'>
                No such user exists. Wanna <Link to="/signup">sign up</Link>?
              </Typography>
            ) : null}
            <Button
              className='btns-auth'
              style={{ marginRight: "25px" }}
              variant="contained"
              color="secondary"
              onClick={() => {
                history.goBack();
              }}
            >
              Close
            </Button>
            <Button
              className='btns-auth'
              variant="contained"
              color="primary"
              onClick={(e) => handleLogin(e)}
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
