import React, { useEffect } from "react";
import CarouselSlide from "../CarouselSlide/CarouselSlide";
import { Link } from "react-router-dom";
import { useMotos } from "../../contexts/MotoContext";
import EditMoto from "../EditMoto/EditMoto";
import MotosListPreview from "../MotosListPreview/MotosListPreview";
import { Container } from "@material-ui/core";

const Home = () => {
  const { modal } = useMotos();
  return (
    <Container>
      <CarouselSlide />

      {modal ? <EditMoto /> : null}

      <MotosListPreview />

    </Container>
  );
};

export default Home;
