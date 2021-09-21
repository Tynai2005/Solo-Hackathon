import {
  Button,
  colors,
  Container,
  Grid,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Link, useParams } from "react-router-dom";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useMotos } from "../../contexts/MotoContext";
import { borderRadius, display, width } from "@material-ui/system";
import { useState } from "react";
import MotoComments from "../MotoComments/MotoComments";
import { MOTOS_API, JSON_API_USERS } from "../../helper/consts";
import axios from "axios";
import { AuthContext, useAuth } from "../../contexts/AuthContext";
import { Alert } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderSharpIcon from "@material-ui/icons/FavoriteBorderSharp";
import './assets/MotoDetails.css';
import firebase from 'firebase/app';


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const MotoDetails = () => {
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [likesCount, setLikesCount] = useState(0);
  const [isInCart,setIsInCart] = useState()
  const [isInLibrary,setIsInLibrary] = useState(false)
  const {
    MotoDetails,
    getMotoDetails,
    history,
    toMotosList,
    toBuyNow,
  } = useMotos();
  const { currentUser,isAdmin } = useContext(AuthContext);

  const [buttonColor, setButtonColor] = useState("primary");
  const search = window.location.href;
  const {id} = useParams()

  useEffect(async () => {
    await getMotoDetails(id)
    handleLikesCount()
    handleIsInLibrary()
    handleIsInCart()
    window.scrollTo(0, 0);
  }, []); 

  const handleIsInLibrary = async () => {
    const data = await firebase.firestore().collection('motos').get()
    const motos = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    motos.map( moto => {if(moto.id == id){
      moto?.library.map((email) => {if(currentUser?.email == email){setIsInLibrary(true)}})
    }} )
  }

  const handleLikesCount = async () => {
    const data = await firebase.firestore().collection('motos').get()
    const motos = data.docs.map(doc => ({ ...doc.data(), id: doc.id })); 
    motos.map( moto => {if(moto.id == id){
      moto?.likes.map((like) => {
        if(like == currentUser?.email){
          setIsLiked(true)
        }
      })
      setLikesCount(moto.likes.length);
    }} )
  }

  const handleIsInCart = async () => {  
    const data = await firebase.firestore().collection('motos').get()
    const motos = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    motos.map( moto => {if(moto.id == id){
      moto.wishlist.map((email) => {if(email == currentUser?.email){setIsInCart(true)}})
    }} )
  }

  const addMotoCart = async () => {
    const curMoto = await JSON.parse(JSON.stringify(MotoDetails))
    curMoto.wishlist.push(currentUser.email)
    firebase.firestore().collection('motos').doc(MotoDetails.id).update(curMoto)
    getMotoDetails(id);
    setIsInCart(true)
  };

  const deleteMotoCart = async () => {
    const motoFromCart = await JSON.parse(JSON.stringify(MotoDetails))
    const filteredCart = motoFromCart.wishlist.filter((email) => {return(email != currentUser.email)})
    motoFromCart.wishlist = filteredCart
    firebase.firestore().collection('motos').doc(MotoDetails.id).update(motoFromCart)
    getMotoDetails(id);
    setIsInCart(false)
  }

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const like = async () => {
    const curMoto = await JSON.parse(JSON.stringify(MotoDetails))
    curMoto.likes.push(currentUser?.email);
    firebase.firestore().collection('motos').doc(MotoDetails.id).update(curMoto)
    setIsLiked(true);
    setLikesCount(curMoto.likes.length);
  };

  const dislike = async () => {
    const curMoto = await JSON.parse(JSON.stringify(MotoDetails))
    const newLikes = curMoto.likes.filter((like) => like != currentUser?.email);
    console.log(newLikes);
    const newData = { ...curMoto, likes: newLikes };
    firebase.firestore().collection('motos').doc(MotoDetails.id).update(newData)
    setIsLiked(false);
    setLikesCount(newLikes.length);
  };

  return (
    <Container>
      <div className='detailsContainer'>
        <div className='moto-details'>
          <hr className="hr" />
          <div > 
            <div className='left'>
              <h1 className='h1'>{MotoDetails.name}</h1>
              <br />
                <img
                  className='imgDet'
                  src={MotoDetails.image}
                  alt="Moto img"
                />
            </div>
            <div className='right'>
            <p className='p'>{MotoDetails.description}</p>
            <h3><div style={{fontFamily: 'Roboto',fontSize:'15px'}}>Price:</div> {MotoDetails.price}$</h3>
              <div className='type'>
                <div>
                  <h6 className='p'>type:</h6>
                  <h5 className='h1'>{MotoDetails.type}</h5>
                </div>
              </div>
              {currentUser ?               
              <div >
                {isLiked ? (
                  <FavoriteIcon
                    onClick={dislike}
                    style={{ color: "red", margin: "5px" }}
                  />
                ) : (
                  <FavoriteBorderSharpIcon
                    onClick={like}
                    style={{ color: "red", margin: "5px" }}
                  />
                )}
                {likesCount} likes
              </div> : 
              <div>
                  <FavoriteIcon
                    style={{ color: "red", margin: "5px" }}
                  />
                  {likesCount} likes
              </div>
              }
              {currentUser ? 
              <>{!isInLibrary ? 
                <><div className='buyBtns'>
                <Button
                    variant="contained"
                    className="buy-button-details"
                    onClick={() => {
                      history.push("/purchase");
                      toBuyNow(id);
                    }}
                  >
                    Buy now
                  </Button>
              </div>
              <div className='buyBtns'>
                   {currentUser ?  
                    <>{isInCart  ?
                      <Button
                        variant="outlined"
                        className='cart-button-details'
                        onClick={() => {
                          deleteMotoCart(id);
                          getMotoDetails(id);
                        }}
                      >
                        Remove from cart
                      </Button>
                      : 
                    <Button
                      variant="outlined"
                      className='cart-button-details'
                      onClick={() => {
                        addMotoCart();
                      }}
                    >
                      Add to cart
                    </Button>}</>
                      :
                    <Button
                      variant="outlined"
                      className='cart-button-details'
                      onClick={() => history.push("/login")}
                    >
                      Add to cart
                    </Button>}
              </div></> : <p>Already in library</p>}</>
              : null}
            </div>
          </div>
          <hr className='hr' />
          <MotoComments />
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Motos have been added to your library!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MotoDetails;
