import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { AuthProvider } from "./AuthContext/authContext.jsx";
import { router } from "./Routes/index.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { BillsProvider } from "./AuthContext/BillsContext/billsContext.jsx";
import { VariationsProvider } from "./AuthContext/VariationsContext.jsx";
import { InvestmentProvider } from "./AuthContext/InvestmentContext/InvestmentContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <VariationsProvider>
    <AuthProvider>
      <BillsProvider>
        <InvestmentProvider>
  <RouterProvider router={router} /> 
  </InvestmentProvider>
  </BillsProvider>
    </AuthProvider>
  </VariationsProvider>
  </React.StrictMode>
);
