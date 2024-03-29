import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { ApolloProvider } from "@apollo/client";
//
import { client } from "./graphql/client";
import Router from "./router";
import Styles from "./globalStyles";
import i18n from "./translation";
import * as serviceWorker from "./serviceWorker";

dotenv.config();

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Styles />
        <Router />
      </I18nextProvider>
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
