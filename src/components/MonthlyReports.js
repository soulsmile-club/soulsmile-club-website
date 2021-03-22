import React from 'react';
import '../css/MonthlyReports.css';
import JuneJuly2020 from '../files/June-July-2020-Earnings-Report.pdf';
import Jan2021 from '../files/Jan-2021-Earnings-Report.pdf';

function MonthlyReports() {
    return (
        <>
        <header className="App-header">
            Our Monthly Earnings Reports
        </header>  
        <hr />
        <h4 id="subtitle">Our earnings reports are posted <span className="underline">every month</span> for full transparency.</h4>
        <p><a id="report" href={JuneJuly2020}>June &amp; July 2020 Commission Report</a></p>
        <p><a id="report" href={Jan2021}>January 2021 Commission Report</a></p>
        </>
    );
}

export default MonthlyReports;
