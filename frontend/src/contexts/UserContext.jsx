import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [redirectPath, setRedirectPath] = useState("/");
  const [currentUserEmail, setCurrentUserEmail] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  useEffect(() => {
    const userExists = JSON.parse(localStorage.getItem("currentUser"));
    if (userExists) {
      setCurrentUserEmail(userExists);
    }
  }, []);

  function login(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUserEmail(user);
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setCurrentUserEmail(null);
  }

  return (
    <UserContext.Provider
      value={{ currentUserEmail, login, logout, redirectPath, setRedirectPath }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
