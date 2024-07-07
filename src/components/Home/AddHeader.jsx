export default function AddHeader({ openModal, cats, selectCat }) {
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

        <button className="add-cat-nav__button" onClick={openModal}>
          추가하기
        </button>
      </nav>
    </header>
  );
}
