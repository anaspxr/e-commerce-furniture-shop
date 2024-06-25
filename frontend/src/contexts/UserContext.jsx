import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const userExists = JSON.parse(localStorage.getItem("currentUser"));
    if (userExists) {
      setCurrentUser(userExists);
    }
  }, []);

  function login(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
