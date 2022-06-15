import {
  FETCH_SUCCESS,
  SUCCESS_RESET,
  FETCH_FAILED,
} from "../actions/actionsOsm";

const initialState = {
  addresses: [],
  error: false,
};

export default function addressReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        addresses: [...action.payload],
        error: false,
      };
    case SUCCESS_RESET:
      return {
        addresses: [],
        error: false,
      };
    case FETCH_FAILED:
      return {
        addresses: [],
        error: true,
      };
    default:
      return state;
  }
}
