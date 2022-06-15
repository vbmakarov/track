import {
  ADD_ORDER,
  SET_ACTIVE_ORDER,
  REMOVE_ORDER,
  ORDER_FAILED,
} from "../actions/actionsOrder";

const initialState = {
  orders: {},
  active: "",
  error: false,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: {
          ...state?.orders,
          [action.payload.date]: {
            orderName: action.payload.orderName,
            points: action.payload.points,
            coords: action.payload.coords,
            track: action.payload.track,
          },
        },
        active: action.payload.date,
        error: false,
      };
    case SET_ACTIVE_ORDER:
      return {
        ...state,
        active: action.payload,
        error: false,
      };
    case REMOVE_ORDER:
      return {
        orders: Object.keys(state.orders).reduce((obj, key) => {
          if (key != action.payload) {
            obj[key] = state.orders[key];
          }
          return obj;
        }, {}),
        active: "",
        error: false,
      };
    case ORDER_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
