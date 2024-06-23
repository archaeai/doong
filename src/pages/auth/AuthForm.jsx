import { useState } from "react";
import { Link } from "react-router-dom";
import catImage from "../../assets/cat-logo.png";
import "./AuthForm.css";

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  linkTo,
  linkText,
}) {
  const [enteredValues, setEnteredValues] = useState({
    username: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(enteredValues);
  }

  return (
    <div className="card-container">
      <div className="card-box">
        <img src={catImage} alt="cat-image" className="cat-image" />
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <input
            type="text"
            name="username"
            placeholder="아이디를 입력해주세요"
            onChange={handleInputChange}
            value={enteredValues.username}
            aria-label="아이디"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleInputChange}
            value={enteredValues.password}
            aria-label="비밀번호"
            required
          />
          <button type="submit">{buttonText}</button>
        </form>
        <Link to={linkTo}>{linkText}</Link>
      </div>
    </div>
  );
}
