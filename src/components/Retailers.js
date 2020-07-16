import React, {useEffect, useState} from 'react';
import '../css/Retailers.css';
import affiliatesData from '../files/affiliates.json';

function Retailers() {
    const [normalRetailers, setNormalRetailers] = React.useState([]);
    const [featuredRetailers, setFeaturedRetailers] = React.useState([]);
    useEffect(() => {
        var data = JSON.parse(JSON.stringify(affiliatesData));
        var featuredRetailers = [];
        var normalRetailers = [];
        for (var key in data) {
            var company = key;
            var link = data[key]["link"];
            var description = data[key]["description"];
            var featured = data[key]["soulsmile-featured"];
            if (featured) {
                featuredRetailers.push(
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <div>
                            {company}*
                            <p id="company-description">{description}</p>
                        </div>
                    </a>
                );
            } else {
                normalRetailers.push(
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <div>
                            {company}
                            <p id="company-description">{description}</p>
                        </div>
                    </a>
                );
            }
        }     
        setFeaturedRetailers(featuredRetailers);
        setNormalRetailers(normalRetailers);
    }, [featuredRetailers, normalRetailers]);
    return (
        <>
        <header className="App-header">
            <p>Retailers to earn soul<span id="smile">smiles</span> with.</p>
        </header>
        <hr/>
        <p id="update"><span id="important">Update:</span>
        <br/> In order to better align with our mission to fuel social change through everyday consumerism,
        Amazon has been replaced with a sustainable alternative marketplace, Earth Hero, 
        and we are working to add even more socially conscious retailers for you to choose from.</p>
        <div className="flex-container">
            {featuredRetailers}
            {normalRetailers}
        </div>
        <p id="update">*Soul<span id="note">smile</span> Club featured brands for sustainable and ethical practices.</p>
        </>
    );
}

export default Retailers;
