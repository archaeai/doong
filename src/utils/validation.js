export function isNotEmpty(value) {
  return value && value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  return value && value.length >= minLength;
}

export function isEqualsToOtherValues(value, otherValue) {
  return value === otherValue;
}

export function isRadioSelected(value) {
  return value !== null && value !== undefined && value !== "";
}

export function isFileSelected(file) {
  return file && file.size > 0;
}

export const validateUserForm = (formData, formType) => {
  const newErrors = {};
  if (!isNotEmpty(formData.username)) {
    newErrors.username = "아이디를 입력해주세요.";
  }
  if (!isNotEmpty(formData.password)) {
    newErrors.password = "비밀번호를 입력해주세요.";
  } else if (!hasMinLength(formData.password, 6)) {
    newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
  }
  if (formType === "signup") {
    if (!isEqualsToOtherValues(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
  }
  return newErrors;
};

export const validateCatForm = (formData, step) => {
  const newErrors = {};
  if (step === 1) {
    if (!isNotEmpty(formData.name)) newErrors.name = "이름을 입력해주세요.";
    if (!isNotEmpty(formData.breed)) newErrors.breed = "품종을 선택해주세요.";
    if (!isNotEmpty(formData.birthDate))
      newErrors.birthDate = "출생일을 선택해주세요.";
    if (!isNotEmpty(formData.adoptDate))
      newErrors.adoptDate = "입양일을 선택해주세요.";
  } else if (step === 2) {
    if (!isFileSelected(formData.photo))
      newErrors.photo = "사진을 추가해주세요.";
    if (!isRadioSelected(formData.gender))
      newErrors.gender = "성별을 선택해주세요.";
    if (!isRadioSelected(formData.neutered))
      newErrors.neutered = "중성화 여부를 선택해주세요.";
    if (!isNotEmpty(formData.weight)) newErrors.weight = "체중을 입력해주세요.";
  } else if (step === 3) {
    if (!isNotEmpty(formData.vaccinationDate))
      newErrors.vaccinationDate = "종합접종일을 선택해주세요";
    if (!isNotEmpty(formData.heartwormDate))
      newErrors.heartwormDate = "심장사상충 접종일을 선택해주세요";
    if (!isNotEmpty(formData.litterDate))
      newErrors.litterDate = "전체 모래갈이일을 선택해주세요";
  }
  return newErrors;
};

export const validateDiaryForm = (formData) => {
  const newErrors = {};
  if (!isFileSelected(formData.photo_url))
    newErrors.photo_url = "사진을 추가해주세요.";
  if (!isRadioSelected(formData.mood)) newErrors.mood = "기분을 선택해주세요.";
  if (!isRadioSelected(formData.activity_level))
    newErrors.activity_level = "활동량을 선택해주세요.";
  if (!isRadioSelected(formData.portion_status))
    newErrors.portion_status = "식사량을 선택해주세요.";
  return newErrors;
};

export const validateEventForm = (formData) => {
  const newErrors = {};
  if (!isNotEmpty(formData.eventTitle)) {
    newErrors.eventTitle = "일정 제목을 입력하세요.";
  }
  if (!isNotEmpty(formData.selectedDate)) {
    newErrors.selectedDate = "날짜를 선택하세요.";
  }
  return newErrors;
};
