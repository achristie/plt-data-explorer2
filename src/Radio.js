function Radio({
  renderingStyle,
  setRenderingStyle,
  handleExport,
  disableExport
}) {
  const options = [
    { name: "table", label: "Table" },
    { name: "json", label: "JSON" }
  ];
  return (
    <div className="btn-toolbar flex-row">
      <div className="col">
        <div className="btn-group mb-2" role="group">
          {options.map((o) => (
            <Input
              key={o.name}
              name={o.name}
              label={o.label}
              renderingStyle={renderingStyle}
              setRenderingStyle={setRenderingStyle}
            />
          ))}
        </div>
      </div>
      <div className="btn-group mb-2 d-flex justify-content-end">
        <button
          onClick={handleExport}
          type="button"
          className="btn btn-sm btn-outline-secondary"
          disabled={disableExport}
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}

function Input({ name, label, renderingStyle, setRenderingStyle }) {
  return (
    <>
      <input
        key={name}
        type="radio"
        className="btn-check"
        name={name}
        id={name}
        value={name}
        autoComplete="off"
        checked={renderingStyle === name}
        onChange={(e) => setRenderingStyle(e.target.value)}
        // onClick={(e) => setRenderingStyle(e.target.value)}
      />
      <label className="btn btn-sm btn-outline-danger" htmlFor={name}>
        {label}
      </label>
    </>
  );
}

export default Radio;
