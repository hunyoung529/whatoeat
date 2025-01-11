import React, { createContext, useContext, useState, ReactNode } from "react";

interface IngredientContextValue {
  allData: any[];
  setAllData: React.Dispatch<React.SetStateAction<any[]>>;
}

const IngredientContext = createContext<IngredientContextValue | undefined>(
  undefined
);

export function IngredientProvider({ children }: { children: ReactNode }) {
  // 전역으로 관리할 allData
  const [allData, setAllData] = useState<any[]>([]);

  return (
    <IngredientContext.Provider value={{ allData, setAllData }}>
      {children}
    </IngredientContext.Provider>
  );
}

export function useIngredientContext() {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error(
      "useIngredientContext must be used within an IngredientProvider"
    );
  }
  return context;
}
