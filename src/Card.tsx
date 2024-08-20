import "./Card.css";

interface CardProps {
  letters: string[];
  value?: string;
  inputMatch: boolean | null;
  hidden?: boolean;
}

function Card({ letters, value, inputMatch, hidden }: CardProps) {
  let classes = "flip-card-front";
  if (value) {
    const idx = letters.indexOf(value);
    classes += idx !== -1 ? ` value-${idx}` : "";
  }
  if (inputMatch !== null) {
    classes += inputMatch ? " ok" : " ko";
  }

  return (
    <div className={"flip-card" + (hidden ? " showback" : "")}>
      <div className="flip-card-inner">
        <div className={classes}>{value}</div>
        <div className="flip-card-back">?</div>
      </div>
    </div>
  );
}

export default Card;
