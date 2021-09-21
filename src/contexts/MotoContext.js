import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { ACTIONS, MOTOS_API, JSON_API_USERS } from "../helper/consts";
import { AuthContext } from "./AuthContext";
import firebase from 'firebase/app';


export const MotoContext = createContext();

export const useMotos = () => useContext(MotoContext);

const INIT_STATE = {
  MotosData: [],
  MotoDetails: {},
  modal: false,
  id: null,
  pages: 1,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_MOTO_DETAILS:
      return { ...state, MotoDetails: action.payload };
    case ACTIONS.GET_MOTOS_DATA:
      return {
        ...state,
        MotosData: action.payload,
        // pages: Math.ceil(action.payload.headers["x-total-count"] / MotosCount),
      };
    case ACTIONS.MODAL:
      return { ...state, modal: action.payload };
    case ACTIONS.CHANGE_ID:
      return { ...state, id: action.payload };
    case ACTIONS.GET_MOTOS:
      return { ...state, MotosData: action.payload };
    default:
      return state;
  }
};

let MotosCount = 6;

const MotoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [isAllMotos, setIsAllMotos] = useState(false);
  const [searchTxt,setSearchTxt] = useState('')
  const [cartMotos, setCartMotos] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [canRender,setCanRender] = useState(false)
  const [buyNow,toBuyNow] = useState('')

  const history = useHistory();
  const {currentUser} = useContext(AuthContext)

  const getMotosData = async (type) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_limit", MotosCount);
    history.push(`${history.location.pathname}?${search.toString()}`);
    const data = await firebase.firestore().collection('motos').get()
    const data2 = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    dispatch({
      type: ACTIONS.GET_MOTOS_DATA,
      payload: data2,
    });
  };

  const deleteMoto = async (id) => {
    firebase.firestore().collection('motos').doc(id).delete()
    getMotosData();
  };

  const toggleModal = () => {
    dispatch({
      type: ACTIONS.MODAL,
      payload: !state.modal,
    });
  };

  const setEditMotoInfo = async (id) => {
    await getMotoDetails(id);
    dispatch({
      type: ACTIONS.MODAL,
      payload: true,
    });
  };

  const getMotoDetails = async (id) => {
    const data = await firebase.firestore().collection('motos').get()
    const data2 = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    data2.map( moto => {if(moto.id == id){
      dispatch({
        type: ACTIONS.GET_MOTO_DETAILS,
        payload: moto,
      });
    }} )
  };

  const addNewMoto = async (newMoto) => {
    if (
      newMoto.brand.trim().length > 0 &&
      newMoto.description.trim().length > 0 &&
      newMoto.type.trim().length > 0 &&
      newMoto.image.trim().length > 0 &&
      newMoto.name.trim().length > 0
    ) {
      if (Number(newMoto.price) > 0) {
        firebase.firestore().collection('motos').add(newMoto)
        await getMotosData();
        history.push("/Motoslist");
      } else {
        alert("The price cannot be negative or zero ");
      }
    } else {
      alert("Fill all the fields");
    }
  };

  const saveEditedMoto = async (id, editedMoto) => {
    console.log(editedMoto);
    if (
      editedMoto.brand.trim().length > 0 &&
      editedMoto.description.trim().length > 0 &&
      editedMoto.type.trim().length > 0 &&
      editedMoto.image.trim().length > 0 &&
      editedMoto.name.trim().length > 0
    ) {
      if (Number(editedMoto.price) > 0) {
        firebase.firestore().collection('motos').doc(id).update(editedMoto)
        toggleModal();
        getMotosData();
      } else {
        alert("The price cannot be negative or zero");
      }
    } else {
      alert("Fill in all the fields");
    }
  };

  const toggleComment = async (id, editedMoto) => {
    console.log(editedMoto,id);
    await firebase.firestore().collection('motos').doc(id).update(Object.assign({}, editedMoto))
    getMotosData();
  };

  const changeId = (id) => {
    dispatch({
      type: ACTIONS.CHANGE_ID,
      payload: id,
    });
    history.push(`/Motodetails/${id}`);
  };

  const toHome = () => {
    setIsAllMotos(false);
    history.push("/Motoslist");
  };

  const toMotosList = () => {
    setIsAllMotos(true);
    history.push("/");
  };

  const getMotoFromCart = async () => {
    let cart = [];
    let sum = 0
    await getMotosData()  
    state.MotosData.map((eachMoto) => {
      eachMoto.wishlist.map((email) => {if(email == currentUser.email){cart.push(eachMoto);sum += Number(eachMoto.price)}})
    })
    setCartMotos(cart)
    setTotalPrice(sum)
    setCanRender(true)
  };

  const deleteCartMoto = async (motoId) => {
    await getMotoDetails(motoId)
    const newdWishlist =  state.MotoDetails?.wishlist?.filter((email) => (email != currentUser.email))
    const newData = JSON.parse(JSON.stringify(state.MotoDetails))
    newData.wishlist = newdWishlist
    await firebase.firestore().collection('motos').doc(motoId).update(newData)
    await getMotosData();
    getMotoFromCart()
    console.log('complete');
  }

  const values = {
    getMotosData,
    addNewMoto,
    deleteCartMoto,
    deleteMoto,
    setEditMotoInfo,
    toggleModal,
    getMotoDetails,
    saveEditedMoto,
    changeId,
    toggleComment,
    setIsAllMotos,
    toHome,
    toMotosList,
    getMotoFromCart,
    toBuyNow,
    dispatch,
    setSearchTxt,
    setCanRender,
    buyNow,
    searchTxt,
    canRender,
    totalPrice,
    cartMotos,
    isAllMotos,
    pages: state.pages,
    history,
    id: state.id,
    MotosData: state.MotosData,
    modal: state.modal,
    MotoDetails: state.MotoDetails,
  };
  return <MotoContext.Provider value={values}>{children}</MotoContext.Provider>;
};

export default MotoContextProvider;
