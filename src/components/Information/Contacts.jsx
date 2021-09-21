import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import './assets/Contacts.css'

const Contacts = () => {

  return (
    <div className='contactsContainer'>
        <div className='contactCard'>
            <div>
            <div className='text'>Tynai: <br /> +996(703)-81-15-73</div> 
              <div className='text'>
              Youtube:
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCzUYaZdrDfefH1vmzCMYfbA"
                className='hrefs'
              >
                Тынай Сманов
              </a>
              </div>
          </div>
        </div>
    </div>
  );
};

export default Contacts;
