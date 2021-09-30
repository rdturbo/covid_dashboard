import React from "react";
import { Switch, Route } from "react-router-dom";
import withTracker from "../withTracker";

import Dashboard from "../components/Dashboard";
import USADetails from "../components/USADetails";
import IndiaDetails from "../components/IndiaStats";
import CountryHistory from "../components/CountryHistory";
import CountryDetails from "../components/CountryDetails";
import Illustration from "../components/Illustations";

const Routes: React.FC<{}> = () => {
  return (
    <Switch>
      <Route
        path="/country-history/:country_code"
        component={withTracker(CountryHistory)}
      />
      <Route
        path="/country-details/:country_code"
        component={withTracker(CountryDetails)}
      />
      <Route path="/country-india" component={withTracker(IndiaDetails)} />
      <Route path="/country-usa" component={withTracker(USADetails)} />
      <Route path="/illustration" component={withTracker(Illustration)} />
      <Route path="/dashboard" component={withTracker(Dashboard)} />
      <Route exact path="/" component={withTracker(Dashboard)} />
    </Switch>
  );
};

export default Routes;
