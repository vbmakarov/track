import React, { useContext } from "react";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { SidebarContext } from "./Sidebar";
import { Button, List, Divider } from "antd";

export function Orders() {
  const {
    activeOrder,
    setActiveOrder,
    editOrder,
    remove,
    setVisible,
    orders,
    visible,
  } = useContext(SidebarContext);

  return (
    <>
      <Divider orientation="left" className="sidebar__title">
        Заявки
      </Divider>
      {activeOrder && (
        <List
          bordered
          className="sidebar__orders"
          dataSource={Object.keys(orders)}
          renderItem={(item, index) => (
            <List.Item
              className={
                item == activeOrder ? "sidebar__order active" : "sidebar__order"
              }
              onClick={() => setActiveOrder(item)}
            >
              <div className="order__text">
                №{index + 1}. {orders[item].orderName}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  paddingTop: 10,
                }}
              >
                <EditOutlined
                  className="sidebar__edit"
                  theme="outlined"
                  onClick={() => editOrder(item)}
                />
                <CloseOutlined
                  className="sidebar__remove"
                  theme="outlined"
                  onClick={() => remove(item)}
                />
              </div>
            </List.Item>
          )}
        />
      )}
      <Button type="primary" block onClick={() => setVisible(!visible)}>
        Создать заявку
      </Button>
    </>
  );
}
