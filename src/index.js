import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import EditContextProvider from './contexts/editContext';
import { store, persistor } from "./redux/store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
  <EditContextProvider>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </EditContextProvider>
  </Provider>,

  document.getElementById("root")
);
