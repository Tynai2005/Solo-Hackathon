import React, { useContext } from "react";
import axios from "axios";
import { MOTOS_API} from "../../helper/consts";
import { useState } from "react";
import { useEffect } from "react";
import { Container} from "@material-ui/core";
import { Card } from "react-bootstrap";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './assets/Library.css'
import firebase from 'firebase/app';
import { AuthContext } from "../../contexts/AuthContext";


const LibraryCard = () => {
  const [motosLibrary, setMotosLibrary] = useState([]);
  const {currentUser} = useContext(AuthContext)
  const [allDescr,setAllDescr] = useState(false)
  const [curMotId,setCurMotoId] = useState(null)
  const [canRender,setCanRender] = useState(false)

  const getMotos = async () => {
    const data = await firebase.firestore().collection('motos').get()
    const data2 = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    let library = []
    data2.map((moto) => {moto.library.map((email) => {if(email == currentUser.email){
      library.push(moto)
    }})})
    setMotosLibrary(library)
    setCanRender(true)
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
    {canRender ?
    <>
    <h2 className='libraryText'>Your garage</h2>
    {motosLibrary.length > 0 ? (
      <div className="containerOuterLibrary">
        <div className='containerLibrary'>
        {motosLibrary.map((Moto) => (
        <div>
          <Card className='libraryCard'>
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
      <div className='noMotoContainer'>
      <h2 className='noMoto'>There isn't Motos in your library...</h2>
      </div>
    )}</> : <h2 className='noMoto'>Loading...</h2>} 
    </>
  );
};

export default LibraryCard;
