import React from "react";
import { Router } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Routes from "../Routes";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const Layout: React.FC<{}> = () => {
  return (
    <Router history={history}>
      <ScrollToTop />
      <Routes />
    </Router>
  );
};

export default Layout;
