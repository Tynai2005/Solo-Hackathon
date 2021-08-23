import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useContext } from "react";
import { useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMotos } from "../../contexts/MotoContext";
import './assets/Cart.css'

const Cart = () => {
  const { history,getMotoFromCart,deleteCartMoto,canRender,totalPrice,cartMotos } = useMotos();
  
  useEffect(() => {
    getMotoFromCart()
    window.scrollTo(0, 0);
  },[])



  return (
    <>
    {canRender ? <>
      {cartMotos.length > 0 ? (
        <Container className='main'>
          <h2 className='title'>Your cart</h2>
            {cartMotos.map((moto) => (
              <Container className='container'>
              <Grid className='grids'>
                <img src={moto.image} className='img' />
                <div className='text'>{moto.name}</div>
              </Grid>
              <Grid className='grids'>
                <div className='price'>{moto.price}$</div>
                <IconButton
                  onClick={() => {
                    deleteCartMoto(moto.id);
                  }}
                >
                  <DeleteIcon className='deleteBtn' />
                </IconButton>
              </Grid>
            </Container>
            ))}
          <Grid className='buyGrid'>
            <h2 className='title'>Total price: {totalPrice}</h2>
            <Button
              className='buyBtn'
              onClick={() => history.push("/purchase")}
            >
              Buy
            </Button>
          </Grid>
        </Container>
      ) : (
        <h2 className='noMoto'>There isn't Motos in your cart</h2>
      )}
    </> : <div>Loading...</div>}
    </>
  );
};

export default Cart;
