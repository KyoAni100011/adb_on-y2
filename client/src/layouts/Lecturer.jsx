import { Outlet } from "react-router";
import AppHeaderLecturer from "../views/Lecturer/HeaderLecturer";

export default function Lecturer() {
  return (
    <div>
      <AppHeaderLecturer />
      <Outlet />
    </div>
  );
}
