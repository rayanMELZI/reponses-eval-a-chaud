import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await fetch(`$1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "Login successful") {
        setAuth(data.user);
        setRoles(data.roles);
        navigate("/Participant");
      } else {
        // handle login error
      }
    } catch (error) {
      // handle fetch error
    }
  };

  const logout = () => {
    setAuth(null);
    setRoles([]);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
