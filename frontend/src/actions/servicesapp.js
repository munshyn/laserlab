import axios from "axios";
import {
  CREATE_SERVICE,
  GET_SERVICE,
  GET_ALL_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  USER_LOADED_SUCCESS,
} from "./types";

export const applyService = (serviceApp) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  const body = JSON.stringify(serviceApp);
  const { name, phone_number } = serviceApp;

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const isStudent = user.isStudent;
  const matrixNum = user.matrixNum;

  const updateUser = async () => {
    const userBody = JSON.stringify({
      name,
      phone_number,
    });

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/user/rud/${userId}/`,
        userBody,
        config
      );

      const updatedUser = {
        id: userId,
        email: user.email,
        name: name,
        role: user.role,
        phone_number: phone_number,
        isStudent: isStudent,
        matrixNum: matrixNum,
      };

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: updatedUser,
      });
    } catch (err) {
      console.error(err);
    }
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/servicesapp/lc/`,
      body,
      config
    );

    dispatch({
      type: CREATE_SERVICE,
      payload: res.data,
    });

    await updateUser();

    return "SUCCESS";
  } catch (err) {
    console.error(err);
    return "FAILED";
  }
};

export const getAllServicesApp = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "*/*",
    },
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const role = user.role;

  if (role === "RO" || role === "D") {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/servicesapp/lc/`,
        config
      );

      dispatch({
        type: GET_ALL_SERVICE,
        payload: res.data,
      });

      console.log(res.data);

      return res.data;
    } catch (err) {
      return "FAILED";
    }
  } else if (role === "LS") {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/servicesapp/lc/?staffId=${userId}`,
        config
      );

      dispatch({
        type: GET_ALL_SERVICE,
        payload: res.data,
      });

      return "SUCCESS";
    } catch (err) {
      return "FAILED";
    }
  } else if (role === "C") {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/servicesapp/lc/?userId=${userId}`,
        config
      );

      dispatch({
        type: GET_ALL_SERVICE,
        payload: res.data,
      });

      return "SUCCESS";
    } catch (err) {
      return "FAILED";
    }
  } else {
    return "Please login";
  }
};

// Function to retrieve the analysis report file from S3
export const getAnalysisReport = async (fileURL) => {
  try {
    const res = await axios.get(fileURL, { Accept: "application/pdf", responseType: 'blob' });
    return res.data;
  } catch (err) {
    throw new Error('Failed to retrieve the analysis report file.');
  }
};

export const getServiceApp = (appId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/servicesapp/rud/${appId}/`,
      config
    );

    dispatch({
      type: GET_SERVICE,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const updateServiceApp = (serviceApp, appId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/servicesapp/rud/${appId}/`,
      serviceApp,
      config
    );

    dispatch({
      type: UPDATE_SERVICE,
      payload: serviceApp,
    });

    return "SUCCESS";
  } catch (err) {
    return err.message;
  }
};

export const deleteServiceApp = (appId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/servicesapp/rud/${appId}/`,
      config
    );

    dispatch({
      type: DELETE_SERVICE,
      payload: { appId },
    });

    return "SUCCESS";
  } catch (err) {
    return "FAILED";
  }
};
