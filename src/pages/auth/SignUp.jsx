import AuthForm from "./AuthForm";

export default function SignUpPage() {
  function handleSignUp(data) {
    console.log("회원가입 데이터:", data);
    // 회원가입 요청을 서버로 전송하는 로직 추가
  }

  return (
    <AuthForm
      title="가입하기"
      buttonText="회원가입"
      onSubmit={handleSignUp}
      linkTo="/signin"
      linkText="뒤로가기"
    />
  );
}
