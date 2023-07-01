import axios from "axios";
import {
  CREATE_EQUIPMENT,
  GET_EQUIPMENT,
  GET_ALL_EQUIPMENT,
  UPDATE_EQUIPMENT,
  DELETE_EQUIPMENT,
} from "./types";

export const addEquipment = (equipment) => async (dispatch) => {
  //Function for add equipment
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`, //Requires authentication to call
      Accept: "application/json",
    },
  };

  const body = JSON.stringify(equipment); //Stringify the JSON object before
  //sending the data to backend
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/equipment/lc/`, //Call the API that is created
      body, //in the backend
      config
    );

    dispatch({
      type: CREATE_EQUIPMENT, //Send retrieved data to
      payload: res.data, //reducers to update the state
    });

    return "SUCCESS"; //Returns Success message
  } catch (err) {
    return "FAILED"; //Returns Failed message
  }
};

export const getAllEquipment = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "*/*",
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/equipment/lc/`,
      config
    );

    dispatch({
      type: GET_ALL_EQUIPMENT,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    return "FAILED";
  }
};

export const getEquipment = (equipmentId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/equipment/rud/${equipmentId}/`,
      config
    );

    dispatch({
      type: GET_EQUIPMENT,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    return "FAILED";
  }
};

export const updateEquipment = (equipment, equipmentId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  const body = JSON.stringify(equipment);

  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/equipment/rud/${equipmentId}/`,
      body,
      config
    );

    dispatch({
      type: UPDATE_EQUIPMENT,
      payload: equipment,
    });

    return "SUCCESS";
  } catch (err) {
    return "FAILED";
  }
};

export const deleteEquipment = (equipmentId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/equipment/rud/${equipmentId}/`,
      config
    );

    dispatch({
      type: DELETE_EQUIPMENT,
      payload: { equipmentId },
    });

    return "SUCCESS";
  } catch (err) {
    return "FAILED";
  }
};