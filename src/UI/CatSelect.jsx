import { useContext } from "react";
import { CatContext } from "../contexts/CatContext";

export default function CatSelect() {
  const { cats, selectedCat, selectCat } = useContext(CatContext);

  const handleSelectChange = (e) => {
    const selectedCatId = Number(e.target.value);
    const selectedCat = cats.find((cat) => cat.id === selectedCatId);
    if (selectedCat) {
      selectCat(selectedCat);
    } else {
      console.error(`Cat with id ${selectedCatId} not found`);
    }
  };

  return (
    <select
      className="cat-select"
      onChange={handleSelectChange}
      value={selectedCat ? selectedCat.id : ""}
    >
      <option value="" disabled>
        고양이 선택
      </option>
      {cats.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
