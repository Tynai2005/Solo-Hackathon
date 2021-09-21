import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMotos } from "../../contexts/MotoContext";
import './assets/Cart.css'
import { AuthContext } from "../../contexts/AuthContext";
import { MOTOS_API } from "../../helper/consts";
import firebase from 'firebase/app';


const useStyles = makeStyles((theme) => ({

  text:{
    color: 'black',
    marginLeft: '10px',
    fontSize: '20px',
  },
  img:{
    width: '15%',
    borderRadius: '10px',
  },
  grids:{
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent:'space-between'
  },
  title:{
    color: 'black',
    fontFamily: 'Bebas Neue, cursive',
    fontStyle: 'italic',
  },
  container:{
    display: 'flex',
    fontFamily: 'Bebas Neue, cursive',
    fontStyle: 'italic',
    width:'100%',
    fontSize:'18px'
  },
  price:{
    color: 'black',
  },
  deleteBtn:{
    color: 'black',
  },
  noMoto:{
    color: 'black',
    height: '80vh',
    textAlign: 'center',
    marginTop: '20px',
    fontStyle:'italic',
    fontFamily:'Bebas Neue'
  },
  buyGrid:{
    display: 'flex',
    justifyContent: 'space-between',
  },
  buyBtn:{
    color: 'black',
    backgroundColor: 'green',
  },
  main:{
    minHeight: '100vh',
    margin: '20px auto',
  },
  numbers:{
    margin:'0 60px',
    width:'80px',
    textAlign:'center'
  }
}))

const Cart = () => {
  const { history,getMotoFromCart,deleteCartMoto,canRender,totalPrice,cartMoto,setCanRender } = useMotos();
  const {currentUser} = useContext(AuthContext)
  const [subPrice,setSubPrice] = useState(0)
  const [motoCount,setMotoCount] = useState(1)
  const [curMotoId,setCurMotoId] = useState()
  let [amount,setAmount] = useState(0)
  const [motos,setMotos] = useState([])
  let allMotos = []
  const classes = useStyles()
  useEffect( () => {
    handleCreateAllMotos()
    window.scrollTo(0, 0);
  },[])

  const handleCreateAllMotos = async () => { 
    const data1 = await firebase.firestore().collection('motos').get()
    const data = data1.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    let sum = 0
    data.map((eachMoto) => {
      eachMoto.wishlist.map((email) => {if(email == currentUser.email){calcEachProduct(eachMoto.price);allMotos.push(eachMoto)}})
    })
    allMotos.forEach(eachMoto => {eachMoto.count = 1})
    setMotos(allMotos)
    setCanRender(true)
  }

  const calcEachProduct = (price) => {
    amount += price
    setAmount(amount)
  }

  const calcSubprice = async (motoId,count,motoPrice) => {
    console.log(motoId,count,motoPrice);
    if(count < 1){
      await setMotoCount(1)
      await setSubPrice(1*motoPrice)
      // setAmount(subPrice)
      setCurMotoId(motoId)
      return
    }
    await setSubPrice(count*motoPrice)
    // setAmount(subPrice)
    setMotoCount(count)
    setCurMotoId(motoId)
  }

  return (
    <>
    {canRender ? <>
      {motos.length > 0 ? (
        <Container className={classes.main}>
          <h2 className={classes.title}>Your cart</h2>
            {motos.map((moto) => (
              <Container className={classes.container}>
              <Grid className={classes.grids}>
                <div>
                <img src={moto.image} className={classes.img} />
                <span className={classes.text}>{moto.name}</span>
                </div>
              </Grid>
              <Grid className={classes.grids}>
                <div>{moto.price}$</div>
                <IconButton
                  onClick={ async () => {
                    await deleteCartMoto(moto.id)
                    handleCreateAllMotos();
                  }}
                >
                  <DeleteIcon className={classes.deleteBtn} />
                </IconButton>
              </Grid>
            </Container>
            ))}
          <Grid className={classes.buyGrid}>
            <h2 className={classes.title}>Total price: {amount}$</h2>
            <Button
              className={classes.buyBtn}
              onClick={() => history.push("/purchase")}
            >
              Buy
            </Button>
          </Grid>
        </Container>
      ) : (
        <h2 className={classes.noMoto}>There isn't Motos in your cart</h2>
      )}
    </> : <h2 className={classes.noMoto}>Loading...</h2>}
    </>
  );
};

export default Cart;
