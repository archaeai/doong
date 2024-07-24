import { NavLink, useRouteLoaderData } from "react-router-dom";
import "../styles/MainNavigation.css";

export default function MainNavigation() {
  const token = useRouteLoaderData("root");

  if (!token) {
    return null;
  }
  return (
    <nav className="main-navigation">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            홈
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/calendar"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            달력
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/diary"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            일기
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/report"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            통계
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            설정
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
