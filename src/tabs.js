import React, { useState } from "react";
import { Tabs } from "antd";
import * as uuid from "uuid";
import { Content } from "./content";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

const socket = socketIOClient(ENDPOINT);

const { TabPane } = Tabs;

const initialPanes = [
  { title: "Tab 1", content: <Content socket={socket} />, key: "1" },
];

export const Tab = () => {
  const [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const [panes, setPanes] = useState(initialPanes);

  const onChange = (activeKey) => {
    // this.setState({ activeKey });
    setActiveKey(activeKey);
  };

  const onEdit = (targetKey, actionType) => {
    action[actionType](targetKey);
  };

  const action = {
    add: () => {
      const activeKey = uuid.v4();
      const newPanes = [...panes];
      newPanes.push({
        title: "New Tab",
        content: <Content socket={socket} />,
        key: activeKey,
      });
      setActiveKey(activeKey);
      setPanes(newPanes);
    },
    remove: (targetKey) => {
      let newActiveKey = activeKey;
      let lastIndex;
      panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const newPanes = panes.filter((pane) => pane.key !== targetKey);
      if (newPanes.length && newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newPanes[lastIndex].key;
        } else {
          newActiveKey = newPanes[0].key;
        }
      }
      setActiveKey(activeKey);
      setPanes(newPanes);
    },
  };

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      style={{
        flex: 1,
      }}
    >
      {panes.map((pane) => (
        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  );
};
