import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import firebase from "../../base";
import './assets/SignUp.css'

  const SignUp = () => {

    const [exist,setExist] = useState(false)

    const {
      visible,
      typePass,
      handleInpType,
      setVisible,
      setInpType,
      history,
    } = useContext(AuthContext);

    const [newUser, setNewUser] = useState({
      nickname: "",
      name: "",
      password: "",
      cart: [],
      library: [],
      isAdmin: false,
      id: "", 
    });

    const handleSignUp = async (event) => {
      event.preventDefault();
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.name, newUser.password);
        history.push("/");
      } catch (error) {
        if (error.message == "The email address is already in use by another account."){
          setExist(true)
        }else{
          alert(error)
        }
      }
    };

    console.dir(firebase.auth().createUserWithEmailAndPassword);

  return (
    <div className='container' component="main" maxWidth="xs">
      <form action="" className='cont'>
        <div>
          <div>
            <Typography component="h1" variant="h5" style={{ color: "white" }}>
              Registration
            </Typography>
          </div>
          <div>
            <TextField
              variant="outlined"
              className='inps'
              color=""
              name="nickname"
              required
              label="Nickname"
              InputProps={{
                className:'inpColor'
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              onChange={(e) =>
                setNewUser({ ...newUser, nickname: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              className='inps'
              name="email"
              required
              label="Email Address"
              InputProps={{
                className:'inpColor'
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Grid className='grids'>
              <TextField
                variant="outlined"
                className='inps'
                name="password"
                type={typePass}
                required
                label="Password"
                InputProps={{
                  className:'inpColor'
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <IconButton
                className='visBtn'
                onClick={() => {
                  setVisible(!visible);
                  handleInpType();
                }}
              >
                {!visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Grid>
          </div>
          {exist ? (
              <Typography className='text'>
                Such user exists. Wanna <Link to="/login">log in</Link>?
              </Typography>
            ) : null}
          <Button
            className='btns'
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
            className='btns'
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleSignUp(e);
              setVisible(false);
              setInpType(false);
            }}
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
