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
          <h2 style={{ color: "white" }}>About us</h2>
          <Typography className='text' style={{ fontSize: "20px" }}>
            Hello there! Here is information about team, that worked on this
            project. This team's name is projector. Our team consists of 2
            participants: Amantay and Tynai. There is information about us, look
            below.
          </Typography>
        </Grid>
        <Grid className='grids'>
          <h2 style={{ color: "white" }}>Participants</h2>
          <div className='part'>
            <div className='left'>
              <img
                className='imgs'
                src="https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              />
              <div className='information'>
                <p className='text'>Name: Tynai</p>
                <p className='text'>Age: 16</p>
                <p className='text'>Language: JS, Python</p>
                <p className='text'>Nationality: Kyrgyz</p>
              </div>
            </div>
            <div className='left'>
              <img
                className='imgs'
                src="https://www.meme-arsenal.com/memes/6bb1c05df00b0dfd4fdda878e5858d29.jpg"
              />
              <div className='information'>
                <p className='text'>Name: Amantay</p>
                <p className='text'>Age: 16</p>
                <p className='text'>Language: JS</p>
                <p className='text'>Nationality: Kyrgyz</p>
              </div>
            </div>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutUs;
