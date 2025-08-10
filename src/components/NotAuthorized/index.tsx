import { useNavigate } from "react-router-dom";
import "./NotAuthorized.css";
import strings from "../../constants/strings";
import { Button } from "@mui/material";
import { routes } from "../../constants/routes";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="not-authorized-container">
      <h1>{strings.notAuthorizedHeader}</h1>
      <p>{strings.notAuthorizedSubHeader}</p>
      <Button variant="contained" onClick={() => navigate(routes.login)}>
        {strings.backToLogin}
      </Button>
    </div>
  );
};

export default NotAuthorized;
