import { all } from "redux-saga/effects";
import addressWatcher from "./addressSaga";
import addOrderDataWatcher from "./orderSaga";

export default function* rootSaga() {
  yield all([addressWatcher(), addOrderDataWatcher()]);
}
