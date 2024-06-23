import { NavLink } from "react-router-dom";
import "./MainNavigation.css";

export default function MainNavigation() {
  return (
    <nav className="main-navigation">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? ".active" : undefined)}
          >
            홈
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/calendar"
            className={({ isActive }) => (isActive ? ".active" : undefined)}
          >
            캘린더
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/diary"
            className={({ isActive }) => (isActive ? ".active" : undefined)}
          >
            일기
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/report"
            className={({ isActive }) => (isActive ? ".active" : undefined)}
          >
            통계
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? ".active" : undefined)}
          >
            설정
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
