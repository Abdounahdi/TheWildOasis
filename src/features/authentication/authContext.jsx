import { createContext, useState } from "react";

const authContext = createContext();

export default function AuthProvider({ children }) {
  return <authContext.Provider>{children}</authContext.Provider>;
}

// function useAuth() {
//   const context = useContext(authContext);
//   if (context === undefined) {
//     throw new Error("Auth context was used outside its provider ");
//   }
// }
