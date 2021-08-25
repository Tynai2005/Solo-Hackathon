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
// import './assets/Login.css'

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

  return (
    <Container component="main" maxWidth="xs">
      <form action="" className='cont'>
        <Grid container className='containers'>
          <div>
            <Typography component="h1" variant="h5" color='black' style={{ color: "black" }}>
              Registration
            </Typography>
          </div>
          <Grid className='grids'>
            <TextField
              variant="filled"
              className='inps'
              name="email"
              required
              label="Email"
              InputProps={{
                className: 'inpColor',
              }}
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
          <Grid className='grids'>
            <TextField
              variant="filled"
              className='inps'
              type={typePass}
              name="password"
              required
              label="Password"
              InputProps={{
                className: 'inpColor',
              }}
              InputLabelProps={{
                style: { color: "black" },
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
          <Grid className='buttons'> 
            {exist ? (
              <Typography className='text'>
                No such user exists. Wanna <Link to="/signup">sign up</Link>?
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
              onClick = {(e) => {handleSignUp(e)}}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;
