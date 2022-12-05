function Metadata({ data }) {
  let meta = data?.metadata;
  meta = normalizeMetadata(meta);
  return (
    <div
      className="d-flex justify-content-end text-muted mt-2"
      style={{ gap: "25px" }}
    >
      <span>
        Page: <mark>{meta.page}</mark>
      </span>
      <span>
        Total Pages: <mark>{meta.totalPages}</mark>
      </span>
      <span>
        Total Records: <mark>{meta.count}</mark>
      </span>
      <span>
        Query Time: <mark>{meta.queryTime}</mark>
      </span>
    </div>
  );
}

function normalizeMetadata(metadata) {
  const snakeToCamel = (s) => s.replace(/(_\w)/g, (k) => k[1].toUpperCase());

  metadata = Object.entries(metadata).reduce(
    (x, [k, v]) => (x[snakeToCamel(k)] = v) && x,
    {}
  );

  return metadata;
}

export default Metadata;
