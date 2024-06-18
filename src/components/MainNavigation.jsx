import { NavLink } from "react-router-dom";

export default function MainNavigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">홈</NavLink>
        </li>
        <li>
          <NavLink to="/calendar">캘린더</NavLink>
        </li>
        <li>
          <NavLink to="/diary">일기</NavLink>
        </li>
        <li>
          <NavLink to="/report">통계</NavLink>
        </li>
        <li>
          <NavLink to="/settings">설정</NavLink>
        </li>
      </ul>
    </nav>
  );
}
