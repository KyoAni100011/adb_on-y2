import AppHeader from "../views/Header/Header";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
}
