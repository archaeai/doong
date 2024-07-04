import { useContext } from "react";
import { CatContext } from "../contexts/CatContext";

export default function AddHeader({ openModal }) {
  const { cats, selectCat } = useContext(CatContext);

  return (
    <header className="add-cat-header">
      <nav className="add-cat-nav">
        {cats.map((cat) => (
          <button
            className="added-cat-button"
            key={cat.id}
            onClick={() => selectCat(cat)}
          >
            {cat.name}
          </button>
        ))}
        <button className="add-cat-button" onClick={openModal}>
          +
        </button>
      </nav>
    </header>
  );
}
