import UserForm from "./UserForm";

export default function SignInPage() {
  function handleSignIn(data) {
    console.log("로그인 데이터:", data);
    // 로그인 요청을 서버로 전송하는 로직 추가
  }

  return (
    <UserForm
      title="시작하기"
      buttonText="로그인"
      onSubmit={handleSignIn}
      linkTo="/signup"
      linkText="회원가입"
    />
  );
}
