import { useContext } from "react";
import { InvestmentContext } from "../AuthContext/InvestmentContext/InvestmentContext";

const useInvestment = ()=> useContext(InvestmentContext)

export default useInvestment;