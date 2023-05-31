import axios from "axios";
import {
  CREATE_EQUIPMENT,
  GET_EQUIPMENT,
  GET_ALL_EQUIPMENT,
  UPDATE_EQUIPMENT,
  DELETE_EQUIPMENT,
} from "./types";

export const addEquipment = (equipment) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  const body = JSON.stringify(equipment);

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/equipment/lc/`,
      body,
      config
    );

    dispatch({
      type: CREATE_EQUIPMENT,
      payload: res.data,
    });

    return "SUCCESS";
  } catch (err) {
    return "FAILED";
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

    return "SUCCESS";
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

    console.log(res.data.name)

    dispatch({
      type: GET_EQUIPMENT,
      payload: res.data,
    });

    return "SUCCESS";
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
    const res = await axios.put(
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
