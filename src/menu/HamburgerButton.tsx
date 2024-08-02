import "./HamburgerButton.css";

interface HamburgerButtonProps {
  menuOpen: boolean;
  onClick: () => void;
}

function HamburgerButton({ menuOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      className={"hamburgerButton" + (menuOpen ? " open" : "")}
      onClick={() => {
        onClick();
      }}
    >
      <svg aria-label="Menu" viewBox="0 0 100 100" height="24px" width="24px">
        <path
          className="top"
          d="M0 0 L50 0 L100 0 L100 20 L50 20 L50 20 L0 20"
        />
        <path className="middle" d="M0 40 h100 v20 h-100" />
        <path
          className="bottom"
          d="M0 80 L50 80 L50 80 L100 80 L100 100 L50 100 L0 100"
        />
      </svg>
    </button>
  );
}

export default HamburgerButton;
