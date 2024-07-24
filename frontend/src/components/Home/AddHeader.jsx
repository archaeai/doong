export default function AddHeader({ openModal, cats, selectCat, selectedCat }) {
  return (
    <header className="add-cat-header">
      <nav className="add-cat-nav">
        {cats.map((cat) => (
          <button
            className={`added-cat-button ${
              selectedCat && selectedCat.id === cat.id ? "selected" : ""
            }`}
            key={cat.id}
            onClick={() => selectCat(cat)}
          >
            {cat.name}
          </button>
        ))}

        <button
          className={`add-cat-nav__button ${
            cats.length === 0 ? "first-add" : "subsequent-add"
          }`}
          onClick={openModal}
        >
          추가하기
        </button>
      </nav>
    </header>
  );
}
