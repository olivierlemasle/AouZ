import { Fragment, useEffect, useRef } from "react";
import "./Display.css";

interface DisplayProps {
  letters: string[];
  data: { input: string; guess: string }[];
}

function Display({ letters, data }: DisplayProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  function scrollBefore() {
    if (ref.current) {
      if (ref.current.scrollLeft > 300) {
        ref.current.scrollLeft *= 0.8;
      } else {
        ref.current.scrollLeft -= 60;
      }
    }
  }

  function scrollToEnd() {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollWidth;
    }
  }

  useEffect(scrollToEnd, [data]);

  function letterClass(letter: string) {
    const idx = letters.indexOf(letter);
    return idx === -1 ? "unknown" : `value-${idx}`;
  }

  return (
    <div className="Display">
      <div className="overlay" onClick={scrollBefore} />
      <div className="grid" ref={ref}>
        {data.map((e, i) => {
          let classes = "cell ";
          if (i === data.length - 1) {
            classes += "last ";
          }
          classes += e.input === e.guess ? "ok " : "ko ";
          return (
            <Fragment key={i}>
              <div className={classes + letterClass(e.input)}>{e.input}</div>
              <div className={classes + letterClass(e.guess)}>{e.guess}</div>
            </Fragment>
          );
        })}
        <div className="head">👤</div>
        <div className="head">🤖</div>
      </div>
    </div>
  );
}

export default Display;
