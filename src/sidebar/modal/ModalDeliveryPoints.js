import React, { useContext, useState } from "react";
import { Modal, Input, Alert } from "antd";
import { DeliveryPoints } from "./components/DeliveryPoints";
import { SidebarContext } from "../Sidebar";
import "./style.scss";

const ModalDeliveryPoints = ({ visible, setVisible }) => {
  const {
    points,
    setPoints,
    initialStatePoints,
    orderName,
    newOrder,
    resetAddressInputs,
    pointError,
    setPointError,
    isEmptyFields,
    setIsEmptyFields,
    setName,
    checkFields,
  } = useContext(SidebarContext);

  const handleOk = () => {
    const isEmpty = checkFields();
    if (!isEmpty) {
      setVisible(!visible);
      setName("");
      resetAddressInputs();
      newOrder();
      setPoints((prev) => {
        return [...initialStatePoints];
      });
      setIsEmptyFields(false);
    } else {
      setIsEmptyFields(true);
    }
  };

  const handleCancel = () => {
    setPoints(initialStatePoints);
    setPointError(false);
    setVisible(!visible);
    setName("");
    setIsEmptyFields(false);
  };

  return (
    <Modal
      title="Новый маршрут"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal"
    >
      <div style={{ display: "flex", marginBottom: 15 }}>
        <div style={{ flex: "1 1 30%" }}>Имя заявки*</div>
        <Input
          style={{ flex: "1 1 70%" }}
          value={orderName}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <h3>Список адресов:</h3>
      <DeliveryPoints />
      {isEmptyFields ? (
        <Alert
          message="Пожалуйста, заполните все поля"
          type="error"
          showIcon
          style={{
            marginTop: 10,
          }}
        />
      ) : (
        ""
      )}
      {pointError ? (
        <Alert
          message="Такой адрес уже существует"
          type="error"
          showIcon
          style={{
            marginTop: 10,
          }}
        />
      ) : (
        ""
      )}
    </Modal>
  );
};

export default ModalDeliveryPoints;
