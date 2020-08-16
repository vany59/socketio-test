import React from "react";
import { Tab } from "./tabs";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 style={{ marginBottom: 0 }}>Test websocket api</h1>
      <div
        style={{
          padding: 10,
          display: "flex",
        }}
      >
        <input
          style={{
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <button>connect</button>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <Tab />
      </div>
    </div>
  );
}

export default App;
