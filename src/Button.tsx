import "./Button.css";

interface ButtonProps {
  letter: string;
  active: boolean;
  onClick: (key: string) => void;
}

function Button({ letter, active, onClick }: ButtonProps) {
  let className = "key";
  if (active) {
    className += " active";
  }

  return (
    <button
      className={className}
      onClick={() => {
        onClick(letter);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(letter);
      }}
    >
      <span>{letter}</span>
    </button>
  );
}

export default Button;
