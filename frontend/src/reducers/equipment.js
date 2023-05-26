import {
  CREATE_EQUIPMENT,
  GET_EQUIPMENT,
  GET_ALL_EQUIPMENT,
  UPDATE_EQUIPMENT,
  DELETE_EQUIPMENT,
} from "../actions/types";

const initialState = [];

export default function (equipments = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_EQUIPMENT:
      return [...equipments, payload];

    case GET_ALL_EQUIPMENT:
      return payload;

    case GET_EQUIPMENT:
      return payload;

    case UPDATE_EQUIPMENT:
      return equipments.map((equipment) => {
        if (equipment.equipmentId === payload.equipmentId) {
          return {
            ...equipment,
            ...payload,
          };
        } else {
          return equipment;
        }
      });

    case DELETE_EQUIPMENT:
      return equipments.filter(({ equipmentId }) => equipmentId !== payload.equipmentId);

    default:
      return equipments;
  }
}
