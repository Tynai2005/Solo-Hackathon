import {
  Container,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import EjectIcon from "@material-ui/icons/Eject";
import './assets/Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <Container>
        <div className='iconsFooter'>
          <div className='icons1'>
            <a  href="#">
              <IconButton>
                <InstagramIcon className='icons' />
              </IconButton>
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UCzUYaZdrDfefH1vmzCMYfbA"
            >
              <IconButton>
                <YouTubeIcon className='icons' />
              </IconButton>
            </a>
          </div>
          <div className='icons2'>
            <IconButton onClick={() => window.scrollTo(0, 0)}>
              <EjectIcon className='icons' />
            </IconButton>
          </div>
        </div>
        <Typography className='text'>
          ©COPYRIGHT PROJECTOR COMPANY
        </Typography>
      </Container>
    </div>
  );
};

export default Footer;
