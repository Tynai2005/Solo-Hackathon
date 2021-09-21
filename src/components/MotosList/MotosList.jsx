import React, { useContext } from "react";
import { useEffect } from "react";
import { useMotos } from "../../contexts/MotoContext";
import MotoCard from "../MotoCard/MotoCard";
import { Link } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";
import {
  Grid,
  makeStyles,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
import { AuthContext, useAuth } from "../../contexts/AuthContext";
import { Pagination } from "@material-ui/lab";
import { Carousel, Container } from "react-bootstrap";
import EditMoto from "../EditMoto/EditMoto";
import { getCurrentPage } from "../../helper/functions";
import { useState } from "react";
import './assets/MotoList.css'
import { ACTIONS } from "../../helper/consts";
import firebase from 'firebase/app';


const MotosList = () => {
  const { currentUser,isAdmin } = useContext(AuthContext);
  const { getMotosData, MotosData, modal, pages, history, dispatch,searchTxt } = useMotos();
  const [page, setPage] = useState(getCurrentPage());
  const [filterMenu, setFilterMenu] = useState(false);
  const [typee, setType] = useState(getType());
  const [brandd, setBrand] = useState(getBrand());
  const [minPrice, setMinPrice] = useState(getMinPrice());
  const [maxPrice, setMaxPrice] = useState(getMaxPrice());

  const [type,setT]  = useState('')
  const [brand,setB] = useState('')

  
  useEffect(() => {
    getMotosData();
    window.scrollTo(0, 0);
  }, []);
      
  function getType() {
    const search = new URLSearchParams(history.location.search);
    return search.get("type");
  }

  function getBrand() {
    const search = new URLSearchParams(history.location.search);
    return search.get("brand");
  }

  function getMinPrice() {
    const search = new URLSearchParams(history.location.search);
    return search.get("price_gte");
  }

  function getMaxPrice() {
    const search = new URLSearchParams(history.location.search);
    return search.get("price_lte");
  }

  const changetype = async (e) => {

    const search = new URLSearchParams(history.location.search);

    if (e.target.value == "all") {
      setT('')
      
      search.delete("type");
      search.set("_page", "1");
      history.push(`${history.location.pathname}?${search.toString()}}`);
      setType(e.target.value);
      if (brand){
        const data = await firebase.firestore().collection('motos').where('brand','==',brand).get()
        const data2 = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        dispatch({
          type: ACTIONS.GET_MOTOS_DATA,
          payload: data2,
        });
        return
      }
      getMotosData()
      return;
    }

    search.set("type", e.target.value);
    search.set("_page", "1");
    history.push(`${history.location.pathname}?${search.toString()}`);
    setType(e.target.value);
    setT(e.target.value)
    if (brand){
      const data = await firebase.firestore().collection('motos').where('type','==',e.target.value).where('brand','==',brand).get()
      const data2 = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      dispatch({
        type: ACTIONS.GET_MOTOS_DATA,
        payload: data2,
      });
      return
    }
    const data = await firebase.firestore().collection('motos').where('type','==',e.target.value).get()
    const data2 = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    dispatch({
      type: ACTIONS.GET_MOTOS_DATA,
      payload: data2,
    });
  };

  const changebrand = async (e) => {

    const search = new URLSearchParams(history.location.search);

    if (e.target.value == "all") {
      setB('')
      search.delete("brand");
      search.set("_page", "1");
      history.push(`${history.location.pathname}?${search.toString()}}`);
      setBrand(e.target.value);
      if (type){
        const data = await firebase.firestore().collection('motos').where('type','==',type).get()
        const data2 = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        dispatch({
          type: ACTIONS.GET_MOTOS_DATA,
          payload: data2,
        });
        return
      }
      getMotosData()
      return;
    }

    search.set("brand", e.target.value);
    search.set("_page", "1");
    history.push(`${history.location.pathname}?${search.toString()}`);
    setBrand(e.target.value);
    setB(e.target.value)
    if (type){
      const data = await firebase.firestore().collection('motos').where('brand','==',e.target.value).where('type','==',type).get()
      const data2 = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      dispatch({
        type: ACTIONS.GET_MOTOS_DATA,
        payload: data2,
      });
      return
    }
    const data = await firebase.firestore().collection('motos').where('brand','==', e.target.value).get()
    const data2 = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    dispatch({
      type: ACTIONS.GET_MOTOS_DATA,
      payload: data2,
    });
  };

  const changeMinPrice = (value) => {
    console.log(value);
    const search = new URLSearchParams(history.location.search);
    search.set("price_gte", value);
    console.log(search);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getMotosData();
    setMinPrice(value);
  };

  const changeMaxPrice = (value) => {
    console.log(value);
    const search = new URLSearchParams(history.location.search);
    search.set("price_lte", value);
    console.log(search);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getMotosData();
    setMaxPrice(value);
  };

  const resetPrice = () => {
    const search = new URLSearchParams(history.location.search);
    search.delete("price_gte");
    search.delete("price_lte");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getMotosData();
    setMinPrice(getMinPrice());
    setMaxPrice(getMaxPrice());
  };


  const handlePage = (e, page) => {
    const search = new URLSearchParams(window.location.search);
    search.set("_page", page);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getMotosData();
    setPage(page);
  };

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <div className="containerOuter-list">
      <Container className='container-list'>
      {modal ? <EditMoto /> : null}
      <Grid
        className='grids-list '
        style={{ justifyContent: "space-between", margin: "20px 0" }}
      >
        <div className='sort-menu-list'>
          <button className='sort-button' onClick={() => setFilterMenu(!filterMenu)}>Filter</button>
          {filterMenu ? (
            <div className='menuMobile-list'>
              <RadioGroup value={typee} style={{display:'inline'}} onChange={changetype}>
                <h5>By type:</h5>
                <FormControlLabel
                  className='menuItem'
                  value="Standard"
                  control={<Radio />}
                  label="Standard"
                />
                <FormControlLabel
                  className='menuItem'
                  value="Cruiser"
                  control={<Radio />}
                  label="Cruiser"
                />
                <FormControlLabel
                  className='menuItem'
                  value="Sport bike"
                  control={<Radio />}
                  label="Sport bike"
                />
                <FormControlLabel
                  className='menuItem'
                  value="Touring"
                  control={<Radio />}
                  label="Touring"
                />
                <FormControlLabel
                  className='menuItem'
                  value="Sport touring"
                  control={<Radio />}
                  label="Sport touring"
                />
                <FormControlLabel
                  className='menuItem'
                  value="Dual sport"
                  control={<Radio />}
                  label="Dual sport"
                />
                <FormControlLabel
                  className='menuItem'
                  value="Scooters"
                  control={<Radio />}
                  label="Scooters"
                />
                <FormControlLabel
                  className='menuItem'
                  value="Mopeds"
                  control={<Radio />}
                  label="Mopeds"
                />
                <FormControlLabel
                  className='menuItem'
                  value="Off-road"
                  control={<Radio />}
                  label="Off-road"
                />
                <FormControlLabel
                  className='menuItem'
                  value="all"
                  control={<Radio />}
                  label="All"
                />
              </RadioGroup>
              <div>
              <RadioGroup value={brandd} style={{display:'inline'}} onChange={changebrand}>
                <h5>By brand:</h5>
                <FormControlLabel
                  value="Honda"
                  control={<Radio />}
                  label="Honda"
                />
                <FormControlLabel
                  value="BMW"
                  control={<Radio />}
                  label="BMW"
                />
                <FormControlLabel
                  value="Harley-Davidson"
                  control={<Radio />}
                  label="Harley-Davidson"
                />
                <FormControlLabel
                  value="Kawasaki"
                  control={<Radio />}
                  label="Kawasaki"
                />
                <FormControlLabel
                  value="Yamaha"
                  control={<Radio />}
                  label="Yamaha"
                />
                <FormControlLabel
                  value="Triumph"
                  control={<Radio />}
                  label="Triumph"
                />
                <FormControlLabel
                  value="Suzuki"
                  control={<Radio />}
                  label="Suzuki"
                />
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="All"
                />
              </RadioGroup>
              </div>
              {/* <h5>By Price:</h5>
              <div className='mobilePriceFilter'>
                <TextField
                  className='priceInputs'
                  value={minPrice}
                  onChange={(e) => changeMinPrice(e.target.value)}
                  type="number"
                  label="Min Price($)"
                  defaultValue="0"
                />
                <TextField
                  className='priceInputs'
                  value={maxPrice}
                  onChange={(e) => changeMaxPrice(e.target.value)}
                  type="number"
                  label="Max Price($)"
                  defaultValue="0"
                />
              </div>
              <div>
                <Button variant="outlined" onClick={resetPrice}>
                  Reset Price Filter
                </Button>
              </div> */}
            </div>
          ) : null}
        </div>
        {isAdmin ? (
          <Link to="/addMoto" className='addMoto'>
            <Button variant="contained" className='addBtn'>
              Add Moto
            </Button>
          </Link> 
        ) : null} 
      </Grid>
      <Grid className='grids-list'>
        {MotosData?.length > 0 ? (
          MotosData.map((Moto) => {
            if(!Moto){ return <MotoCard Moto={Moto} />}
            else if (
              Moto.name.toLowerCase().includes(searchTxt.toLowerCase())
              ||
              Moto.description.toLowerCase().includes(searchTxt.toLowerCase())
              ||
              Moto.type.toLowerCase().includes(searchTxt.toLowerCase())
              ||
              Moto.brand.toLowerCase().includes(searchTxt.toLowerCase())
              ){ return <MotoCard Moto={Moto} />}
            else{
              return <h2 className='sorryH1'>Loading...</h2>
            }
          })
        ) : (
          <h2 className='sorryH1'>Sorry, there are no such Motos...</h2>
        )}
      </Grid>
      <div style={{ margin: "20px auto" }}>
        <Pagination
          size="large"
          color="secondary"
          count={pages}
          variant="outlined"
          shape="rounded"
          page={+page}
          onChange={handlePage}
        />
      </div>
    </Container>
    </div>
  );
};

export default MotosList;
