import Home from "../layouts/Home";
import Lecturer from "../layouts/Lecturer";
import Main from "../layouts/Main";
import Checkout from "../views/CheckOut";
import CourseDetail from "../views/CourseDetail";
import FormTeaching from "../views/Lecturer/FormTeaching";
import LecturerProfileView from "../views/LecturerProfile";
import LoginForm from "../views/LoginForm";
import MyCourses from "../views/MyCourse";
import AddCourse from "../views/Lecturer/NewCourse";
import ShoppingCart from "../views/ShoppingCart";
import RegistrationForm from "../views/SignUpForm";
import LecturerCourses from "../views/Lecturer/ListCourses";
import CourseDetailPage from "../views/Lecturer/CourseView";
import LessonDetailPage from "../views/Lecturer/LessonDetail";
import AssignmentDetailPage from "../views/Lecturer/AssignmentDetail";
import PaymentSuccess from "../views/Payment";
import CourseDetailPageForStudent from "../views/CourseView";
import LessonDetailPageForStudent from "../views/Lecturer/LessonDetail";
import AssignmentDetailPageForStudent from "../views/AssignmentDetail";

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
      {
        path: "/my-course/:id",
        element: <CourseDetailPageForStudent />,
        title: "My Courses Student",
      },
      {
        path: "lesson/:id",
        element: <LessonDetailPageForStudent />,
        title: "Lesson Detail",
      },
      {
        path: "assignment/:id",
        element: <AssignmentDetailPageForStudent />,
        title: "Assignment Detail",
      },
      {
        path: "/payment",
        element: <PaymentSuccess />,
        title: "Payment Success",
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
      {
        path: "list-course",
        element: <LecturerCourses />,
        title: "Lecturer List Course",
      },
      {
        path: "course-detail/:id",
        element: <CourseDetailPage />,
        title: "Course Detail",
      },
      {
        path: "lesson/:id",
        element: <LessonDetailPage />,
        title: "Lesson Detail",
      },
      {
        path: "assignment/:id",
        element: <AssignmentDetailPage />,
        title: "Assignment Detail",
      },
    ],
  },
];

export default pagesData;
