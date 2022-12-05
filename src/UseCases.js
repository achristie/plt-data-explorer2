function UseCases({ useCases, selectUseCase }) {
  return (
    <>
      {useCases.map((u, i) => (
        <button
          key={u.name}
          className="btn badge bg-dark bg-gradient m-1 text-light"
          onClick={(e) => selectUseCase(e, i)}
          type="button"
        >
          {u.name}
        </button>
      ))}
    </>
  );
}

export default UseCases;
