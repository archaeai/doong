import { useEffect, useState } from "react";

export default function UserSettings() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://127.0.0.1/api/users/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 403) {
          throw new Error(
            "Forbidden: You do not have permission to access this resource"
          );
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-settings">
      <ul className="user-settings__ul">
        <li className="user-settings__id-li">
          <span className="user-settings__id-label">사용자 ID:</span>
          <span className="user-settings__id">{userData.user_id}</span>
        </li>
      </ul>
    </div>
  );
}
