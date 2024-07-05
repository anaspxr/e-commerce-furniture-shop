import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [redirectPath, setRedirectPath] = useState("/");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  useEffect(() => {
    const userExists = JSON.parse(localStorage.getItem("currentUser"));
    if (userExists) {
      setCurrentUser(userExists);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.isAdmin);
    }
  }, [currentUser]);

  function login(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        logout,
        redirectPath,
        setRedirectPath,
        isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
