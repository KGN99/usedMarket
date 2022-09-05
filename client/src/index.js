import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages";
import store from "utils/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const rootNode = document.getElementById("root");
let persistor = persistStore(store);

ReactDOM.createRoot(rootNode).render(
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </CookiesProvider>
);
