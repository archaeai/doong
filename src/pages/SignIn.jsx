import useFormState from "../hooks/useFormState";
import { Link } from "react-router-dom";
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

  function handleSignIn(data) {
    console.log("로그인 데이터:", data);
    // 로그인 요청을 서버로 전송하는 로직 추가
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
