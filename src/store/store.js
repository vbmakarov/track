import React from "react";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import addressReducer from "./reducers/addressReducer";
import orderReducer from "./reducers/orderReducer";
import rootSaga from "./saga/";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  addressReducer,
  orderReducer,
});

export const store = configureStore({
  reducer: { rootReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);
