import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import HowItWorks from '../components/HowItWorks';
import Retailers from '../components/Retailers';
import Vision from '../components/Vision';
import Causes from '../components/Causes';
import BrowserExtension from '../components/BrowserExtension';
import Team from '../components/Team';
import PrivacyPolicy from '../components/PrivacyPolicy';
import MonthlyReports from '../components/MonthlyReports';
import HowToUse from '../components/HowToUse';
import FAQ from '../components/FAQ';
import affiliatesData from '../files/affiliates.json';
import RetailerPage from '../components/RetailerPage';
import DashboardController from '../components/DashboardController';
import Payment from '../components/Payment';
import Website from '../components/Website';
import WebApp from '../components/WebApp';
import Login from '../components/Login';

export default function Routes() {
  var data = JSON.parse(JSON.stringify(affiliatesData));

  var retailerPaths = Object.keys(data).map(key => {
    if (!data[key]["extensionAllowed"]) {
      var urlName = "/retailers/" + data[key]["keyword"];
      return <Route key={key} path={urlName} exact render={() => <Website component={<RetailerPage retailerName={key} retailerInfo={data[key]} />} />} />
    }
  });

  return (
    <Switch>
      <Route path="/" exact render={() => <Website component={<Home />} />} />
      <Route path="/browser-extension" exact render={() => <Website component={<BrowserExtension />} />} />
      <Route path="/how-it-works" exact render={() => <Website component={<HowItWorks />} />} />
      <Route path="/how-to-use" exact render={() => <Website component={<HowToUse />} />} />
      <Route path="/retailers" exact render={() => <Website component={<Retailers />} />} />
      <Route path="/vision" exact render={() => <Website component={<Vision />} />} />
      <Route path="/causes" exact render={() => <Website component={<Causes />} />} />
      <Route path="/team" exact render={() => <Website component={<Team />} />} />
      <Route path="/privacy-policy" exact render={() => <Website component={<PrivacyPolicy />} />} />
      <Route path="/monthly-reports" exact render={() => <Website component={<MonthlyReports />} />} />
      <Route path="/faq" exact render={() => <Website component={<FAQ />} />} />
      <Route path="/login" exact render={() => <WebApp component={<Login />} />} />
      <Route path="/dashboard" exact render={() => <WebApp component={<DashboardController />} />} />
      <Route path="/payment" exact render={() => <WebApp component={<Payment />} />} />
      {retailerPaths}
    </Switch>
  );
}