import { createContext } from "react";

interface SiteContextType {
  isLoading?: boolean;
  setIsLoading?: (loading: boolean) => void;
  user?: any;
  setUser?: (user: any) => void;
}

const SiteContext = createContext<SiteContextType>({});

export default SiteContext;