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
    <div className='container'>
      <Card className='card'>
        <CardContent>
          <div className='cards'>
            <Typography variant="h5" component="h5">
              <div className='text'>Tynai: +996(703)-81-15-73</div> 
              <br />
              Youtube:{" "}
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCzUYaZdrDfefH1vmzCMYfbA"
                className='hrefs'
              >
                Тынай Сманов
              </a>
              <br />
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
