import React, {useEffect} from 'react';
import '../css/Retailers.css';

var categories = ["General", "Clothing & Apparel", "Health & Beauty", "Electronics", "Home", "Food & Drink", "Shoes & Accessories", "Books", "Fitness", "Baby Products", "Gifts"]
var REACT_APP_AIRTABLE_RETAILERS_DOC = process.env.REACT_APP_AIRTABLE_RETAILERS_DOC;

function Retailers() {
    const [normalRetailers, setNormalRetailers] = React.useState([]);
    const [featuredRetailers, setFeaturedRetailers] = React.useState([]);
    useEffect(() => {
        fetch(REACT_APP_AIRTABLE_RETAILERS_DOC)
			.then(res => res.json())
			.then(res => {
                const data = res.records;
                console.log(data);
                data.sort(function (a, b) {
                    return ((a["fields"]["Name"] < b["fields"]["Name"]) ? -1 : (a["fields"]["Name"] > b["fields"]["Name"]) ? 1 : 0);
                });
				var categoryRetailers = [];
                var featuredCategoryRetailers = [];
                for (var i = 0; i < categories.length; i++) {
                    categoryRetailers.push([]);
                    featuredCategoryRetailers.push([]);
                }
                for (var j = 0; j < data.length; j++) {
                    const company = data[j]["fields"]["Name"];
                    const link = data[j]["fields"]["Link"];
                    const description = data[j]["fields"]["Description"];
                    const featured = data[j]["fields"]["Soulsmile Featured"];
                    const category = data[j]["fields"]["Category"];
                    const promo = data[j]["fields"]["Promo"];
                    const promoCode = data[j]["fields"]["Promo Code"];
                    if (featured) {
                        if (promo) {
                            featuredCategoryRetailers[categories.indexOf(category)].push(
                            <a href={link} id="retailer" target="_blank" rel="noopener noreferrer">
                                <div>
                                    {company}<b id="smile">*</b>
                                    <div id="company-description">{description}</div>
                                    <div id="promo-code">{promo} with promo code {promoCode} &#128522;</div>
                                </div>
                            </a>
                            );
                        } else {
                            featuredCategoryRetailers[categories.indexOf(category)].push(
                                <a href={link} id="retailer" target="_blank" rel="noopener noreferrer">
                                    <div>
                                        {company}<b id="smile">*</b>
                                        <p id="company-description">{description}</p>
                                    </div>
                                </a>
                            );
                        }
                    } else {
                        if (promo) {
                            categoryRetailers[categories.indexOf(category)].push(
                            <a href={link} id="retailer" target="_blank" rel="noopener noreferrer">
                                <div>
                                    {company}
                                    <div id="company-description">{description}</div>
                                    <div id="promo-code">{promo} with promo code {promoCode} &#128522;</div>
                                </div>
                            </a>
                            );
                        } else {
                            categoryRetailers[categories.indexOf(category)].push(
                                <a href={link} id="retailer" target="_blank" rel="noopener noreferrer">
                                    <div>
                                        {company}
                                        <p id="company-description">{description}</p>
                                    </div>
                                </a>
                            );
                        }
                    }
                }     
                setFeaturedRetailers(featuredCategoryRetailers);
                setNormalRetailers(categoryRetailers);
			})
			.catch(error => console.log(error));
    }, []);

    return (
        <>
        <header className="App-header">
            <span>Retailers to earn soul<span id="smile">smiles</span> with.</span>
        </header>
        <hr/>
        <p id="update"><b id="smile">*</b>Soul<span id="note">smile</span> Club featured brands for sustainable and ethical practices, 
        vetted based on <br/>
        <a href="https://goodonyou.eco/" target="_blank" rel="noopener noreferrer">Good on You</a>, <a href="https://www.crueltyfreekitty.com/" target="_blank" rel="noopener noreferrer">Cruelty-Free Kitty</a>, <a href="https://www.leapingbunny.org/" target="_blank" rel="noopener noreferrer">Leaping Bunny</a>, <a href="https://www.greenamerica.org/" target="_blank" rel="noopener noreferrer">Green America</a>, <a href="https://www.thegoodtrade.com/" target="_blank" rel="noopener noreferrer">The Good Trade</a>, and other brand ratings.</p>
        <div className="flex-container">
            {categories.map((cat, catIndex) => {
                return (
                    <div id="category" key={cat}>
                        <h4>{cat}</h4>
                        <div className="flex-container">
                            {featuredRetailers[catIndex]}
                            {normalRetailers[catIndex]}
                        </div>
                    </div>
                );
            })}
        </div>
        <p id="update"><span id="important">Disclosure:</span> As an affiliate of the above retailers, Soulsmile Club earns commission from qualifying purchases. 
        By clicking on any of the links above, you are giving us your consent to direct you to our affiliate link. 
        However, instead of keeping any commission we receive, we donate all of it to the causes listed  <a href="/causes">here</a>.</p>
        <p id="update"><span id="important">Note:</span> Early users of Soulsmile Club may notice that Amazon is no longer listed as a retailer. In order to better align with our mission to fuel social change through everyday consumerism,
        Amazon has been replaced with a sustainable alternative marketplace, <a href="https://earthhero.com?ref=soulsmileclub" target="_blank" rel="noopener noreferrer">Earth Hero</a>, 
        and we are working to add even more socially conscious retailers for you to choose from.</p>
        </>
    );
}

export default Retailers;
