import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { AuthProvider } from "./AuthContext/authContext.jsx";
import { router } from "./Routes/index.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
  <RouterProvider router={router} /> 
    </AuthProvider>
  </React.StrictMode>
);
