import React from "react";
import axios from "axios";
import { MOTOS_API} from "../../helper/consts";
import { useState } from "react";
import { useEffect } from "react";
import { Container} from "@material-ui/core";
import { Card } from "react-bootstrap";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './assets/Library.css'

const LibraryCard = () => {
  const [motosLibrary, setMotosLibrary] = useState([]);
  const [allDescr,setAllDescr] = useState(false)
  const [curMotId,setCurMotoId] = useState(null)

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

  const handlerClose = async (id) => {
    await setCurMotoId(id)
    setAllDescr(false)
  }

  const handlerOpen = async (id) => {
    await setCurMotoId(id)
    setAllDescr(true)
  }

  return (
    <>
      <h2 className='libraryText'>Your garage</h2>
      {motosLibrary.length > 0 ? (
        <div className="containerOuter">
          <div className='container'>
          {motosLibrary.map((Moto) => (
          <div>
            <Card className='card'>
            <Card.Img variant="top" className='cardImg' src={Moto.image} />
            <Card.Body>
              <Card.Title>{Moto.name}</Card.Title>
              <div>{Moto.price}$</div>
              {Moto.description.length > 60
              ? 
                <>
                  <Card.Text>
                  {allDescr & Moto.id == curMotId ? 
                    <>{Moto.description}</> 
                    :
                    <>{Moto.description.slice(0, 60) + "..."}</>}
                  </Card.Text>
                  <div className='descr-div'>
                  {allDescr & Moto.id == curMotId ?
                    <ExpandLessIcon onClick={() => {handlerClose(Moto.id)}}/>
                    :
                    <ExpandMoreIcon onClick={() => {handlerOpen(Moto.id)}}/>}
                  </div>
                </> 
                :            
              <>{Moto.description}</>}
            </Card.Body>
          </Card>
          </div>
          ))}
        </div>
        </div>
      ) : (
        <h2 className='noMoto'>There isn't Motos in your library</h2>
      )}
    </>
  );
};

export default LibraryCard;
