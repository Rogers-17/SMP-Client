import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        username: "", 
        id: 0, 
        status: false,
      });

      useEffect(() => {
          const storedUser = localStorage.getItem("user");
          if(storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setAuthState({
              username: parsedUser.username,
              fullName: parsedUser.fullName,
              id: parsedUser.id , 
              status: true ,
            })
          }
      }, []);

      return (
        <AuthContext.Provider value={{ authState, setAuthState}}>
            {children}
        </AuthContext.Provider>
      );
};

export const useAuth = () => useContext(AuthContext);
