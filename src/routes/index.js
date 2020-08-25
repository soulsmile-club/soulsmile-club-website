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
          console.log(res.records[j]);    
          const retailerName = res.records[j]["fields"]["Name"];
          const retailerDomain = res.records[j]["fields"]["Domain"];
          const retailerLink = res.records[j]["fields"]["Link"];
          const urlName = "/retailers/" + res.records[j]["fields"]["Keyword"];
          const extensionAllowed = res.records[j]["fields"]["Extension Allowed"];
          if (!extensionAllowed) {
            paths.push(<Route key={retailerName} path={urlName} exact render={() => {console.log(retailerName); return <RetailerPage retailerName={retailerName} retailerLink={retailerLink} retailerDomain={retailerDomain} />} } />);
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
    </Switch>}
    </>);
}