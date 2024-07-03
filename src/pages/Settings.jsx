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

  return (
    <div className="settings-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li
              className={selectedMenu === "userSettings" ? "active" : ""}
              onClick={() => setSelectedMenu("userSettings")}
            >
              회원 정보
            </li>
            <li
              className={selectedMenu === "profileSettings" ? "active" : ""}
              onClick={() => setSelectedMenu("profileSettings")}
            >
              프로필 수정
            </li>
            <li
              className={selectedMenu === "RoutineSettings" ? "active" : ""}
              onClick={() => setSelectedMenu("RoutineSettings")}
            >
              루틴 수정
            </li>
            <li>
              <Form action="/logout" method="post">
                <button className="logout-button">로그아웃</button>
              </Form>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">{renderContent()}</main>
    </div>
  );
}
