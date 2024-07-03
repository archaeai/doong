import { useEffect } from "react";
import useFormState from "../hooks/useFormState";
import { Link, Form, useActionData } from "react-router-dom";
import { validateUserForm } from "../utils/validation";
import catImage from "../assets/cat-logo.png";
import "../styles/AuthForm.css";

export default function SignUpPage() {
  useEffect(() => {
    document.body.classList.add("auth");
    return () => {
      document.body.classList.remove("auth");
    };
  }, []);

  const { formData, handleChange, errors } = useFormState(
    {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validateUserForm,
    "signup"
  );

  const actionData = useActionData();

  return (
    <div className="card-container">
      <div className="card-box">
        <img src={catImage} alt="cat-image" className="cat-image" />
        <Form method="post" action="/signup" noValidate>
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
          {actionData?.error && <p className="error">{actionData.error}</p>}
        </Form>
        <Link to="/signin">뒤로가기</Link>
      </div>
    </div>
  );
}
