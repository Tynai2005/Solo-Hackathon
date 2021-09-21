import { Container, makeStyles, TextField, Button } from "@material-ui/core";

import React from "react";
import { useState } from "react";
import { useMotos } from "../../contexts/MotoContext";
import { RadioGroup } from "@material-ui/core";
import './assets/AddMoto.css'

const AddMoto = () => {
  const { addNewMoto, history } = useMotos();
  const [priceRadios, setPriceRadios] = useState(false);

  const [motoInfo, setMotoInfo] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    type: "",
    brand:"",
    comments: [],
    likes: [],
    wishlist: [],
    library: [],
  });
  return (
    <Container
    className='containerAddMoto'
    >
      <div className='text'>
        <h1>Moto creator</h1>
        <br />

        <input
          onChange={(e) => {
            setMotoInfo({ ...motoInfo, name: e.target.value });
          }}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          onChange={(e) => {
            setMotoInfo({ ...motoInfo, description: e.target.value });
          }}
          type="text"
          placeholder="Description"
        />
        <br />
        <input
          onChange={(e) => {
            setMotoInfo({ ...motoInfo, image: e.target.value });
          }}
          type="text"
          placeholder="Image"
        />
        <br />
        <div>
            <input
              onChange={(e) => {
                setMotoInfo({ ...motoInfo, price: Number(e.target.value) });
              }}
              type="number"
              placeholder="Price($)"
            />
            <br />
          </div>
        <div>
          <p> Choose moto's type:</p>

          <div>
            <input
              type="radio"
              name="typeRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, type: "Standard" });
              }}
            />
            Standard
          </div>
          <div>
            <input
              type="radio"
              name="typeRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, type: "Cruiser" });
              }}
            />
            Cruiser
          </div>
          <div>
            <input
              type="radio"
              name="typeRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, type: "Sport bike" });
              }}
            />
            Sport bike
          </div>
          <div>
            <input
              type="radio"
              name="typeRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, type: "Touring" });
              }}
            />
            Touring
          </div>
          <div>
            <input
              type="radio"
              name="typeRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, type: "Sport touring" });
              }}
            />
            Sport touring
          </div>
          <div>
            <input
              type="radio"
              name="typeRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, type: "Dual sport" });
              }}
            />
            Dual sport
          </div>
          <div>
            <input
              type="radio"
              name="typeRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, type: "Scooters" });
              }}
            />
            Scooters
          </div>
          <div>
            <input
              type="radio"
              name="typeRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, type: "Mopeds" });
              }}
            />
            Mopeds
          </div>
          <div>
            <input
              type="radio"
              name="typeRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, type: "Off-road" });
              }}
            />
            Off-road
          </div>
        </div>
        <div>
          <p> Choose moto's brand:</p>

          <div>
            <input
              type="radio"
              name="brandRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, brand: "Honda" });
              }}
            />
            Honda
          </div>
          <div>
            <input
              type="radio"
              name="brandRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, brand: "BMW" });
              }}
            />
            BMW
          </div>
          <div>
            <input
              type="radio"
              name="brandRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, brand: "Harley-Davidson" });
              }}
            />
            Harley-Davidson
          </div>
          <div>
            <input
              type="radio"
              name="brandRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, brand: "Kawasaki" });
              }}
            />
            Kawasaki
          </div>
          <div>
            <input
              type="radio"
              name="brandRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, brand: "Yamaha" });
              }}
            />
            Yamaha
          </div>
          <div>
            <input
              type="radio"
              name="brandRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, brand: "Triumph" });
              }}
            />
            Triumph
          </div>
          <div>
            <input
              type="radio"
              name="brandRadio"
              id=""
              onChange={() => {
                setMotoInfo({ ...motoInfo, brand: "Suzuki" });
              }}
            />
            Suzuki
          </div>
        </div>
        <br />
        <Button
          className='btns'
          variant="secondary"
          onClick={() => history.push("/Motoslist")}
        >
          Close
        </Button>
        <Button
          onClick={() => {
            addNewMoto(motoInfo);
          }}
          className='btns'
        >
          Add
        </Button>
      </div>
    </Container>
  );
};

export default AddMoto;
