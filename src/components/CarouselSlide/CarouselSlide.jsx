import { Carousel } from "react-bootstrap";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, makeStyles } from "@material-ui/core";
import { useMotos } from "../../contexts/MotoContext";
import './assets/CarouselSlide.css'

const useStyles = makeStyles((theme) => ({
  carousel: {
    width: "100%",
    height: "100%",
  },
  slides: {
    height: "100%",
    width: "100%",
    objectFit: "fill",
  },
  btns: {
    backgroundColor: "#0099ff",
    color: "white",
    padding: "10px 30px",
  },
}));
const CarouselSlide = () => {
  const classes = useStyles();
  const { getMotosData, MotosData, changeId } = useMotos();

  useEffect(() => {
    getMotosData();
  }, []);

  return (
    <Container style={{ maxHeight: "800px", maxWidth: "1300px" }}>
      <Carousel className={classes.carousel}>
        <Carousel.Item className={classes.slides}>
          <img
            className="carousel-photo"
            src={MotosData[5]?.image}
            alt="First slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(MotosData[5].id)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className={classes.slides}>
          <img
            className="carousel-photo"
            src={MotosData[4]?.image}
            alt="Second slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(MotosData[4].id)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={classes.slides}>
          <img
            className="carousel-photo"
            src={MotosData[2]?.image}
            alt="Third slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(MotosData[2].id)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={classes.slides}>
          <img
            className="carousel-photo"
            src={MotosData[3]?.image}
            alt="Fourth slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(MotosData[3].id)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default CarouselSlide;
