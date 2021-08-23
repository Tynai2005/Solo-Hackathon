import {
  Button,
  Container,
  makeStyles,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useMotos } from "../../contexts/MotoContext";
import { MOTOS_API } from "../../helper/consts";
import './assets/Purchase.css'

const Purchase = () => {
  const [open, setOpen] = useState(false);
  const { toLibrary, history,deleteCartMoto,currentUser } = useMotos();
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleInputNumber = (e) => {
    if (e.target.value.length < 17) setNumber(e.target.value);
  };
  const handleInputExpiry = (e) => {
    if (e.target.value.length < 5) {
      setExpiry(e.target.value);
    }
  };
  const handleInputCvc = (e) => {
    if (e.target.value.length < 5) {
      setCvc(e.target.value);
    }
  };
  const handleInputName = (e) => {
    setName(e.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const clearCart = async () => {
    const { data } = await axios(MOTOS_API);
    data.map((moto) => {deleteCartMoto(moto.id)})
  }

  const addAllMotosToLibrary = async () => {
    const { data } = await axios(MOTOS_API);
    data.map((moto) => {
      moto.wishlist.map((email) => {if(email == JSON.parse(localStorage.getItem('user'))){addMotoLibrary(moto.id)}})
    })
  }

  const addMotoLibrary = async (curMotoId) => {
    const motoToLibrary = await axios(`${MOTOS_API}/${curMotoId}`);
    motoToLibrary.data.library.push(JSON.parse(localStorage.getItem('user')))
    await axios.patch(`${MOTOS_API}/${curMotoId}`,motoToLibrary.data)
  }

  const checking = async () => {
    if (
      number.length == 16 &&
      expiry.length == 4 &&
      cvc.length == 4 &&
      name.length > 2
    ) {
      handleOpen();
      await addAllMotosToLibrary()
      clearCart()
      setTimeout(() => {
        history.push("/cart");
      }, 1500);
    } else {
      alert("Type valid information");
    }
  }

  return (
    <div className="containerOuter">
      <div id="PaymentForm" className='container'>
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focus}
        name={name}
        number={number}
      />
      <form className='form'>
        <TextField
          className='inps'
          required
          InputProps={{
            className: 'inpColor',
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          type="tel"
          name="number"
          value={number}
          placeholder="Card Number"
          onChange={(e) => handleInputNumber(e)}
          onFocus={(e) => handleInputFocus(e)}
        />
        <TextField
          className='inps'
          required
          value={expiry}
          InputProps={{
            className: 'inpColor',
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          type="tel"
          name="expiry"
          placeholder="Card Expiry"
          onChange={(e) => handleInputExpiry(e)}
          onFocus={(e) => handleInputFocus(e)}
        />
        <TextField
          className='inps'
          required
          value={cvc}
          InputProps={{
            className: 'inpColor',
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          type="tel"
          name="cvc"
          placeholder="Card Cvc"
          onChange={(e) => handleInputCvc(e)}
          onFocus={(e) => handleInputFocus(e)}
        />
        <TextField
          className='inps'
          required
          value={name}
          InputProps={{
            className: 'inpColor',
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          type="tel"
          name="name"
          placeholder="Name"
          onChange={(e) => handleInputName(e)}
          onFocus={(e) => handleInputFocus(e)}
        />
        <Button
          className='payBtn'
          onClick={checking}
        >
          Pay
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Moto has been added to your library!
        </Alert>
      </Snackbar>
    </div>
    </div>
  );
};

export default Purchase;
