import { Fragment, useEffect, useRef } from "react";
import "./Display.css";

interface DisplayProps {
  data: { input: string; guess: string }[];
}

function Display({ data }: DisplayProps) {
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

  return (
    <div className="Display">
      <div className="overlay" onClick={scrollBefore} />
      <div className="grid" ref={ref}>
        {data.map((e, i) => {
          let classes = "cell";
          classes += i % 2 === 0 ? " even" : " odd";
          if (i === data.length - 1) {
            classes += " last";
          }
          return (
            <Fragment key={i}>
              <div className={classes}>{e.input}</div>
              <div className={classes}>{e.guess}</div>
            </Fragment>
          );
        })}
        <div className="head">🙂</div>
        <div className="head">🤖</div>
      </div>
    </div>
  );
}

export default Display;
