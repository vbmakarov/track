import "./style.scss";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ModalDeliveryPoints from "./modal/ModalDeliveryPoints";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { getArrayCoords } from "./utils/";
import { requestAddress, resetAddresses } from "../store/actions/actionsOsm";
import { Orders } from "./Orders";
import {
  addOrder,
  changeOrder,
  deleteOrder,
} from "../store/actions/actionsOrder";

const initialStatePoints = ["", ""];

export const SidebarContext = React.createContext(false);

export default function Sidebar() {
  const [visible, setVisible] = useState(false);
  const [orderName, setOrderName] = useState("");
  const [points, setPoints] = useState(initialStatePoints);
  const [edit, setEdit] = useState(false);
  const [isResizeble, setResible] = useState(false);
  const activeOrder = useSelector(
    (state) => state.rootReducer.orderReducer.active
  );
  const orders = useSelector((state) => state.rootReducer.orderReducer.orders);
  const error = useSelector((state) => state.rootReducer.orderReducer.error);
  const dispatch = useDispatch();

  const fetchAddress = (e) => {
    if (e.target.value) {
      dispatch(requestAddress(e.target.value));
    }
  };

  const newOrder = () => {
    const coords = getArrayCoords(points);
    if (coords.length) {
      dispatch(addOrder({ orderName, points, coords, edit }));
      if (edit) {
        setEdit(false);
      }
    }
  };

  const editOrder = (orderId) => {
    if (orders[orderId]) {
      setEdit(orderId);
      setVisible(!visible);
      setOrderName(orders[orderId].orderName);
      setPoints((prev) => {
        return [...orders[orderId].points];
      });
    }
  };

  const resetAddressInputs = () => {
    dispatch(resetAddresses());
  };

  const setActiveOrder = (orderId) => {
    dispatch(changeOrder(orderId));
  };

  const remove = (item) => {
    const result = window.confirm(
      "Вы точно хотите удалить заявку? Данные будут удалены безвозвратно!"
    );
    if (result) {
      dispatch(deleteOrder(item));
    }
  };

  if (error) {
    notification["warning"]({
      message: "Не удалось добавить заявку",
      description: "Попробуйте попытаться еще раз.",
    });
  }

  return (
    <SidebarContext.Provider
      value={{
        points,
        setPoints,
        fetchAddress,
        initialStatePoints,
        orderName,
        setOrderName,
        newOrder,
        edit,
        setEdit,
        activeOrder,
        setActiveOrder,
        editOrder,
        remove,
        setVisible,
        visible,
        orders,
        resetAddressInputs,
      }}
    >
      <div
        className="sidebar"
        style={{
          cursor: isResizeble ? "col-resize" : "pointer",
        }}
      >
        <div className="sidebar__container">
          <ModalDeliveryPoints visible={visible} setVisible={setVisible} />
          <Orders />
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
