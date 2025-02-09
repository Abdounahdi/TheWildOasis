import { createContext } from "react";

const authContext = createContext();

function AuthProvider({ children }) {
    
    return <authContext.Provider>{children}</authContext.Provider>;
}
