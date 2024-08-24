import { Outlet } from "react-router";
import AppHeaderLecturer from "../views/HeaderLecturer";

export default function Lecturer() {
  return (
    <div>
      <AppHeaderLecturer />
      <Outlet />
    </div>
  );
}
