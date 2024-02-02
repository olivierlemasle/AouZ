import { useEffect, useRef, useState } from "react";
import Button from "./Button";

interface KeyboardProps {
  letters: string[];
  onButtonPressed: (key: string) => void;
  mute: boolean;
}

function Keyboard({ letters, onButtonPressed, mute }: KeyboardProps) {
  const audioContext = useRef<AudioContext | null>(null);
  const audioBuffers = useRef<{ [key: string]: AudioBuffer }>({});
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  async function makeSound(letter: string) {
    if (audioContext.current === null) {
      audioContext.current = new AudioContext();
    }
    const ctx = audioContext.current;

    let audioBuffer = await getOrCreateAudioBuffer(ctx, letter);
    const src = new AudioBufferSourceNode(ctx, {
      buffer: audioBuffer,
    });
    src.connect(ctx.destination);
    src.start(0);
  }

  async function getOrCreateAudioBuffer(ctx: AudioContext, letter: string) {
    let audioBuffer = audioBuffers.current[letter];
    if (!audioBuffer) {
      const href = new URL(`./assets/${letter}.ogg`, import.meta.url).href;
      console.log(`Fetching "${letter}" sound: ${href}`);
      const response = await fetch(href);
      const arrayBuffer = await response.arrayBuffer();
      audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      console.log(`Audio ready for letter ${letter}`);
      audioBuffers.current[letter] = audioBuffer;
    }
    return audioBuffer;
  }

  function buttonPressed(key: string) {
    if (!mute) {
      makeSound(key);
    }
    onButtonPressed(key);
  }

  const onkeydown = (evt: KeyboardEvent) => {
    if (evt.repeat) {
      return;
    }
    const key = evt.key.toUpperCase();
    if (letters.includes(key)) {
      setPressedKeys([...pressedKeys, key]);
      buttonPressed(key);
    }
  };

  const onkeyup = (evt: KeyboardEvent) => {
    const key = evt.key.toUpperCase();
    if (letters.includes(key)) {
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

  const buttons = letters.map((letter) => (
    <Button
      key={letter}
      letter={letter}
      active={pressedKeys.includes(letter)}
      onClick={buttonPressed}
    />
  ));

  return <div className="box grow">{buttons}</div>;
}

export default Keyboard;
