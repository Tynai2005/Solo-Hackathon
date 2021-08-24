import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext, useAuth } from "../../contexts/AuthContext";
import { useMotos } from "../../contexts/MotoContext";
import './assets/MotoCard.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const MotoCard = ({ Moto }) => {
  const { deleteMoto, setEditMotoInfo, history } = useMotos();
  const { currentUser,isAdmin } = useContext(AuthContext);


  return (
    <div className="Moto-card" style={{ marginBottom: "30px" }}>
      <div
        className="Moto-img-div"
        onClick={() => {
          history.push(`Motodetails/${Moto.id}`);
        }}
      >
        <img
          className="Moto-card-img"
          src={Moto.image}
          alt={`${Moto.name} img`}
        />
      </div>
      <div className="Moto-card-info">
        <div>
          {Moto.name}
        </div>
        <div>{Moto.brand}</div>
        <div>
          {Moto.price == 0 ? "Free to play" : Moto.price + "$"}
        </div>
        {currentUser && isAdmin ? (
          <div>
            <DeleteIcon  
              className='deleteButton'
              onClick={() => deleteMoto(Moto.id)}
            />

            <EditIcon 
              className='editButton'
              onClick={() => setEditMotoInfo(Moto.id)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MotoCard;
