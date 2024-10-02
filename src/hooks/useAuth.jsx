import { useContext } from "react";
import { AuthContext } from "../AuthContext/authContext";

const useAuth = ()=> useContext(AuthContext)

export default useAuth;