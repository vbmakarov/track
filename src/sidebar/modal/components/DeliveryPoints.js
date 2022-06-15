import React, { useState, useContext } from "react";
import { Button, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addPoint } from "../../utils";
import SelectPoints from "./SelectPoints";
import { SidebarContext } from "../../Sidebar";

export function DeliveryPoints() {
  const [warning, setWarning] = useState(false);
  const { points, setPoints } = useContext(SidebarContext);

  return (
    <>
      {Array.apply(null, Array(points.length)).map((point, index) => {
        return <SelectPoints key={index} indexSelect={index} />;
      })}
      {warning && (
        <Alert
          type="error"
          message="Можно добавить не более 5 адресов"
          banner
          style={{ marginBottom: "10px" }}
        />
      )}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size={"default"}
        onClick={() => addPoint(setPoints, warning, setWarning)}
      >
        Добавить точку доставки
      </Button>
    </>
  );
}
