import "./avatar.css";

const Avatar = ({ text, onClick }) => {
  return (
    <div id="avatar" onClick={onClick}>
      <div id="avatar-text">{text}</div>
    </div>
  );
};

export default Avatar;
