import React from "react";
// import { useNavigate } from "react-router-dom";
import "./NotAuthorized.css";

const NotAuthorized = () => {
  // const navigate = useNavigate();

  return (
    <div className="not-authorized-container">
      <h1>{strings.notAuthorizedHeader}</h1>
      <p>{strings.notAuthorizedSubHeader}</p>
      <button onClick={() => {}}>{strings.backHome}</button>
    </div>
  );
};

export default NotAuthorized;
