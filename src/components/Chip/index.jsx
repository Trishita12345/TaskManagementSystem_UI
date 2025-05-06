import "./chip.css";

const Chip = ({ text, color }) => {
  return (
    <div
      id="chip"
      style={{
        "--bg-color": `${color}40`,
        "--text-color": color,
      }}
    >
      {text}
    </div>
  );
};

export default Chip;
