import React, { useState, useEffect } from 'react';
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
import RetailerPage from '../components/RetailerPage';
import Join from '../components/Join';
import DashboardController from '../components/DashboardController';
import Website from '../components/Website';
import WebApp from '../components/WebApp';
import Login from '../components/Login';

export default function Routes() {
  var REACT_APP_AIRTABLE_RETAILERS_DOC = process.env.REACT_APP_AIRTABLE_RETAILERS_DOC;
  const [retailerPaths, setRetailerPaths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(REACT_APP_AIRTABLE_RETAILERS_DOC)
      .then(res => res.json())
      .then(res => {
        var paths = [];    
        for (var j = 0; j < res.records.length; j++) {
          const retailerName = res.records[j]["fields"]["Name"];
          const retailerDomain = res.records[j]["fields"]["Domain"];
          const retailerLink = res.records[j]["fields"]["Link"];
          const urlName = "/retailers/" + res.records[j]["fields"]["Keyword"];
          const extensionAllowed = res.records[j]["fields"]["Extension Allowed"];
          if (!extensionAllowed) {
            paths.push(<Route key={retailerName} path={urlName} exact render={() => {
              return <Website component=
                {<RetailerPage retailerName={retailerName} retailerLink={retailerLink} retailerDomain={retailerDomain} />}
                />
              }} />);
          } else {
            paths.push(<Route key={retailerName} path={urlName} exact render={() => <></>} />);
          }
        }
        return paths;
      }).then(res => {
        setRetailerPaths(res);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);
  
  return (<>
    {!isLoading &&
    <Switch>
      <Route path="/" exact render={() => <Website component={<Home />} />} />
      <Route path="/browser-extension" exact render={() => <Website component={<BrowserExtension />} />} />
      <Route path="/how-it-works" exact render={() => <Website component={<HowItWorks />} />} />
      <Route path="/how-to-use" exact render={() => <Website component={<HowToUse />} />} />
      <Route path="/retailers" exact render={() => <Website component={<Retailers />} />} />
      <Route path="/vision" exact render={() => <Website component={<Vision />} />} />
      <Route path="/causes" exact render={() => <Website component={<Causes />} />} />
      <Route path="/team" exact render={() => <Website component={<Team />} />} />
      <Route path="/join" exact render={() => <Website component={<Join />} />} />
      <Route path="/privacy-policy" exact render={() => <Website component={<PrivacyPolicy />} />} />
      <Route path="/monthly-reports" exact render={() => <Website component={<MonthlyReports />} />} />
      <Route path="/faq" exact render={() => <Website component={<FAQ />} />} />
      <Route path="/login" exact render={() => <WebApp component={<Login />} />} />
      <Route path="/dashboard" exact render={() => <WebApp component={<DashboardController />} />} />
      {retailerPaths}
    </Switch>}
    </>);
}