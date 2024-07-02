import useFormState from "../hooks/useFormState";
import { validateEventForm } from "../utils/validation";

const AddEventForm = ({ onSubmit, closeModal, initialDate }) => {
  const initialState = {
    eventTitle: "",
    selectedDate: initialDate,
  };

  const { formData, handleChange, handleSubmit, errors } = useFormState(
    initialState,
    validateEventForm
  );

  return (
    <div>
      <h2>일정 추가</h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e, (data) => {
            console.log("추가된 일정 데이터:", data); // 콘솔 로그
            onSubmit(data); // 데이터 제출
            closeModal(); // 모달 창 닫기
          });
        }}
      >
        <input
          type="text"
          name="eventTitle"
          placeholder="일정 제목"
          value={formData.eventTitle}
          onChange={handleChange}
        />
        {errors.eventTitle && <p>{errors.eventTitle}</p>}
        <input
          type="date"
          name="selectedDate"
          value={formData.selectedDate}
          onChange={handleChange}
        />
        {errors.selectedDate && <p>{errors.selectedDate}</p>}
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default AddEventForm;
