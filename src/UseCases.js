function UseCases({ useCases, selectUseCase }) {
  return (
    <>
      {useCases.map((u, i) => (
        <span
          key={u.name}
          className="btn badge bg-dark bg-gradient m-1 text-light"
          onClick={(e) => selectUseCase(e, i)}
        >
          {u.name}
        </span>
      ))}
    </>
  );
}

export default UseCases;
