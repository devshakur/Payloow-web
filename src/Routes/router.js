import { useMemo } from "react";  
import { useNavigate } from "react-router-dom";  

export function useRouter() {  
  const navigate = useNavigate();  

  const router = useMemo(  
    () => ({  
      back: () => navigate(-1),  
      forward: () => navigate(1),  
      push: (href) => navigate(href),  
      reload: () => window.location.reload(),  
    }),  
    [navigate]  
  );  

  return router;  
}