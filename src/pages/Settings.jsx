import { useState } from "react";
import { Form } from "react-router-dom";
import UserSettings from "../components/Settings/UserSettings";
import ProfileSettings from "../components/Settings/ProfileSettings";
import RoutineSettings from "../components/Settings/RoutineSettings";
import "../styles/Settings.css";

export default function SettingsPage() {
  const [selectedMenu, setSelectedMenu] = useState("userSettings");

  const renderContent = () => {
    switch (selectedMenu) {
      case "userSettings":
        return <UserSettings />;
      case "profileSettings":
        return <ProfileSettings />;
      case "RoutineSettings":
        return <RoutineSettings />;
      default:
        return <UserSettings />;
    }
  };

  const handleLogoutClick = (event) => {
    event.preventDefault();
    if (window.confirm("로그아웃하시겠습니까?")) {
      const form = event.target.closest("form"); // form 요소를 찾아서 참조
      form.submit(); // form 요소의 submit 메서드를 호출
    }
  };

  return (
    <div className="settings-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li onClick={() => setSelectedMenu("userSettings")}>프로필 정보</li>
            <li onClick={() => setSelectedMenu("profileSettings")}>
              프로필 수정
            </li>
            <li onClick={() => setSelectedMenu("RoutineSettings")}>
              루틴 수정
            </li>
            <li>
              <Form action="/logout" method="post">
                <span onClick={handleLogoutClick}>로그아웃</span>
              </Form>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">{renderContent()}</main>
    </div>
  );
}
