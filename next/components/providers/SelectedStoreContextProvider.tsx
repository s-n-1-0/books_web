import { createContext, ReactNode, useContext, useState } from "react";
export type StoreType = "amazon" | "kinokuniya" | "honto";
export interface SelectedStoreContextType {
  selectedStore: StoreType;
  setSelectedStore: (storeKey: StoreType) => void;
}

export const SelectedStoreContext = createContext<SelectedStoreContextType>({
  selectedStore: "amazon",
  setSelectedStore: (storeKey: StoreType) => {},
});

export const SelectedStoreContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const context: SelectedStoreContextType = useContext(SelectedStoreContext);
  const [selectedStore, setSelectedStore] = useState(context.selectedStore);

  const newContext: SelectedStoreContextType = {
    selectedStore,
    setSelectedStore,
  };

  return (
    <SelectedStoreContext.Provider value={newContext}>
      {children}
    </SelectedStoreContext.Provider>
  );
};
