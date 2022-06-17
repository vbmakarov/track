import React, { useState, useContext, useCallback } from "react";
import { useSelector } from "react-redux";
import { Select, Divider, Input, Space, notification } from "antd";
import { debounce } from "../../utils";
import { SidebarContext } from "../../Sidebar";
const { Option } = Select;

const SelectPoints = ({ indexSelect }) => {
  const addresses = useSelector(
    (state) => state.rootReducer.addressReducer.addresses
  );
  const error = useSelector((state) => state.rootReducer.addressReducer.error);
  const {
    points,
    setPoints,
    fetchAddress,
    checkFields,
    setPointError,
    setIsEmptyFields,
  } = useContext(SidebarContext);
  const [textValue, setText] = useState("");

  const debounceFetchAddress = useCallback(debounce(fetchAddress, 500), []);
  const onChangeName = (event) => {
    setText(event.target.value);
    debounceFetchAddress(event);
  };

  const addDeliveryPoints = (data, index) => {
    setIsEmptyFields(false);
    setText("");
    setPoints((prev) => {
      const newData = JSON.parse(data);
      const filter = prev.filter((point, index) => {
        return point.place_id == newData.place_id;
      });
      if (filter.length) {
        setPointError(true);
        const clone = [...prev];
        clone[index] = "";
        return [...clone];
      }
      setPointError(false);
      const clone = [...prev];
      clone[index] = newData;
      return [...clone];
    });
  };

  if (error) {
    notification["error"]({
      message: "Ошибка сервера",
      description: "Не удалось загрузить данные с сервера!",
    });
  }

  return (
    <>
      <Select
        style={{
          width: "100%",
          marginBottom: 15,
          overflowX: "auto",
          color: indexSelect === 0 ? "#000" : "",
        }}
        value={points[indexSelect] ? points[indexSelect].display_name : null}
        onChange={(data) => addDeliveryPoints(data, indexSelect)}
        status={indexSelect === 0 ? "error" : ""}
        placeholder={
          indexSelect == 0
            ? "Выберете точку отправления"
            : "Выберете точку доставки"
        }
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider
              style={{
                margin: "8px 0",
                overflowX: "auto",
              }}
            />
            <Space
              align="center"
              style={{
                display: "block",
                padding: "0 8px 4px",
                overflowX: "auto",
              }}
            >
              <Input
                placeholder="Введите адрес"
                value={textValue}
                onChange={onChangeName}
                style={{
                  display: "block",
                  width: "100%",
                }}
              />
            </Space>
          </>
        )}
      >
        {addresses.map((item, index) => (
          <Option
            key={item.place_id + index}
            style={{
              overflowX: "auto",
            }}
            value={JSON.stringify(item)}
          >
            {item.display_name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectPoints;
