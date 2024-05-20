import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "app/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import { Flowbite } from "flowbite-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Flowbite theme={{ mode: "dark" }}>
          <App />
        </Flowbite>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
