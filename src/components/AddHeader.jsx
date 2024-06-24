import { useContext } from "react";
import { CatContext } from "../contexts/CatContext";

export default function AddHeader({ openModal }) {
  const { cats, selectCat } = useContext(CatContext);

  return (
    <header>
      <nav>
        {cats.map((cat) => (
          <button key={cat.id} onClick={() => selectCat(cat)}>
            {cat.name}
          </button>
        ))}
        <button onClick={openModal}>+</button>
      </nav>
    </header>
  );
}
