import React, { useContext, useState } from "react";
import { Modal, Input, Alert } from "antd";
import { DeliveryPoints } from "./components/DeliveryPoints";
import { SidebarContext } from "../Sidebar";
import "./style.scss";

const ModalDeliveryPoints = ({ visible, setVisible }) => {
  const [error, setError] = useState(true);

  const {
    points,
    setPoints,
    initialStatePoints,
    orderName,
    setOrderName,
    newOrder,
  } = useContext(SidebarContext);

  const handleOk = () => {
    if (!orderName || !checkPoints()) {
      setError(!error);
    } else {
      setError(!error);
      setVisible(!visible);
      setOrderName("");
      newOrder();
      setPoints((prev) => {
        return [...initialStatePoints];
      });
    }
  };

  const checkPoints = () => {
    const res = points.filter((point, index) => !point);
    return !res.length;
  };

  const handleCancel = () => {
    setPoints(initialStatePoints);
    setVisible(!visible);
    setOrderName("");
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
        <div style={{ flex: "1 1 30%" }}>Идентификатор*</div>
        <Input
          style={{ flex: "1 1 70%" }}
          value={orderName}
          onChange={(e) => setOrderName(e.target.value)}
        />
      </div>
      <h3>Список адресов:</h3>
      <DeliveryPoints />
      {!error ? (
        <Alert
          message="Пожалуйста, заполните все поля"
          type="warning"
          showIcon
          closable
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
