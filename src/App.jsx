import React from "react";
import Home from "./pages/Home/Home";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Admin from "./pages/Admin/Admin";
import UserHomework from "./pages/UserHomework/UserHomework";
import UserCourse from "./pages/UserCourse/UserCourse";
import SignIn from "./pages/SignIn/SignIn";
import AssignmentCreator from "./pages/AssignmentCreator/AssignmentCreator";
import AddAssignment from "./pages/AdminAddAssignment/AddAssignment";
import ListHomework from "./pages/AdminListHomework/ListHomework";
import ViewProgress from "./pages/AdminViewProgress/ViewProgress";
import ViewHomework from "./pages/AdminViewHomework/ViewHomework";
import AdminHome from "./pages/AdminHome/AdminHome";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import AddDocument from "./pages/AdminAddDocument/AddDocument";
import ListDocument from "./pages/AdminListDocument/ListDocument";
import AddLesson from "./pages/AdminAddLesson/AddLesson";
import UserViewLesson from "./pages/UserViewLesson/UserViewLesson"; 
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ResetLink from "./pages/ResetLink/ResetLink";
import TestEditer from "./pages/TestEditer/TestEditer"; 
import UserExercise from "./pages/UserExercise/UserExercise"
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/user-homework",
    element: <UserHomework />,
  },
  {
    path: "/user-course",
    element: <UserCourse />,
  },
  {
    path: "/assignment-creator",
    element: <AssignmentCreator />,
  },
  {
    path: "/add-assignment",
    element: <AddAssignment />,
  },
  {
    path: "/list-homework",
    element: <ListHomework />,
  },
  {
    path: "/view-progress",
    element: <ViewProgress />,
  },
  {
    path: "/view-homework",
    element: <ViewHomework />,
  },
  {
    path: "/admin-home",
    element: <AdminHome />,
  },
  {
    path: "/user-dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/add-document",
    element: <AddDocument />,
  },
  {
    path: "/list-document",
    element: <ListDocument />,
  },
  {
    path: "/add-lesson",
    element: <AddLesson />,
  },
  {
    path: "/user-view-lesson",
    element: <UserViewLesson />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  }, 
  {
    path: "/reset-link",
    element: <ResetLink />,
  },
  {
    path: "/test-editor",
      element: <TestEditer />,
  },
  {
   path: "/user-exercise",
      element: <UserExercise />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
