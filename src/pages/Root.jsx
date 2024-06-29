import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <main>
        <Outlet />
      </main>
      {isAuthenticated && (
        <footer>
          <MainNavigation />
        </footer>
      )}
    </>
  );
}
