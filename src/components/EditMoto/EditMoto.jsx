import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMotos } from "../../contexts/MotoContext";
import './assets/EditMoto.css'

const EditMoto = () => {
  const { modal, MotoDetails, saveEditedMoto, toggleModal } = useMotos();
  const [priceRadios, setPriceRadios] = useState(false);
  let [editedMoto, setEditedMoto] = useState({
    name: MotoDetails.name,
    description: MotoDetails.description,
    brand: MotoDetails.brand,
    image: MotoDetails.image,
    price: MotoDetails.price,
    type: MotoDetails.type,
    comments: MotoDetails.comments,
    likes: MotoDetails.likes,
    wishlist: MotoDetails.wishlist,
    library: MotoDetails.library,
  });

  return (
    <Modal show={modal} className='modalMarg'>
      <Modal.Header>
        <Modal.Title>Redacting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input
            onChange={(e) => {
              setEditedMoto({ ...editedMoto, name: e.target.value });
              MotoDetails.name = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Name"
            value={MotoDetails.name}
          />
        </div>
        <div>
          <input
            onChange={(e) => {
              setEditedMoto({ ...editedMoto, description: e.target.value });
              MotoDetails.description = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Description"
            value={MotoDetails.description}
          />
        </div>
        <div>
          <input
            onChange={(e) => {
              setEditedMoto({ ...editedMoto, image: e.target.value });
              MotoDetails.image = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Photo"
            value={MotoDetails.image}
          />
        </div>
          <div>
            <input
              onChange={(e) => {
                setEditedMoto({ ...editedMoto, price: Number(e.target.value) });
                MotoDetails.price = e.target.value;
              }}
              type="number"
              name=""
              id=""
              placeholder="Price"
              value={MotoDetails.price}
            />
            <br />
          </div>
        <div>
          <div>
            Choose Moto type:
            <div>
              <input
                type="radio"
                name="typeRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, type: "Standard" });
                }}
              />
              Standard
            </div>
            <div>
              <input
                type="radio"
                name="typeRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, type: "Cruiser" });
                }}
              />
              Cruiser
            </div>
            <div>
              <input
                type="radio"
                name="typeRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, type: "Sport bike" });
                }}
              />
              Sport bike
            </div>
            <div>
              <input
                type="radio"
                name="typeRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, type: "Touring" });
                }}
              />
              Touring
            </div>
            <div>
              <input
                type="radio"
                name="typeRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, type: "Sport touring" });
                }}
              />
              Sport touring
            </div>
            <div>
              <input
                type="radio"
                name="typeRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, type: "Dual sport" });
                }}
              />
              Dual sport
            </div>
            <div>
              <input
                type="radio"
                name="typeRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, type: "Scooters" });
                }}
              />
              Scooters
            </div>
            <div>
              <input
                type="radio"
                name="typeRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, type: "Mopeds" });
                }}
              />
              Mopeds
            </div>
            <div>
              <input
                type="radio"
                name="typeRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, type: "Off-road" });
                }}
              />
              Off-road
            </div>
          </div>
          <div>
            Choose Moto brand:
            <div>
              <input
                type="radio"
                name="brandRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, brand: "Honda" });
                }}
              />
              Honda
            </div>
            <div>
              <input
                type="radio"
                name="brandRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, brand: "BMW" });
                }}
              />
              BMW
            </div>
            <div>
              <input
                type="radio"
                name="brandRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, brand: "Harley-Davidson" });
                }}
              />
              Harley-Davidson
            </div>
            <div>
              <input
                type="radio"
                name="brandRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, brand: "Kawasaki" });
                }}
              />
              Kawasaki
            </div>
            <div>
              <input
                type="radio"
                name="brandRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, brand: "Yamaha" });
                }}
              />
              Yamaha
            </div>
            <div>
              <input
                type="radio"
                name="brandRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, brand: "Triumph" });
                }}
              />
              Triumph
            </div>
            <div>
              <input
                type="radio"
                name="brandRadio"
                id=""
                onChange={() => {
                  setEditedMoto({ ...editedMoto, brand: "Suzuki" });
                }}
              />
              Suzuki
            </div>
          </div>  
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => saveEditedMoto(MotoDetails.id, editedMoto)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditMoto;
