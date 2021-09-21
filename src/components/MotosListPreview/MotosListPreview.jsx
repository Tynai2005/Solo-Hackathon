import React from "react";
import { useEffect } from "react";
import { useMotos } from "../../contexts/MotoContext";
import MotoCard from "../MotoCard/MotoCard";
import { Container } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles } from "@material-ui/core";
import './assets/MotosListPreview.css'
import { Link } from "react-router-dom";

const MotosListPreview = () => {
  const { getMotosData, MotosData, history } = useMotos();

  useEffect(() => {
    getMotosData();
  }, []);

  let counter = 0;

  return (
    <div className="containerOuter-preview">
      <Container className='container-list-preview'>
      <Grid className='seeMore'>
        <h2 style={{ color: "black"}}>
          All Motos
        </h2>
      </Grid>
      <Grid className='review'>
        {MotosData &&
          MotosData.map((Moto) => {
            if (counter <= 5) {
              counter++;
              return <MotoCard Moto={Moto} />;
            }
          })}
      </Grid>
      <Button
          variant="contained"
          className='see-more'
          onClick={() => {
            history.push("/Motoslist");
          }}
        >
          See More Motos...
        </Button>
        <br />
        <h1 className='linkToChat'>Join our free <Link to="/chat" >chat</Link></h1>
    </Container>
    </div>
  );
};

export default MotosListPreview;
