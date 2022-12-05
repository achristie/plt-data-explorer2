import { useEffect, useMemo, useState } from "react";
import UseCases from "./UseCases";
// import Button from "react-bootstrap/Button";
// import Spinner from "react-bootstrap/Spinner";
import { Button, Spinner } from "react-bootstrap";

function FetchForm({
  useCases,
  endpoints,
  datasetUrl,
  handleFetch,
  errors,
  setError,
  queryParams,
  loading,
  generateCurl,
}) {
  const baseUrl = "https://api.platts.com";
  const [urlParams, setUrlParams] = useState({ ...queryParams });
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0].name);
  const [urlToFetch, setUrlToFetch] = useState(generateUrl());
  const [selectedUsecase, setSelectedUsecase] = useState(useCases[0]);

  useMemo(() => {
    const clone = JSON.parse(JSON.stringify(queryParams));
    setUrlParams(clone);
    setSelectedEndpoint(endpoints[0].name);
    setUrlToFetch(generateUrl());
  }, [queryParams, endpoints]);

  useMemo(() => {
    setUrlToFetch(generateUrl());
  }, [urlParams, selectedEndpoint]);

  function selectUseCase(e, idx) {
    let uc = useCases[idx];
    let obj = { ...urlParams };

    for (const key in urlParams) {
      obj[key].value = uc[key] || "";
    }

    setUrlParams(obj);

    setSelectedEndpoint(uc.endpoint);
    // handleFetch(e, urlToFetch)
  }

  function handleQpChange(e, obj, key) {
    let upd = {};
    obj["value"] = e;
    upd[key] = obj;
    setUrlParams((qp) => ({
      ...qp,
      ...upd,
    }));
  }

  function generateUrl() {
    let ep = endpoints.filter((e) => e.name === selectedEndpoint);
    if (ep.length === 0) {
      return;
    }
    let qs = new URLSearchParams();
    for (const key in urlParams) {
      if (urlParams[key].value) {
        qs.append(key, urlParams[key].value);
      }
    }
    return baseUrl + datasetUrl + ep[0].endpoint + "?" + qs.toString();
  }

  return (
    <form onSubmit={(e) => handleFetch(e, urlToFetch)}>
      <div className="card border border-0 bg-light mb-3 p-4">
        <div className="row mb-3">
          <div className="col">
            <UseCases useCases={useCases} selectUseCase={selectUseCase} />
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-sm-6">
            <input
              type="text"
              id="url"
              className="form-control"
              placeholder={baseUrl + datasetUrl}
              aria-label="URL"
              readOnly
            />
          </div>
          <div className="col-sm-6">
            <select
              className="form-select"
              value={selectedEndpoint}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
            >
              {endpoints.map((e) => (
                <option key={e.name}>{e.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row row-cols-2 mb-2 ">
          {urlParams &&
            Object.keys(urlParams).map((qp) => (
              <QueryParams
                id={qp}
                obj={urlParams[qp]}
                handleChange={handleQpChange}
                key={qp}
              />
            ))}
        </div>
        <div
          className="flex-row align-items-center mt-2 d-flex"
          style={{ gap: "40px" }}
        >
          <div className="text-truncate flex-fill">{urlToFetch}</div>
          <div className="justify-content-end">
            <div className="btn-group">
              <button
                onClick={() => navigator.clipboard.writeText(urlToFetch)}
                className="btn btn-light text-nowrap"
                type="button"
              >
                Copy URL
              </button>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(generateCurl(urlToFetch))
                }
                className="btn btn-light text-nowrap"
                type="button"
              >
                Copy cURL
              </button>
              <Button
                variant="success"
                type="submit"
                // onClick={(e) => handleFetch(e, generateUrl())}
                disabled={loading}
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                  />
                ) : (
                  "Fetch"
                )}
              </Button>
            </div>
          </div>
        </div>

        {errors && (
          <div className="flex-row mt-3 alert alert-danger mb-0" role="alert">
            {errors}
          </div>
        )}
      </div>
    </form>
  );
}

function QueryParams({ id, handleChange, obj }) {
  return (
    <div className="col mb-2">
      <div className="form-floating">
        <input
          type="text"
          id={id}
          className="form-control"
          placeholder={obj.display}
          value={obj.value || ""}
          onChange={(e) => handleChange(e.target.value, obj, id)}
        />
        <label htmlFor={id}>{obj.display}</label>
      </div>
    </div>
  );
}

export default FetchForm;
