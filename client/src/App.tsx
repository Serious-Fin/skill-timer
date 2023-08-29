import "./App.css";
import Timer from "./components/Timer";
import React from "react";

function App() {
  return (
    <>
      <h1>Hello, App!</h1>
      <Timer initialTime={30} />
    </>
  );
}

export default App;
