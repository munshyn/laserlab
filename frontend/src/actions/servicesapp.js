import axios from "axios";
import {
  CREATE_SERVICE,
  GET_SERVICE,
  GET_ALL_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  USER_LOADED_SUCCESS,
} from "./types";

export const applyService =
  (serviceApp, name, phone_number) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const body = JSON.stringify(serviceApp);
    const userbody = JSON.stringify({ name, phone_number });

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (serviceApp.appType == "Rental") {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/service/rental/lc/`,
          body,
          config
        );

        const userres = await axios.put(
          `${process.env.REACT_APP_API_URL}/auth/rud/${userId}/`,
          userbody,
          config
        );

        dispatch({
          type: CREATE_SERVICE,
          payload: res.data,
        });

        const updatedUser = {
          id: userId,
          email: user.email,
          name: name,
          role: user.role,
          phone_number: phone_number,
        }

        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: updatedUser,
        });

        return "SUCCESS";
      } catch (err) {
        return "FAILED";
      }
    } else if (serviceApp.appType == "Sample") {
      console.log(body)
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/service/sample/lc/`,
          body,
          config
        );

        const userres = await axios.put(
          `${process.env.REACT_APP_API_URL}/auth/rud/${userId}/`,
          userbody,
          config
        );

        dispatch({
          type: CREATE_SERVICE,
          payload: res.data,
        });

        const updatedUser = {
          id: userId,
          email: user.email,
          name: name,
          role: user.role,
          phone_number: phone_number,
        }

        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: updatedUser,
        });

        return "SUCCESS";
      } catch (err) {
        return "FAILED";
      }
    } else {
      return "Please specify the service type";
    }
  };

export const getAllServicesApp = (appType) => async (dispatch) => {
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

  if (role == "RO") {
    if (appType == "Rental") {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/service/rental/lc/`,
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
    } else if (appType == "Sample") {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/service/sample/lc/`,
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
      return "Please specify the application type.";
    }
  } else if (role == "LS") {
    if (appType == "Rental") {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/service/rental/lc/?isApproved=1`,
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
    } else if (appType == "Sample") {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/service/sample/lc/?isApproved=1`,
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
      return "Please specify the application type.";
    }
  } else if (role == "STUDENT") {
    if (appType == "Rental") {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/service/rental/lc/?userId=${userId}`,
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
    } else if (appType == "Sample") {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/service/sample/lc/?userId=${userId}`,
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
      return "Please specify the application type.";
    }
  } else {
    return "Please login";
  }
};

export const getServiceApp = (appId, appType) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  if (appType == "Rental") {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/service/rental/rud/${appId}/`,
        config
      );

      dispatch({
        type: GET_SERVICE,
        payload: res.data,
      });

      return "SUCCESS";
    } catch (err) {
      return "FAILED";
    }
  } else if (appType == "Sample") {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/service/sample/rud/${appId}/`,
        config
      );

      dispatch({
        type: GET_SERVICE,
        payload: res.data,
      });

      return "SUCCESS";
    } catch (err) {
      return "FAILED";
    }
  } else {
    return "Please specify application type";
  }
};

export const updateServiceApp = (serviceApp, appId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  const body = JSON.stringify(serviceApp);

  const appType = serviceApp.appType;

  if (appType == "Rental") {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/service/rental/rud/${appId}/`,
        body,
        config
      );

      dispatch({
        type: UPDATE_SERVICE,
        payload: serviceApp,
      });

      return "SUCCESS";
    } catch (err) {
      return "FAILED";
    }
  } else if (appType == "Sample") {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/service/sample/rud/${appId}/`,
        body,
        config
      );

      dispatch({
        type: UPDATE_SERVICE,
        payload: serviceApp,
      });

      return "SUCCESS";
    } catch (err) {
      return "FAILED";
    }
  } else {
    return "Please specify application type";
  }
};

export const deleteServiceApp = (appId, appType) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  if (appType == "Rental") {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/service/rental/rud/${appId}/`,
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
  } else if (appType == "Sample") {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/service/sample/rud/${appId}/`,
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
  } else {
    return "Please specify application type";
  }
};
