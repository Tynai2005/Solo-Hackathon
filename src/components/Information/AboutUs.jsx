import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import './assets/AboutUs.css'

const AboutUs = () => {
  return (
    <div className='mainContainer'>
      <Grid className='mainGrid'>
        <div className='mainImg'>
          <Typography className='mainText'>WELCOME</Typography>
        </div>
      </Grid>
      <Container className='container'>
        <Grid className='grids'>
          <h2 >About De Moto</h2>
          <h2 className='text'>
            Hello there! Here is information about man, who worked on this
            project. This project's name is "De Moto"
          </h2>
          <div className='text'>
              <div className='information'>
              <img className='imgs' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiewXcyqeDVxaqnyVt9fWQJ8FWlm3YZ0yY6A&usqp=CAU" alt="" />
                <p className='text'>Name: Tyynai</p>
                <p className='text'>Age: 16</p>
                <p className='text'>Languages: JS,Python</p>
                <p className='text'>Nationality: Kyrgyz</p>
              </div>
            </div>
        </Grid>
        <Grid className='grids'>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutUs;
