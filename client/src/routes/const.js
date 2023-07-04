import Login from "../pages/About/About";
import Register from "../pages/Contact/Contact";
import Main from "../pages/Main/Main";

export const MAIN_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";

export const routes = [
  {
    path: MAIN_ROUTE,
    Component: <Main />,
  },
  {
    path: LOGIN_ROUTE,
    Component: <Login />,
  },
  {
    path: REGISTER_ROUTE,
    Component: <Register />,
  },
];

export const topbarNavigationItems = [
  { route: MAIN_ROUTE, title: "Main" },
  { route: LOGIN_ROUTE, title: "Log In" },
  { route: REGISTER_ROUTE, title: "Register" },
];
