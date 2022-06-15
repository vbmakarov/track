import { put, takeLatest } from "redux-saga/effects";
import {
  NEW_ORDER,
  ADD_ORDER,
  CHANGE_ORDER,
  SET_ACTIVE_ORDER,
  REMOVE_ORDER,
  DELETE_ORDER,
  ORDER_FAILED,
} from "../actions/actionsOrder";
import { fetchGeoJson } from "../../api/RouteApi";

function* addOrderDataWithGeoJson(action) {
  try {
    const result = yield fetchGeoJson(action.payload.coords);
    yield put({
      type: ADD_ORDER,
      payload: {
        date: action.payload.edit ? action.payload.edit : Date.now(),
        orderName: action.payload.orderName,
        points: action.payload.points,
        coords: action.payload.coords,
        track: result.data,
      },
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: ORDER_FAILED,
    });
  }
}

function* changeActiveOrder(action) {
  yield put({
    type: SET_ACTIVE_ORDER,
    payload: action.payload,
  });
}

function* removeOrder(action) {
  yield put({
    type: REMOVE_ORDER,
    payload: action.payload,
  });
}

function* addOrderDataWatcher() {
  yield takeLatest(NEW_ORDER, addOrderDataWithGeoJson);
  yield takeLatest(CHANGE_ORDER, changeActiveOrder);
  yield takeLatest(DELETE_ORDER, removeOrder);
}

export default addOrderDataWatcher;
