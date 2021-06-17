import React, { Suspense, createContext } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/Header";
import Home from "../pages/Home";

export const AppContext = createContext();

const Router = () => {
  const walletAddress = window.localStorage.getItem("walletAddress") || "";
  // set Wallet Address
  const setWalletAddress = (address) => {
    window.localStorage.setItem("walletAddress", address);
  };

  return (
    <Suspense>
      <AppContext.Provider value={{ walletAddress, setWalletAddress }}>
        <Header />
        <Switch>
          <Route exact path={"/"} component={Home} />
        </Switch>
      </AppContext.Provider>
    </Suspense>
  );
};

export default Router;
