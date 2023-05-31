import {
  CREATE_SERVICE,
  GET_SERVICE,
  GET_ALL_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
} from "../actions/types";

const initialState = [];

export default function (servicesApp = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SERVICE:
      return [...servicesApp, payload];

    case GET_ALL_SERVICE:
      return payload;

    case GET_SERVICE:
      return payload;

    case UPDATE_SERVICE:
      return servicesApp.map((serviceApp) => {
        if (serviceApp.appId === payload.appId) {
          return {
            ...serviceApp,
            ...payload,
          };
        } else {
          return serviceApp;
        }
      });

    case DELETE_SERVICE:
      return servicesApp.filter(({ appId }) => appId !== payload.appId);

    default:
      return servicesApp;
  }
}
