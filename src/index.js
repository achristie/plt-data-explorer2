import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./error-page";
import DataComponent, { loader as dsnLoader } from "./DataComponent";
import Redirect from "./Redirect";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Redirect /> },
          {
            path: "/:dsn",
            element: <DataComponent />,
            loader: dsnLoader
          }
        ]
      }
    ]
  }
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
