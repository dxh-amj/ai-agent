"use client";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "../store/store";

export const StoreProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            Loading...
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};
