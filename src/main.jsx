import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import "./index.css";
import Auth from "./components/AuthenticationPage/Auth.jsx";
import PasswordIssue from "./components/AuthenticationPage/password-issues/PasswordIssue.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pswdissue",
    element: <PasswordIssue />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
