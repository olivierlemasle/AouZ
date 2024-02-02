import { useEffect, useState } from "react";
import Button from "./Button";

interface KeyboardProps {
  onButtonPressed: (key: string) => void;
}

function Keyboard({ onButtonPressed }: KeyboardProps) {
  const keys = ["A", "Z"];
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  const onkeydown = (evt: KeyboardEvent) => {
    if (evt.repeat) {
      return;
    }
    const key = evt.key.toUpperCase();
    if (keys.includes(key)) {
      setPressedKeys([...pressedKeys, key]);
      onButtonPressed(key);
    }
  };

  const onkeyup = (evt: KeyboardEvent) => {
    const key = evt.key.toUpperCase();
    if (keys.includes(key)) {
      setPressedKeys(pressedKeys.filter((k) => k !== key));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onkeydown, false);
    window.addEventListener("keyup", onkeyup, false);
    return () => {
      window.removeEventListener("keydown", onkeydown, false);
      window.removeEventListener("keyup", onkeyup, false);
    };
  });

  const buttons = keys.map((letter) => (
    <Button
      key={letter}
      letter={letter}
      active={pressedKeys.includes(letter)}
      onClick={onButtonPressed}
    />
  ));

  return <div className="box grow">{buttons}</div>;
}

export default Keyboard;
