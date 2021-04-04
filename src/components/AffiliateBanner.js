import React, {useEffect} from 'react';
import '../css/AffiliateBanner.css';
import ExtensionTemp from '../images/extension_temp.jpeg';
import Button from 'react-bootstrap/Button';

var REACT_APP_AIRTABLE_RETAILERS_DOC = process.env.REACT_APP_AIRTABLE_RETAILERS_DOC;

function AffiliateBanner() {

    // const [normalRetailers, setNormalRetailers] = React.useState([]);
    // const [featuredRetailers, setFeaturedRetailers] = React.useState([]);
    const [adRetailer, setAdRetailer] = React.useState([]);

    useEffect(() => {
        fetch(REACT_APP_AIRTABLE_RETAILERS_DOC)
			.then(res => res.json())
			.then(res => {
                const data = res.records;
                data.sort(function (a, b) {
                    return ((a["fields"]["Name"] < b["fields"]["Name"]) ? -1 : (a["fields"]["Name"] > b["fields"]["Name"]) ? 1 : 0);
                });
                
                var currentAdRetailer = [];
                for (var j = 0; j < data.length; j++) {
                    const company = data[j]["fields"]["Name"];
                    const link = data[j]["fields"]["Link"];
                    // const banner = data[j]["fields"]["Banner"];

                    //TEMP TEST VALUE
                    if (company === "Girlfriend Collective") {
                        // currentAdRetailer = [company, link, banner];
                        currentAdRetailer = [company, link];
                    }
                }

                setAdRetailer(currentAdRetailer);      
			})
			.catch(error => console.log(error));
    }, []);


    return (
    <>
    <style type="text/css">
        {`
        .btn-round {
        border-radius: 50px;
        margin: 10px;
        color: #444444;
        }
        .btn-round:hover {
        background-color: #444444;
        }
        `}
    </style>
    <header className="App-header"></header>
    <div>
        <div>
            <img id="affImg" alt="" src={ExtensionTemp}></img>
        </div>
        <div id="affButton">
            <Button variant="outline-secondary btn-round" size="lg" href={adRetailer[1]} target="_blank" rel="noopener noreferrer">Shop at {adRetailer[0]} with soulsmile</Button>{' '}
        </div>
    </div>

    </>
    );
}

export default AffiliateBanner;