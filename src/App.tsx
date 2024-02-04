import { useState } from "react";
import Keyboard from "./Keyboard";
import Display from "./Display";
import "./App.css";

const letters = ["A", "Z"];

function App() {
  const [data, setData] = useState<{ input: string; guess: string }[]>([]);

  function random() {
    const i = Math.floor(Math.random() * letters.length);
    return letters[i];
  }

  function buttonPressed(key: string) {
    setData([...data, { input: key, guess: random() }]);
  }

  return (
    <div className="App">
      <h1>A ou Z ?</h1>
      <Keyboard letters={letters} onButtonPressed={buttonPressed} />
      <Display letters={letters} data={data} />
    </div>
  );
}

export default App;
