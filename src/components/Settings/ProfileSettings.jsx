import catImg from "../../assets/cat-image.png";

export default function ProfileSettings() {
  return (
    <div>
      <h1>프로필 수정</h1>
      <section>
        <img
          src={catImg}
          alt="cat-image"
          style={{ width: "60px", height: "60px", borderRadius: "50px" }}
        />
        <h3>고양이 이름</h3>
      </section>
    </div>
  );
}
