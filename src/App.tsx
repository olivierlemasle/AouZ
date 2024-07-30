import { useState } from "react";
import Keyboard from "./Keyboard";
import Display from "./Display";
import "./App.css";

const letters = ["A", "Z"];

function App() {
  const [waiting, setWaiting] = useState(false);
  const [mute, setMute] = useState(false);
  const [delay, setDelay] = useState(100);
  const [data, setData] = useState<{ input?: string; guess: string }[]>([
    {
      guess: random(),
    },
  ]);

  function random() {
    const i = Math.floor(Math.random() * letters.length);
    return letters[i];
  }

  function buttonPressed(key: string) {
    const last = data[data.length - 1];
    if (last.input) {
      console.log(last.input);
      return;
    }
    setData([...data.slice(0, data.length - 1), { ...last, input: key }]);
    setWaiting(true);
    setTimeout(() => {
      setData((data) => [
        ...data,
        {
          guess: random(),
        },
      ]);
      setWaiting(false);
    }, delay);
  }

  return (
    <div className="App">
      <h1>A ou Z ?</h1>
      <Keyboard letters={letters} onButtonPressed={buttonPressed} mute={mute} />
      <Display letters={letters} data={data} waiting={waiting} />
      <div>
        <div style={{ float: "left", margin: "1em" }}>
          <input
            type="checkbox"
            id="mute"
            checked={mute}
            onChange={(e) => {
              setMute(e.target.checked);
            }}
          />
          <label htmlFor="mute" style={{ paddingLeft: "2px" }}>
            Muet
          </label>
        </div>
        <div style={{ float: "left", margin: "1em" }}>
          <label htmlFor="delayInput" style={{ paddingRight: "2px" }}>
            Simule un temps de réflexion de 🤖 de
          </label>
          <input
            type="number"
            id="delayInput"
            value={delay}
            onChange={(e) => {
              setDelay(Number(e.target.value));
            }}
            min={0}
          />
          <span> ms</span>
        </div>
      </div>
    </div>
  );
}

export default App;
