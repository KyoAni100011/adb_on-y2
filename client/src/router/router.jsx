import { Route, Routes } from "react-router-dom";
import pagesData from "./pages";

const generateRoutes = (routes) => {
  return routes.map(({ path, title, element, children }) => {
    return (
      <Route key={title} path={path} element={element}>
        {children && generateRoutes(children)}
      </Route>
    );
  });
};

const Router = () => {
  return <Routes>{generateRoutes(pagesData)}</Routes>;
};

export default Router;
