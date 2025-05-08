import "./avatar.css";

const Avatar = ({ text, onClick = () => {}, className = "", style }) => {
  return (
    <div
      id="avatar-container"
      onClick={onClick}
      className={className}
      style={style}
    >
      <div id="avatar-text">{text}</div>
    </div>
  );
};

export default Avatar;
