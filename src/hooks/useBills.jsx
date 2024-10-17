import { useContext } from "react";
import { BillsContext } from "../AuthContext/BillsContext/billsContext";

const useBills = ()=> useContext(BillsContext)

export default useBills;