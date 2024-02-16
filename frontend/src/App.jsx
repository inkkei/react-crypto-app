import React from "react";
import { CryptoContextProvider } from "../src/context/crypto-context";
import AppLayout from "./components/layout/AppLayout";

const App = () => (
  <CryptoContextProvider>
    <AppLayout />
  </CryptoContextProvider>
);
export default App;
