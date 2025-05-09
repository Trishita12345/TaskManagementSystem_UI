import "./avatar.css";

const Avatar = ({
  text,
  avatarImage = null,
  onClick = () => {},
  className = "",
  style,
}) => {
  return (
    <div
      id="avatar-container"
      onClick={onClick}
      className={className}
      style={style}
    >
      {avatarImage ? (
        <img src={avatarImage} className="avatar" alt="img" />
      ) : (
        <div id="avatar-text">{text}</div>
      )}
    </div>
  );
};

export default Avatar;
