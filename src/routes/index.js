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

export default function Routes() {
  var data = JSON.parse(JSON.stringify(affiliatesData));

  var retailerPaths = Object.keys(data).map(key => {
    var urlName = "/retailers/" + data[key]["keyword"];
    if (!data[key]["extensionAllowed"]) {
      return <Route key={key} path={urlName} exact render={() => <RetailerPage retailerName={key} retailerInfo={data[key]} />} />
    } else {
      console.log(data);
      return <Route key={key} path={urlName} exact render={() => <></>} />
    }
  });

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/browser-extension" exact component={BrowserExtension} />
      <Route path="/how-it-works" exact component={HowItWorks} />
      <Route path="/how-to-use" exact component={HowToUse} />
      <Route path="/retailers" exact component={Retailers} />
      <Route path="/vision" exact component={Vision} />
      <Route path="/causes" exact component={Causes} />
      <Route path="/team" exact component={Team} />
      <Route path="/privacy-policy" exact component={PrivacyPolicy} />
      <Route path="/monthly-reports" exact component={MonthlyReports} />
      <Route path="/faq" exact component={FAQ} />
      {retailerPaths}
      {/* <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate /> */}
      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      {/* <Route component={SignIn} /> */}
    </Switch>
  );
}