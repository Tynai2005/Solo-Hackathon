import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { MOTOS_API, JSON_API_USERS } from "../../helper/consts";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  cardImg: {
    width: "230px",
    height: "230px",
    objectFit: "cover",
    position: "absolute",
    zIndex: "1",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    height: "100%",
  },
  content: {
    width: "230px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "10px !important",
  },

  MotoTitle: {
    textAlign: "center",
    color: "white",
    fontSize: "20px",
  },
  MotoCreator: {
    textAlign: "center",
    color: "grey",
    fontSize: "15px",
  },
  MotoDescr: {
    color: "white",
    fontSize: "15px",
  },
  noMoto: {
    color: "white",
    height: "80vh",
    textAlign: "center",
    marginTop: "20px",
  },
  libraryText: {
    color: "white",
    margin: "20px",
  },
  playBtn: {
    color: "white",
    backgroundColor: "green",
    border: "0",
    borderRadius: "5px",
    zIndex: "0",
    width: "100%",
  },
}));

const LibraryCard = () => {
  const [motosLibrary, setMotosLibrary] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  let library = [];
  const curUser = JSON.parse(localStorage.getItem("user"));
  const getMotos = async () => {
    const { data } = await axios(MOTOS_API);
    let library = []
    data.map((moto) => {moto.library.map((email) => {if(email == JSON.parse(localStorage.getItem('user'))){
      library.push(moto)
    }})})
    setMotosLibrary(library)
  };
  useEffect(() => {
    getMotos();
  }, []);

  return (
    <>
      <h2 className={classes.libraryText}>Your library</h2>
      {motosLibrary.length > 0 ? (
        <Container className={classes.container}>
          {motosLibrary.map((Moto) => (
            <div className="card">
              <img
                src={Moto.image}
                alt={Moto.name}
                className={classes.cardImg}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <div>
                    <Typography className={classes.MotoTitle}>
                      {Moto.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      className={classes.MotoCreator}
                    >
                      {Moto.creator}
                    </Typography>
                    <Typography className={classes.MotoDescr}>
                      {Moto.description.length > 60
                        ? Moto.description.slice(0, 60) + "..."
                        : Moto.description}
                    </Typography>
                  </div>
                  <Button className={classes.playBtn}>Play</Button>
                </CardContent>
              </div>
              {/* <CardMedia className={classes.cover} image={Moto.image} /> */}
            </div>
          ))}
        </Container>
      ) : (
        <h2 className={classes.noMoto}>There isn't Motos in your library</h2>
      )}
    </>
  );
};

export default LibraryCard;
