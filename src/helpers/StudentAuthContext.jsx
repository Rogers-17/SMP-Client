import { createContext, useContext, useEffect, useState } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [studentState, setStudentState] = useState({
        studentId: "", 
        id: 0, 
        role: "",
        status: false,
      });

      useEffect(() => {
          const storedStudent = localStorage.getItem("student");
          if(storedStudent) {
            setStudentState(JSON.parse(storedStudent));
            setLoading(false);
          }
      }, []);

      return (
        <StudentContext.Provider value={{ studentState, setStudentState, loading, setLoading}}>
            {children}
        </StudentContext.Provider>
      );
};

export const UseStudent = () => useContext(StudentContext);
