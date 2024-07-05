import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./global.css";

import HomePage from "./pages/Home";
import CalendarPage from "./pages/Calendar";
import DiaryPage from "./pages/Diary";
import ReportPage from "./pages/Report";
import SettingsPage from "./pages/Settings";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import RootLayout from "./pages/Root";
import { signInAction } from "./actions/signInAction";
import { signUpAction } from "./actions/signUpAction";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./utils/auth";

import { CatProvider } from "./contexts/CatContext";
import { RoutineProvider } from "./contexts/RoutineContext";
import { DiaryProvider } from "./contexts/DiaryContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: checkAuthLoader,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
        loader: checkAuthLoader,
      },
      {
        path: "diary",
        element: <DiaryPage />,
        loader: checkAuthLoader,
      },
      {
        path: "report",
        element: <ReportPage />,
        loader: checkAuthLoader,
      },
      {
        path: "settings",
        element: <SettingsPage />,
        loader: checkAuthLoader,
      },
      { path: "signin", element: <SignInPage />, action: signInAction },
      { path: "signup", element: <SignUpPage />, action: signUpAction },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <CatProvider>
        <RoutineProvider>
          <DiaryProvider>
            <RouterProvider router={router} />
          </DiaryProvider>
        </RoutineProvider>
      </CatProvider>
    </>
  );
}

export default App;
