import { useState } from "react";
import Keyboard from "./Keyboard";
import Display from "./Display";
import "./App.css";

const letters = ["A", "Z"];

function App() {
  const [mute, setMute] = useState(false);
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
      <Keyboard letters={letters} onButtonPressed={buttonPressed} mute={mute} />
      <Display letters={letters} data={data} />
      <div>
        <input
          type="checkbox"
          id="mute"
          checked={mute}
          onChange={(e) => {
            setMute(e.target.checked);
          }}
        />
        <label htmlFor="mute" style={{ padding: "2px" }}>
          Muet
        </label>
      </div>
    </div>
  );
}

export default App;
