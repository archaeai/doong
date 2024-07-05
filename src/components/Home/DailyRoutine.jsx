import React from "react";

export default function DailyRoutine() {
  const checkboxes = document.querySelectorAll(".checklist__box");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        this.nextElementSibling.classList.add("checked");
      } else {
        this.nextElementSibling.classList.remove("checked");
      }
    });
  });

  return (
    <div className="home-schedule__container">
      <h3 className="home-schedule__heading">오늘 할일</h3>
      <ul className="checklist">
        <li className="checklist__li">
          <input className="checklist__box" type="checkbox" id="task1" />
          <label className="checklist__label" htmlFor="task1">
            밥
          </label>
        </li>
        <li className="checklist__li">
          <input className="checklist__box" type="checkbox" id="task2" />
          <label className="checklist__label" htmlFor="task2">
            물
          </label>
        </li>
        <li className="checklist__li">
          <input className="checklist__box" type="checkbox" id="task3" />
          <label className="checklist__label" htmlFor="task3">
            화장실 청소
          </label>
        </li>
        <li className="checklist__li">
          <input className="checklist__box" type="checkbox" id="task4" />
          <label className="checklist__label" htmlFor="task4">
            바닥 청소
          </label>
        </li>
        <li className="checklist__li">
          <input className="checklist__box" type="checkbox" id="task5" />
          <label className="checklist__label" htmlFor="task5">
            사냥놀이 15분
          </label>
        </li>
        <li className="checklist__li">
          <input className="checklist__box" type="checkbox" id="task6" />
          <label className="checklist__label" htmlFor="task6">
            빗질
          </label>
        </li>
        <li className="checklist__li">
          <input className="checklist__box" type="checkbox" id="task7" />
          <label className="checklist__label" htmlFor="task7">
            양치
          </label>
        </li>
      </ul>
    </div>
  );
}
