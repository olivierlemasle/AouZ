import { Fragment, UIEvent, useEffect, useRef } from "react";
import "./Display.css";
import Card from "./Card";

interface DisplayProps {
  letters: string[];
  data: { input?: string; guess: string }[];
  waiting: boolean;
}

function Display({ letters, data, waiting }: DisplayProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  function scrollBefore() {
    if (ref.current) {
      ref.current.scrollLeft -= 0.2 * ref.current.clientWidth;
    }
  }

  function scrollAfter() {
    if (ref.current) {
      ref.current.scrollLeft += 0.2 * ref.current.clientWidth;
    }
  }

  function scrollToEnd() {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollWidth;
    }
  }

  const onkeydown = (evt: KeyboardEvent) => {
    switch (evt.code) {
      case "ArrowLeft":
        scrollBefore();
        break;
      case "ArrowRight":
        scrollAfter();
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onkeydown, false);
    return () => {
      window.removeEventListener("keydown", onkeydown, false);
    };
  });

  useEffect(scrollToEnd, [data]);

  const onscroll = (evt: UIEvent<HTMLDivElement>) => {
    const el = evt.currentTarget;
    const isScrollable = el.scrollWidth > el.clientWidth;
    if (!isScrollable) {
      el.classList.remove("is-left-overflowing", "is-right-overflowing");
      return;
    }
    const isScrolledToRight =
      el.scrollWidth < el.clientWidth + el.scrollLeft + 50;
    const isScrolledToLeft = isScrolledToRight ? false : el.scrollLeft === 0;
    el.classList.toggle("is-left-overflowing", !isScrolledToLeft);
    el.classList.toggle("is-right-overflowing", !isScrolledToRight);
  };

  return (
    <div className="Display">
      <div className="grid-wrapper">
        <div
          className={"grid" + (waiting ? " waiting" : "")}
          ref={ref}
          onScroll={onscroll}
        >
          {data.map((e, i) => {
            const inputMatch = e.input ? e.input === e.guess : null;
            return (
              <Fragment key={i}>
                <Card
                  letters={letters}
                  value={e.input}
                  inputMatch={inputMatch}
                />
                <Card
                  letters={letters}
                  value={e.guess}
                  inputMatch={inputMatch}
                  hidden={e.input === undefined}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="header">
        <div className="head">👤</div>
        <div className="head">🤖</div>
      </div>
    </div>
  );
}

export default Display;
