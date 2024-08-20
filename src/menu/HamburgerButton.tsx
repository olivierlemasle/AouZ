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
        <rect x="0" y="0" width="60" height="20" rx="10" className="top-left" />
        <rect
          x="40"
          y="0"
          width="60"
          height="20"
          rx="10"
          className="top-right"
        />
        <rect x="0" y="40" width="100" height="20" rx="10" className="middle" />
        <rect
          x="0"
          y="80"
          width="60"
          height="20"
          rx="10"
          className="bottom-left"
        />
        <rect
          x="40"
          y="80"
          width="60"
          height="20"
          rx="10"
          className="bottom-right"
        />
      </svg>
    </button>
  );
}

export default HamburgerButton;
