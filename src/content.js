import React, { useState } from "react";
import { Select } from "antd";
import { Editor } from "./editor";

const { Option } = Select;

export const Content = (props) => {
  const { socket } = props;

  const [socketType, setSocketType] = useState("on");

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSocketType(value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginBottom: 10,
          textAlign: "left",
        }}
      >
        <Select
          defaultValue="on"
          style={{ width: 120, marginLeft: 10 }}
          onChange={handleChange}
        >
          <Option value="on">On</Option>
          <Option value="emit">Emit</Option>
        </Select>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <Editor
          style={{ height: 500 }}
          withButton
          socket={socket}
          options={{
            socketType,
          }}
        />
        {/* <Editor readonly /> */}
      </div>
    </div>
  );
};
