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
        MotosData: action.payload.data,
        pages: Math.ceil(action.payload.headers["x-total-count"] / MotosCount),
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

  const [cartMotos, setCartMotos] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [canRender,setCanRender] = useState(false)

  let cart = [];
  let sum = 0

  const history = useHistory();
  const {currentUser} = useContext(AuthContext)

  const getMotosData = async (type) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_limit", MotosCount);
    history.push(`${history.location.pathname}?${search.toString()}`);
    const data = await axios(`${MOTOS_API}/${window.location.search}`);
    dispatch({
      type: ACTIONS.GET_MOTOS_DATA,
      payload: data,
    });
  };

  const deleteMoto = async (id) => {
    await axios.delete(`${MOTOS_API}/${id}`);
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
    const { data } = await axios(`${MOTOS_API}/${id}`);
    dispatch({
      type: ACTIONS.GET_MOTO_DETAILS,
      payload: data,
    });
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
        await axios.post(MOTOS_API, newMoto);
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
        const data = await axios.patch(`${MOTOS_API}/${id}`, editedMoto);
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
    console.log(editedMoto);
    const data = await axios.patch(`${MOTOS_API}/${id}`, editedMoto);
    getMotosData();
  };

  const changeId = (id) => {
    dispatch({
      type: ACTIONS.CHANGE_ID,
      payload: id,
    });
    history.push(`/Motodetails/${id}`);
  };

  const changetype = async (selectedtype) => {
    const { data } = await axios(MOTOS_API);
    console.log(data);
    let newData = data.filter((Moto) => Moto.type == selectedtype);
    dispatch({
      type: ACTIONS.GET_MOTOS_DATA,
      payload: newData,
    });
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
    const { data } = await axios(MOTOS_API);    
    data.map((eachMoto) => {
      eachMoto.wishlist.map((email) => {if(email == currentUser.email){console.log('yeah'); cart.push(eachMoto);sum += Number(eachMoto.price)}})
    })
    setCartMotos(cart)
    setTotalPrice(sum)
    setCanRender(true)
  };

  const deleteCartMoto = async (motoId) => {
    const { data } = await axios(`${MOTOS_API}/${motoId}`);
    const newdWishlist =  data.wishlist.filter((email) => (email != currentUser.email))
    data.wishlist = newdWishlist
    await axios.patch(`${MOTOS_API}/${motoId}`,data)
    await getMotosData();
    getMotoFromCart()
  }

  const toBuyNow = async (motoId) => {
    const { data } = await axios(`${MOTOS_API}/${motoId}`);
    data.library.push(currentUser.email)
    getMotosData()
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
    changetype,
    toggleComment,
    setIsAllMotos,
    toHome,
    toMotosList,
    getMotoFromCart,
    toBuyNow,
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
