"use client";

import { createContext, useState } from "react";

interface AppContextInterface {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  return (
    <AppContext.Provider value={{ isDialogOpen, setIsDialogOpen }}>
      {children}
    </AppContext.Provider>
  );
};
