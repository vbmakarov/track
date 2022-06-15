export const NEW_ORDER = "NEW_ORDER";
export const ADD_ORDER = "ADD_ORDER";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const REMOVE_ORDER = "REMOVE_ORDER";
export const SET_ACTIVE_ORDER = "SET_ACTIVE_ORDER";
export const ORDER_FAILED = "ORDER_FAILED";

export function addOrder(data) {
  return {
    type: NEW_ORDER,
    payload: data,
  };
}

export function changeOrder(data) {
  return {
    type: CHANGE_ORDER,
    payload: data,
  };
}

export function deleteOrder(orderId) {
  return {
    type: DELETE_ORDER,
    payload: orderId,
  };
}
