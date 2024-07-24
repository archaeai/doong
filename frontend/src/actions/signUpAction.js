import { json, redirect } from "react-router-dom";

export async function signUpAction({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await fetch("http://127.0.0.1/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: username,
        password: password,
      }),
    });

    const responseData = await response.json();

    if (response.status === 400) {
      console.log("Error data:", responseData);
      const errorDetail = responseData.detail || "잘못된 요청입니다.";
      return json({ error: errorDetail }, { status: response.status });
    }

    if (!response.ok) {
      throw json(
        { message: "회원가입 중 문제가 발생했습니다." },
        { status: 500 }
      );
    }

    console.log("회원가입 성공:", responseData);
    return redirect("/signin");
  } catch (error) {
    console.error("회원가입 중 에러 발생:", error);
    return json(
      { error: "서버 오류 발생. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
