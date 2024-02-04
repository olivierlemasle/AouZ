import { useState } from "react";
import Keyboard from "./Keyboard";
import Display from "./Display";
import "./App.css";

function App() {
  const [data, setData] = useState<{ input: string; guess: string }[]>([]);

  function buttonPressed(key: string) {
    setData([...data, { input: key, guess: "?" }]);
  }

  return (
    <div className="App">
      <h1>A ou Z ?</h1>
      <Keyboard onButtonPressed={buttonPressed} />
      <Display data={data} />
    </div>
  );
}

export default App;
