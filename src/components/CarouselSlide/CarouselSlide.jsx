import { Carousel } from "react-bootstrap";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container} from "@material-ui/core";
import { useMotos } from "../../contexts/MotoContext";
import './assets/CarouselSlide.css'

const CarouselSlide = () => {
  const { getMotosData, MotosData, changeId } = useMotos();

  useEffect(() => {
    getMotosData();
  }, []);

  return (
    <Container >
      <h2 className='about-us' >Welcome to De Moto. You can buy motorcycles of any brand and type from <br /> us. We have been delighting motorcycle amateurs, professional <br /> motorcycle riders, extreme sportsmen since 1985.</h2>
      <Carousel className='carousel'>
        <Carousel.Item className='slides'>
          <img
            className="carousel-photo"
            src={MotosData[4]?.image}
            alt="Second slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className='btns' onClick={() => changeId(MotosData[4].id)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='slides'>
          <img
            className="carousel-photo"
            src={MotosData[2]?.image}
            alt="Third slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className='btns' onClick={() => changeId(MotosData[2].id)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='slides'>
          <img
            className="carousel-photo"
            src={MotosData[3]?.image}
            alt="Fourth slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className='btns' onClick={() => changeId(MotosData[3].id)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default CarouselSlide;
