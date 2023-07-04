import { Routes as RoutesWrap, Route } from "react-router-dom";
import { routes } from "./const";

const Routes = () => {
  return (
    <RoutesWrap>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.Component} />
      ))}
    </RoutesWrap>
  );
};

export default Routes;
