import { json, redirect } from "react-router-dom";

export async function signInAction({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await fetch("http://127.0.0.1/api/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: username,
        password: password,
      }),
    });

    const resData = await response.json();

    if (response.status === 400) {
      console.log("Error data:", resData);
      const errorDetail = resData.detail || "잘못된 요청입니다.";
      return json({ error: errorDetail }, { status: response.status });
    }

    if (!response.ok) {
      throw json({ message: "사용자를 인증할 수 없습니다." }, { status: 500 });
    }

    console.log("로그인 성공:", resData);

    const token = resData.token;

    localStorage.setItem("token", token);

    return redirect("/");
  } catch (error) {
    console.error("로그인 중 에러 발생:", error);
    return json(
      { errors: { general: "서버 오류 발생. 잠시 후 다시 시도해 주세요." } },
      { status: 500 }
    );
  }
}
