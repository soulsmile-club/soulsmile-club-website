import React, {useEffect} from 'react';
import '../css/AffiliateBanner.css';
import LogoImg from '../images/soulsmile-1024.png';
import ComputerImg from '../images/computer_affiliate_version.png';
import Button from 'react-bootstrap/Button';

import GirlfriendImg from '../images/product_girlfriend_img.jpeg';
import ByHumankindImg from '../images/product_byhumankind_img.jpeg';
import CicadaImg from '../images/product_cicada_img.jpeg';
import RocketbookImg from '../images/product_rocketbook_img.jpeg';

var REACT_APP_AIRTABLE_RETAILERS_DOC = process.env.REACT_APP_AIRTABLE_RETAILERS_DOC;

function AffiliateBanner(props) {

    const { collab } = props;

    const [adRetailer, setAdRetailer] = React.useState([]);
    
    useEffect(() => {
        fetch(REACT_APP_AIRTABLE_RETAILERS_DOC)
			.then(res => res.json())
			.then(res => {
                const data = res.records;

                //Set product_img
                var product_img;
                switch(collab) {
                    case 'Girlfriend Collective':
                        product_img = GirlfriendImg;
                        break;
                    case 'by Humankind':
                        product_img = ByHumankindImg;
                        break;
                    case 'Cicada':
                        product_img = CicadaImg;
                        break;
                    case 'Rocketbook':
                        product_img = RocketbookImg;
                        break;
                    default:
                        product_img = null;
                }
                
                var currentAdRetailer = [];
                for (var j = 0; j < data.length; j++) {
                    const company = data[j]["fields"]["Name"];
                    const link = data[j]["fields"]["Link"];
                    const affiliateNetwork = data[j]["fields"]["Affiliate Network"];
                    if (company && link && affiliateNetwork) {
                        var url = new URL(link);
                        if (affiliateNetwork == "Refersion") {
                            url = new URL(link);
                            url.searchParams.append("subid", "fromTab");
                        } else if (affiliateNetwork == "Tapfiliate") {
                            url = new URL(link);
                            url.searchParams.append("tm_uid", "fromTab");
                        } else if (affiliateNetwork == "Impact") {
                            url = new URL(link);
                            url.searchParams.append("subid1", "fromTab");
                        } else if (affiliateNetwork == "Rakuten") {
                            var fullLink = link.split("murl=");
                            var firstHalfLink = fullLink[0];
                            var secondHalfLink = fullLink[1];
                            url = new URL(firstHalfLink);
                            url.searchParams.append("u1", "fromTab");
                            url.searchParams.append("murl", decodeURIComponent(secondHalfLink));
                        }


                        if (company === collab) {
                            currentAdRetailer = [company, url.toString(), product_img];
                        }
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
    <div className="aff-flex-header">
        <div>
            <img id="logoImg" alt="" src={LogoImg}></img>
            <img id="computerImg" alt="" src={ComputerImg}></img>
            <p className="mainText">Download our extension to donate without spending extra. </p>
            <p className="explanation">When you shop through soulsmile club, we get a commission as a “thank you” from the retailer. Instead of keeping it, we give 100% of it back to you to donate to a diverse range of causes.</p>
        </div>
        <div>
            <div className="card-flex-content">
                <img id="affImg" alt="" src={adRetailer[2]}></img>
            </div>
            <br/>
            <div className="card-flex-content" id="affButton">
                <Button variant="outline-secondary btn-round" size="lg" href={adRetailer[1]} target="_blank" rel="noopener noreferrer">Shop at {adRetailer[0]} with soulsmile club</Button>{' '}
            </div>
        </div>
    </div>

    </>
    );
}

export default AffiliateBanner;
