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
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import { CatProvider } from "./contexts/CatContext";
import { DiaryProvider } from "./contexts/DiaryContext";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "calendar",
        element: (
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "diary",
        element: (
          <ProtectedRoute>
            <DiaryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "report",
        element: (
          <ProtectedRoute>
            <ReportPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <CatProvider>
          <DiaryProvider>
            <RouterProvider router={router} />
          </DiaryProvider>
        </CatProvider>
      </AuthProvider>
    </>
  );
}

export default App;
