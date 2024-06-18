import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./global.css";

import HomePage from "./pages/Home";
import CalendarPage from "./pages/Calendar";
import DiaryPage from "./pages/Diary";
import ReportPage from "./pages/Report";
import SettingsPage from "./pages/Settings";
import SignInPage from "./pages/user/SignIn";
import SignUpPage from "./pages/user/SignUp";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "diary", element: <DiaryPage /> },
      { path: "report", element: <ReportPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <LoginPage /> */}
      {/* <SignUpPage /> */}
      {/* <HomePage /> */}
    </>
  );
}

export default App;
