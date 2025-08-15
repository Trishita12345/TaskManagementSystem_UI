import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes as Switch,
  useLocation,
} from "react-router-dom";
import Tasks from "../pages/Tasks";
import Login from "../pages/Authentication/Login";
import { isAuthenticated } from "../utils/redux/slices/authenticationSlice";
import { routes } from "../constants/routes";
import Register from "../pages/Authentication/Register";
import Notification from "../components/Notification";
import PageNotFound from "../pages/PageNotFound";
import RoleList from "../pages/Role/RoleList";
import AuthenticatedLayout from "../components/AuthenticatedLayout";

const Root = () => {
  let location = useLocation();
  const isLoggedIn = useSelector(isAuthenticated);
  const { from } = location.state || { from: { pathname: routes.myBoard } };
  return isLoggedIn ? <Navigate to={from} /> : <Navigate to={routes.login} />;
};

const AuthenticatedScreens = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useSelector(isAuthenticated);

  if (isLoggedIn) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
  } else {
    return <Navigate to={routes.login} />;
  }
};
const Routes = () => {
  return (
    <>
      <Notification />
      <Switch>
        <Route path={routes.root} element={<Root />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
        <Route
          path={routes.myBoard}
          element={
            <AuthenticatedScreens>
              <Tasks />
            </AuthenticatedScreens>
          }
        />
        <Route
          path={routes.roleList}
          element={
            <AuthenticatedScreens>
              <RoleList />
            </AuthenticatedScreens>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Switch>
    </>
  );
};

export default Routes;
