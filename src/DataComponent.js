import { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import FetchForm from "./FetchForm";
import AuthForm from "./AuthForm";
import Radio from "./Radio";
import Metadata from "./Metadata";
import ReactJson from "react-json-view";
import cfg from "./config.json";
import { useLoaderData } from "react-router-dom";
import { transformMarketData } from "./transform";
import fetchToCurl from "fetch-to-curl";

export async function loader({ params }) {
  let relevantConfig = cfg.filter((c) => c.path === params.dsn)[0];
  return relevantConfig;
}

function transformData(name, data) {
  switch (name) {
    case "market-data":
      return transformMarketData(data);

    default:
      return data;
  }
}

function DataComponent() {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [token, setToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [data, setData] = useState({});
  const [renderingStyle, setRenderingStyle] = useState("table");
  const [error, setError] = useState("");
  const pageData = useLoaderData();
  const [loading, setLoading] = useState(false);
  const gridRef = useRef();

  const defaultColDef = useMemo(() => {
    return {
      resizable: true
    };
  }, []);

  function generateCurl(url) {
    return fetchToCurl(url, getFetchOptions());
  }

  function getFetchOptions() {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        appkey: apiKey
      }
    };
  }

  async function handleFetch(e, url) {
    e.preventDefault();
    setLoading(true);
    const headers = getFetchOptions();
    const response = await fetch(url, headers);
    setLoading(false);
    if (response.ok) {
      setError("");
      let j = await response.json();
      setData(j);
      if (j.results.length === 0) {
        return;
      }
      let grid = transformData(pageData.path, j.results);
      setColumnDefs(Object.keys(grid[0]).map((d) => ({ field: d })));
      setRowData(grid);
    } else {
      let t = await response.text();
      setError(`[${response.status}] ${t}`);
    }
  }

  function handleExport() {
    gridRef.current.api.exportDataAsCsv();
  }

  return (
    <>
      <AuthForm token={token} setToken={setToken} setApiKey={setApiKey} />
      <FetchForm
        useCases={pageData.useCases}
        datasetUrl={pageData.dsn}
        endpoints={pageData.endpoints}
        handleFetch={handleFetch}
        errors={error}
        setError={setError}
        queryParams={pageData.params}
        loading={loading}
        generateCurl={generateCurl}
      />
      <Radio
        renderingStyle={renderingStyle}
        setRenderingStyle={setRenderingStyle}
        handleExport={handleExport}
        disableExport={rowData.length === 0}
      />
      <div
        className="ag-theme-alpine d-inline-block"
        style={{
          height: "600px",
          width: "100%",
          maxHeight: "600px"
        }}
      >
        <div
          style={{
            height: "100%",
            display: renderingStyle === "table" ? "block" : "none"
          }}
        >
          <AgGridReact
            style={{
              height: "100%"
            }}
            rowData={rowData}
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          ></AgGridReact>
        </div>
        <div
          className="card p-2 "
          style={{
            display: renderingStyle === "json" ? "block" : "none",
            maxHeight: "600px",
            overflowY: "scroll",
            marginBottom: "-6px"
          }}
        >
          <ReactJson src={data} groupArraysAfterLength={10} />
        </div>
      </div>
      {Object.keys(data).length > 0 && <Metadata data={data} />}
    </>
  );
}

export default DataComponent;
