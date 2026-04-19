import React, { createContext, useContext, useState } from "react";

const userDataContext = createContext();

export const useUserData = () => {
  const context = useContext(userDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserContext");
  }
  return context;
};

const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <userDataContext.Provider value={{ user, setUser }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
