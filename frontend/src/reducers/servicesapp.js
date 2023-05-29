import {
    CREATE_SERVICE,
    GET_SERVICE,
    GET_ALL_SERVICE,
    UPDATE_SERVICE,
    DELETE_SERVICE,
  } from "../actions/types";
  
  const initialState = [];
  
  export default function (services = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_SERVICE:
        return [...services, payload];
  
      case GET_ALL_SERVICE:
        return payload;
  
      case GET_SERVICE:
        return payload;
  
      case UPDATE_SERVICE:
        return services.map((service) => {
          if (service.appId === payload.appId) {
            return {
              ...service,
              ...payload,
            };
          } else {
            return service;
          }
        });
  
      case DELETE_SERVICE:
        return services.filter(({ appId }) => appId !== payload.appId);
  
      default:
        return services;
    }
  }
  