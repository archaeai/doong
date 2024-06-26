import useFormState from "../hooks/useFormState";
import { Link } from "react-router-dom";
import { validateUserForm } from "../utils/validation";
import catImage from "../assets/cat-logo.png";
import "../styles/AuthForm.css";

export default function SignUpPage() {
  const { formData, handleChange, handleSubmit, errors } = useFormState(
    {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validateUserForm,
    "signup"
  );

  function handleSignUp(data) {
    console.log("회원가입 데이터:", data);
    // 회원가입 요청을 서버로 전송하는 로직 추가
  }

  return (
    <div className="card-container">
      <div className="card-box">
        <img src={catImage} alt="cat-image" className="cat-image" />
        <form
          onSubmit={(event) => handleSubmit(event, handleSignUp)}
          noValidate
        >
          <h2>가입하기</h2>
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요"
            onChange={handleChange}
            value={formData.confirmPassword}
            aria-label="비밀번호 확인"
            required
            minLength={6}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <button type="submit">회원가입</button>
        </form>
        <Link to="/signin">뒤로가기</Link>
      </div>
    </div>
  );
}
