import React from 'react';
import '../css/Causes.css';
import causesJSON from '../files/causes.json';

function Causes() {
    var allCauses = arrangeCausesData(JSON.parse(JSON.stringify(causesJSON)));

    function arrangeCausesData(causesData) {
        var causes = [];
        for (const cause in causesData) {
            var causesRender = [];
            for (var key in causesData[cause]) {
                causesRender.push(<a href={causesData[cause][key]} target="_blank" rel="noopener noreferrer">{key}</a>);
                causesRender.push(<br/>)
            }
            causes.push(
                <div>
                    <h4 className="underline" id="monthly">{cause}</h4>
                    {causesRender}
                </div>
            );
        }
        return causes;
    }

    return (
        <>
        <header className="App-header">
            <p>Curating impactful work.</p>
        </header>
        <hr />
        <h4 id="monthly">We will distribute <span className="underline">all the commission</span> we receive among the following causes.<br/>
        Our earnings report will be posted <span className="underline">every month</span> for full transparency <a href="/monthly-reports">here.</a></h4>
        <div className="flex-container-cause">
            {allCauses}
        </div>
        </>
    );
}

export default Causes;