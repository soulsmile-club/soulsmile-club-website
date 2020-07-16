import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import HowItWorks from '../components/HowItWorks';
import Retailers from '../components/Retailers';
import Inspiration from '../components/Inspiration';
import WhoWeAre from '../components/WhoWeAre';
import Causes from '../components/Causes';
import BrowserExtension from '../components/BrowserExtension';
import Team from '../components/Team';
import PrivacyPolicy from '../components/PrivacyPolicy';
import MonthlyReports from '../components/MonthlyReports';
import HowToUse from '../components/HowToUse';
import FAQ from '../components/FAQ';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/browser-extension" exact component={BrowserExtension} />
      <Route path="/how-it-works" exact component={HowItWorks} />
      <Route path="/how-to-use" exact component={HowToUse} />
      <Route path="/retailers" exact component={Retailers} />
      <Route path="/inspiration" exact component={Inspiration} />
      <Route path="/who-we-are" exact component={WhoWeAre} />
      <Route path="/causes" exact component={Causes} />
      <Route path="/team" exact component={Team} />
      <Route path="/privacy-policy" exact component={PrivacyPolicy} />
      <Route path="/monthly-reports" exact component={MonthlyReports} />
      <Route path="/faq" exact component={FAQ} />
      {/* <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate /> */}
      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      {/* <Route component={SignIn} /> */}
    </Switch>
  );
}