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
        <img src={avatarImage} id="avatar-img" />
      ) : (
        <div id="avatar-text">{text}</div>
      )}
    </div>
  );
};

export default Avatar;
