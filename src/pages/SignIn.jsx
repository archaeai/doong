import useFormState from "../hooks/useFormState";
import { Link, useNavigate } from "react-router-dom";
import { validateUserForm } from "../utils/validation";
import catImage from "../assets/cat-logo.png";
import "../styles/AuthForm.css";

export default function SignInPage() {
  const { formData, handleChange, handleSubmit, errors } = useFormState(
    {
      username: "",
      password: "",
    },
    validateUserForm,
    "signin"
  );

  const navigate = useNavigate();

  async function handleSignIn(data) {
    try {
      const response = await fetch("http://127.0.0.1/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: data.username,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("로그인 성공:", result);
      // JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", result.token);

      // 홈 화면으로 이동
      navigate("/");
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
    }
  }

  return (
    <div className="card-container">
      <div className="card-box">
        <img src={catImage} alt="cat-image" className="cat-image" />
        <form
          onSubmit={(event) => handleSubmit(event, handleSignIn)}
          noValidate
        >
          <h2>시작하기</h2>
          <input
            type="text"
            name="username"
            placeholder="아이디를 입력해주세요"
            onChange={handleChange}
            value={formData.username}
            aria-label="아이디"
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
            value={formData.password}
            aria-label="비밀번호"
            required
            minLength={6}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <button type="submit">로그인</button>
        </form>
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
}
