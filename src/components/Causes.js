import React, { useEffect, useState } from 'react';
import '../css/Causes.css';

function Causes() {
    var REACT_APP_AIRTABLE_ORGS_DOC = process.env.REACT_APP_AIRTABLE_ORGS_DOC;
    var causes = {};
    var [allCauses, setAllCauses] = useState([]);
    useEffect(() => {
        fetch(REACT_APP_AIRTABLE_ORGS_DOC)
        .then(res => res.json())
        .then(res => {
            const data = res.records;
            for (var i = 0; i < data.length; i++) {
                const cause = data[i]["fields"]["Cause"];
                const org = data[i]["fields"]["Organization"];
                const mission = data[i]["fields"]["Mission"];
                const website = data[i]["fields"]["Website"];
                const charityWatch = data[i]["fields"]["Charity Watch Rating"];
                const charityNavigator = data[i]["fields"]["Charity Navigator Rating"];
                const guideStar = data[i]["fields"]["GuideStar Rating"];
                if (!causes[cause]) {
                    causes[cause] = [{
                        "Organization": org,
                        "Mission": mission,
                        "Website": website,
                        "Charity Watch Rating": charityWatch,
                        "Charity Navigator Rating": charityNavigator,
                        "GuideStar Rating": guideStar
                    }];
                    
                } else {
                    causes[cause].push({
                        "Organization": org,
                        "Mission": mission,
                        "Website": website,
                        "Charity Watch Rating": charityWatch,
                        "Charity Navigator Rating": charityNavigator,
                        "GuideStar Rating": guideStar
                    });
                }
            }
            var finalCauses = [];
            for (const [cause, orgs] of Object.entries(causes)) {
                var causesRender = [];
                var missions = [];
                for (const [org, info] of Object.entries(orgs)) {
                    var tableEntry = (
                    <tr>
                        <td><a href={info["Website"]} target="_blank" rel="noopener noreferrer">{info["Organization"]}</a></td>
                        <td>{info["Mission"]}</td>
                        <td>{info["Charity Watch Rating"]}</td>
                        <td>{info["Charity Navigator Rating"]}</td>
                        <td>{info["GuideStar Rating"]}</td>
                    </tr>);
                    causesRender.push(tableEntry);
                }
                finalCauses.push(
                    <div id="causes">
                        <h2 id="causeHeader">{cause}</h2>
                        <table>
                        <colgroup>
                            <col span={"1"} className="column"/>
                            <col span={"1"} className="column"/>
                            <col span={"1"} className="column"/>
                            <col span={"1"} className="column"/>
                        </colgroup>
                        <tr>
                            <th>Organization</th>
                            <th>Mission</th>
                            <th>Charity Watch Rating</th>
                            <th>Charity Navigator Rating</th>
                            <th>GuideStar Rating</th>
                        </tr>
                            {causesRender}
                        </table>
                    </div>
                );
            }
            setAllCauses(finalCauses);
        })
    }, []);

    return (
        <>
        <header className="App-header">
            Curating impactful work.
        </header>
        <hr />
        <h4 id="monthly">We will distribute <span className="underline">all the commission</span> we receive among the following causes.<br/>
        Our earnings report will be posted <span className="underline">every month</span> for full transparency <a href="/monthly-reports">here.</a></h4>
        {allCauses}
        </>
    );
}

export default Causes;