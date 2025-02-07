import React, { useState, useEffect } from "react";
import { use } from "react";

const AuthContext = React.createContext();

export default function AuthContextProvider({ children }) {
const [token, settoken] = useState(null);
useEffect(() => {
  const storedtoken = localStorage.getItem("token");
  if (storedtoken) {
    settoken(storedtoken);
  }
}, []);

  return (
    <AuthContext.Provider value={{ token, settoken }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
