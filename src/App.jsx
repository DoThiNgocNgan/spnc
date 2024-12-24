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
import TestPDF from './pages/TestPDF/TestPDF';
import UserMessages from './pages/UserMessages/UserMessages';
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

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
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-homework",
    element: (
      <ProtectedRoute>
        <UserHomework />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-course",
    element: (
      <ProtectedRoute>
        <UserCourse />
      </ProtectedRoute>
    ),
  },
  {
    path: "/assignment-creator",
    element: (
      <ProtectedRoute>
        <AssignmentCreator />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-assignment",
    element: (
      <ProtectedRoute>
        <AddAssignment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/list-homework",
    element: (
      <ProtectedRoute>
        <ListHomework />
      </ProtectedRoute>
    ),
  },
  {
    path: "/view-progress",
    element: (
      <ProtectedRoute>
        <ViewProgress />
      </ProtectedRoute>
    ),
  },
  {
    path: "/view-homework/:studentId",
    element: (
      <ProtectedRoute>
        <ViewHomework />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-home",
    element: (
      <ProtectedRoute>
        <AdminHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-dashboard",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-document",
    element: (
      <ProtectedRoute>
        <AddDocument />
      </ProtectedRoute>
    ),
  },
  {
    path: "/list-document",
    element: (
      <ProtectedRoute>
        <ListDocument />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-lesson",
    element: (
      <ProtectedRoute>
        <AddLesson />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-view-lesson",
    element: (
      <ProtectedRoute>
        <UserViewLesson />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-link",
    element: <ResetLink />,
  },
  {
    path: "/test-editor",
    element: (
      <ProtectedRoute>
        <TestEditer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-exercise",
    element: (
      <ProtectedRoute>
        <UserExercise />
      </ProtectedRoute>
    ),
  },
  {
    path: "/test-pdf",
    element: <TestPDF />,
  },
  {
    path: "/user-messages",
    element: (
      <ProtectedRoute>
        <UserMessages />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
