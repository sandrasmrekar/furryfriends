import React, { createContext, useContext } from "react";
import useStorage from "./useStorage";

const StorageContext = createContext<ReturnType<typeof useStorage> | undefined>(
  undefined
);

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const storage = useStorage();
  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error("useStorageContext must be used within a StorageProvider");
  }
  return context;
};
