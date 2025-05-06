import "./popup.css";

export const openPopup = () => {
  document.getElementById("popup").style.display = "flex";
  document.getElementById("popup-overlay").style.display = "flex";
};

export const closePopup = () => {
  document.getElementById("popup").style.display = "none";
  document.getElementById("popup-overlay").style.display = "none";
};

const Popup = ({ children }) => {
  return (
    <div id="popup-overlay">
      <div id="popup">
        <div id="popup-items">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
