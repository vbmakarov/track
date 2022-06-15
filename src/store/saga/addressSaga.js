import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_ADDRESS,
  RESET_ADDRESS,
  SUCCESS_RESET,
  FETCH_FAILED,
  FETCH_SUCCESS,
} from "../actions/actionsOsm";
import AddressApi from "../../api/AddressApi";

function* fetchAddressAsync(action) {
  try {
    const result = yield call(AddressApi.fetch, action.payload);
    yield put({ type: FETCH_SUCCESS, payload: result.data });
  } catch (e) {
    console.log(e.message);
    yield put({ type: FETCH_FAILED });
  }
}

function* resetAddressesSync() {
  yield put({ type: SUCCESS_RESET });
}

function* addressWatcher() {
  yield takeLatest(FETCH_ADDRESS, fetchAddressAsync);
  yield takeLatest(RESET_ADDRESS, resetAddressesSync);
}

export default addressWatcher;
