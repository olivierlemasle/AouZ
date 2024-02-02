import { useState } from "react";
import Keyboard from "./Keyboard";
import "./App.css";

function App() {
  const [result, setResult] = useState("");

  function buttonPressed(key: string) {
    setResult(result + key);
  }

  return (
    <div className="App">
      <h1>A ou Z ?</h1>
      <Keyboard onButtonPressed={buttonPressed} />
      <p style={{ height: "2em", margin: "1em 0", overflowWrap: "break-word" }}>
        {result}
      </p>
    </div>
  );
}

export default App;
