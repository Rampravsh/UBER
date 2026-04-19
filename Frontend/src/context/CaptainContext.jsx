import React, { createContext, useContext, useState } from "react";

const CaptainDataContext = createContext();

export const useCaptainData = () => {
  const context = useContext(CaptainDataContext);
  if (context === undefined) {
    throw new Error("useCaptainData must be used within a CaptainContext");
  }
  return context;
};

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;