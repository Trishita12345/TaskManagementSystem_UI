import { useSelector } from "react-redux";
import { routes } from "../constants/routes";
import {
  Navigate,
  Route,
  Routes as Switch,
  useLocation,
} from "react-router-dom";
import Tasks from "../screens/Tasks";
import Login from "../screens/Authentication/Login";
import Layout from "../screens/Layout";
import { isAuthenticated } from "../utils/redux/slices/authenticationSlice";
import { useEffect } from "react";

const Root = () => {
  let location = useLocation();
  const isLoggedIn = !useSelector(isAuthenticated);
  const { from } = location.state || { from: { pathname: routes.myBoard } };
  return isLoggedIn ? <Navigate to={from} /> : <Navigate to={routes.login} />;
};

const AuthenticatedScreens = ({ Component }) => {
  const isLoggedIn = !useSelector(isAuthenticated);

  if (isLoggedIn) {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  } else {
    return <Navigate to={routes.login} />;
  }
};
const Routes = () => {
  const isDark = useSelector((state) => state.commonSlice.isDark);
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  return (
    <Switch>
      <Route path={routes.root} element={<Root />} />
      <Route path={routes.login} element={<Login />} />
      <Route
        path={routes.myBoard}
        element={<AuthenticatedScreens Component={Tasks} />}
      />
    </Switch>
  );
};

export default Routes;
