import Home from "../layouts/Home";
import Lecturer from "../layouts/Lecturer";
import Main from "../layouts/Main";
import Checkout from "../views/CheckOut";
import CourseDetail from "../views/CourseDetail";
import FormTeaching from "../views/FormTeaching";
import LecturerProfileView from "../views/LecturerProfile";
import LoginForm from "../views/LoginForm";
import MyCourses from "../views/MyCourse";
import AddCourse from "../views/NewCourse";
import ShoppingCart from "../views/ShoppingCart";
import RegistrationForm from "../views/SignUpForm";

const pagesData = [
  {
    path: "/join-new",
    element: <RegistrationForm />,
    title: "Join New",
  },
  {
    path: "/join",
    element: <LoginForm />,
    title: "Join",
  },
  {
    path: "/join-teaching",
    element: <FormTeaching />,
    title: "Join Teaching",
  },
  {
    path: "/",
    element: <Main />,
    title: "Main",
    children: [
      {
        path: "/",
        element: <Home />,
        title: "Home",
      },
      {
        path: "/course/:slug",
        element: <CourseDetail />,
        title: "Course Detail",
      },
      {
        path: "/shopping-cart",
        element: <ShoppingCart />,
        title: "Shopping Cart",
      },
      {
        path: "/checkout",
        element: <Checkout />,
        title: "Checkout",
      },
      {
        path: "/my-course",
        element: <MyCourses />,
        title: "My Courses",
      },
    ],
  },
  {
    path: "/lecturer",
    element: <Lecturer />,
    title: "Lecturer",
    children: [
      {
        path: "profile",
        element: <LecturerProfileView />,
        title: "Lecturer Profile",
      },
      {
        path: "new-course",
        element: <AddCourse />,
        title: "Add Course",
      },
    ],
  },
];

export default pagesData;
