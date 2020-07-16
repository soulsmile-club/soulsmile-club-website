import React from 'react';
import '../css/MonthlyReports.css';
import June2020 from '../files/June-2020-Earnings-Report.pdf';

function MonthlyReports() {
    return (
        <>
        <header className="App-header">
            <p>Our Monthly Earnings Reports.</p>
        </header>  
        <hr />
        <h4 id="subtitle">Our earnings reports are posted <span className="underline">every month</span> for full transparency.</h4>
        <a id="report" href={June2020}>June Commission Report</a>
        </>
    );
}

export default MonthlyReports;
