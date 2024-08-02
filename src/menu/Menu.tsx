import { ReactNode, useState } from "react";
import HamburgerButton from "./HamburgerButton";

import "./Menu.css";

interface MenuProps {
  children?: ReactNode;
}

function Menu({ children }: MenuProps) {
  const [open, setOpen] = useState(false);

  let clazz = "menu";
  if (open) {
    clazz += " open";
  }
  return (
    <div className={clazz}>
      <HamburgerButton
        menuOpen={open}
        onClick={() => {
          setOpen(!open);
        }}
      />
      {
        <div
          className="overlay"
          onClick={() => {
            setOpen(false);
          }}
        />
      }
      <nav className="navbar">
        <div className="inner">{children}</div>
      </nav>
    </div>
  );
}

export default Menu;
