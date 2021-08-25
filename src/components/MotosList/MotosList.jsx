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

const MotosList = () => {
  const { currentUser,isAdmin } = useContext(AuthContext);
  const { getMotosData, MotosData, modal, pages, history } = useMotos();
  const [page, setPage] = useState(getCurrentPage());
  const [sortMenu, setSortMenu] = useState(false);
  const [type, setType] = useState(getType());
  const [brand, setBrand] = useState(getBrand());
  const [minPrice, setMinPrice] = useState(getMinPrice());
  const [maxPrice, setMaxPrice] = useState(getMaxPrice());
  
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
    return search.get("type");
  }

  function getMinPrice() {
    const search = new URLSearchParams(history.location.search);
    return search.get("price_gte");
  }

  function getMaxPrice() {
    const search = new URLSearchParams(history.location.search);
    return search.get("price_lte");
  }

  const changetype = (e) => {
    if (e.target.value == "all") {
      const search = new URLSearchParams(history.location.search);
      search.delete("type");
      search.set("_page", "1");
      history.push(`${history.location.pathname}?${search.toString()}}`);
      getMotosData();
      setType(e.target.value);
      return;
    }
    const search = new URLSearchParams(history.location.search);
    search.set("type", e.target.value);
    search.set("_page", "1");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getMotosData();
    setType(e.target.value);
  };

  const changebrand = (e) => {
    if (e.target.value == "all") {
      const search = new URLSearchParams(history.location.search);
      search.delete("brand");
      search.set("_page", "1");
      history.push(`${history.location.pathname}?${search.toString()}}`);
      getMotosData();
      setBrand(e.target.value);
      return;
    }
    const search = new URLSearchParams(history.location.search);
    search.set("brand", e.target.value);
    search.set("_page", "1");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getMotosData();
    setBrand(e.target.value);
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
    <div className="containerOuter">
      <Container className='container'>
      {modal ? <EditMoto /> : null}
      <Grid
        className='grids'
        style={{ justifyContent: "space-between", margin: "20px 0" }}
      >
        <div>
          <button className='sort-button' onClick={() => setSortMenu(!sortMenu)}>Sort {'&'} Filter</button>
          {sortMenu ? (
            <div className='menuMobile'>
              <RadioGroup value={type} style={{display:'inline'}} onChange={changetype}>
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
              <RadioGroup value={brand} style={{display:'inline'}} onChange={changebrand}>
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
              <h5>By Price:</h5>
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
              </div>
            </div>
          ) : null}
        </div>
        {currentUser && isAdmin ? (
          <Link to="/addMoto" className='addMoto'>
            <Button variant="contained" className='addBtn'>
              Add Moto
            </Button>
          </Link> 
        ) : null} 
      </Grid>
      <Grid className='grids'>
        {MotosData.length > 0 ? (
          MotosData.map((Moto) => {
            return <MotoCard Moto={Moto} />;
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
