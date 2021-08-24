import React from "react";
import { useEffect } from "react";
import { useMotos } from "../../contexts/MotoContext";
import MotoCard from "../MotoCard/MotoCard";
import { Container } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles } from "@material-ui/core";
import './assets/MotosListPreview.css'

const MotosListPreview = () => {
  const { getMotosData, MotosData, history } = useMotos();

  useEffect(() => {
    getMotosData();
  }, []);

  let counter = 0;

  return (
    <div className="containerOuter">
      <Container className='container'>
      <Grid className='seeMore'>
        <h4 style={{ color: "white", fontFamily: "Noto Sans JP" }}>
          All Motos
        </h4>
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
          color="primary"
          onClick={() => {
            history.push("/Motoslist");
          }}
        >
          See More...
        </Button>
    </Container>
    </div>
  );
};

export default MotosListPreview;