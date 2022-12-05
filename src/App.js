import "./styles.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "bootstrap/dist/css/bootstrap.css";
import SidePanel from "./SidePanel";
import cfg from "./config.json";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <h1 style={{ color: "#D6002A" }}>Platts API Data Explorer</h1>
      </div>
      <div className="row mt-2">
        <div className="col-4 col-xl-2 align-left">
          <SidePanel
            links={cfg}
            path={pathname.substring(1, pathname.length)}
          />
        </div>
        <div id="detail" className="col-8 col-xl-10">
          <Outlet />
          {/* <DataComponent /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
