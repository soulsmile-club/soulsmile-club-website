import React, {useEffect} from 'react';
import '../css/Retailers.css';
import affiliatesData from '../files/affiliates.json';

var categories = ["General", "Clothing", "Health & Beauty", "Electronics", "Home", "Food & Drink", "Shoes"]

function Retailers() {
    const [normalRetailers, setNormalRetailers] = React.useState([]);
    const [featuredRetailers, setFeaturedRetailers] = React.useState([]);
    useEffect(() => {
        var data = JSON.parse(JSON.stringify(affiliatesData));
        var categoryRetailers = [];
        var featuredCategoryRetailers = [];
        for (var c in categories) {
            categoryRetailers.push([]);
            featuredCategoryRetailers.push([]);
        }
        for (var key in data) {
            var company = key;
            var link = data[key]["link"];
            var description = data[key]["description"];
            var featured = data[key]["soulsmile-featured"];
            var category = data[key]["category"];
            var promo = data[key]["promo"];
            var promoCode = data[key]["promo_code"];
            if (featured) {
                if (promo) {
                    featuredCategoryRetailers[categories.indexOf(category)].push(
                    <a key={company} href={link} id="retailer" target="_blank" rel="noopener noreferrer">
                        <div>
                            {company}<b id="smile">*</b>
                            <div id="company-description">{description}</div>
                            <div id="promo-code">{promo} with promo code {promoCode} &#128522;</div>
                        </div>
                    </a>
                    );
                } else {
                    featuredCategoryRetailers[categories.indexOf(category)].push(
                        <a key={company} href={link} id="retailer" target="_blank" rel="noopener noreferrer">
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
                    <a key={company} href={link} id="retailer" target="_blank" rel="noopener noreferrer">
                        <div>
                            {company}
                            <div id="company-description">{description}</div>
                            <div id="promo-code">{promo} with promo code {promoCode} &#128522;</div>
                        </div>
                    </a>
                    );
                } else {
                    categoryRetailers[categories.indexOf(category)].push(
                        <a key={company} href={link} id="retailer" target="_blank" rel="noopener noreferrer">
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
    }, []);

    return (
        <>
        <header className="App-header">
            <span>Retailers to earn soul<span id="smile">smiles</span> with.</span>
        </header>
        <hr/>
        <p id="update"><b id="smile">*</b>Soul<span id="note">smile</span> Club featured brands for sustainable and ethical practices, vetted based on <a href="https://goodonyou.eco/" target="_blank" rel="noopener noreferrer">Good on You</a> and <a href="https://www.crueltyfreekitty.com/" target="_blank" rel="noopener noreferrer">Cruelty-Free Kitty</a> brand ratings.</p>
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
