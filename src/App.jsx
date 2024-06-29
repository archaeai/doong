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

import { CatProvider } from "./contexts/CatContext";
import { DiaryProvider } from "./contexts/DiaryContext";

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
      <CatProvider>
        <DiaryProvider>
          <RouterProvider router={router} />
        </DiaryProvider>
      </CatProvider>
    </>
  );
}

export default App;
