import React from 'react';
import extension from '../images/home-laptop.png';
import carouselOne from '../images/carousel-1.jpg';
import carouselTwo from '../images/carousel-2.jpg';
import circleSoulsmile from '../images/circle-soulsmile.jpg';
import donationFeed from '../images/donation-feed.png';
import feelImpact from '../images/feel-impact.png';
import help from '../images/help.png';
import helpOlu from '../images/help-olu.png';
import oluMily from '../images/olu-mily.jpg';
import oluSoulsmile from '../images/olu-soulsmile.png';
import '../css/Home.css';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import TextLoop from "react-text-loop";
// import { useLocation } from "@reach/router";
import AffiliateBanner from './AffiliateBanner';

function Home(props) {

  const { collab } = props;

  //Method:URLSearchParams
  //Tested with url: 'soulsmile.club/tab/?affiliate=girlfriend'


  //Attempt 1 - issue: Error: useLocation hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router
  // function useQuery() {
  //     return new URLSearchParams(useLocation().search);
  // }

  // let query = useQuery();
  // var affiliate = parseFloat(query.get("affiliate"));

  // if(affiliate == 'girlfriend') {
  //     collab = 'Girlfriend Collective';
  // }

  //Attempt 2 - issue: cannot get page to render with this method - just a blank white page
  // //change above: function Home({ location }, props) 
  // function useQuery() {
  //     return new URLSearchParams(location.search);
  // }

  // let query = useQuery();
  // var affiliate = parseFloat(query.get("affiliate"));

  // if(affiliate == 'girlfriend') {
  //     collab = 'Girlfriend Collective';
  // }
  
  return (
    <>
    <style type="text/css">
      {`
      .btn-round-header {
        width: 100%;
        max-width: 400px;
        border-radius: 50px;
        margin: 10px;
        color: #444444;
      }
      .btn-round {
        border-radius: 50px;
        margin: 10px;
        color: #444444;
      }
      .btn-round:hover {
        background-color: #444444;
      }
      .btn-middle-blue:hover {
        color: #444444;
        background-color: #DCEDFF;
      }
      .btn-middle-pink:hover {
        color: #444444;
        background-color: #F1DEDE;
      }
      .carousel-image {
        padding-bottom: 125px;
      }
      .carousel-caption {
        color: white;
        background-color: rgba(68, 68, 68, 0.5);
      }
      .carousel-control-next,
      .carousel-control-prev {
        filter: invert(100%);
      }
      `}
    </style>
    <div class="home-body">

      {/* TFAC Ternary Operator 1 */}
      {collab ? <div><AffiliateBanner collab={collab}/></div> : null }

      {/* TFAC Ternary Operator 2 */}
      {collab ?
      <div>
        <h3 id="home-story-header"><b>Meet Olu and Mily</b></h3>
      <Carousel>
        <Carousel.Item>
          <img width={400} height={150} alt="900x500" className="carousel-image" src={carouselOne}/>
          <div className="carousel-caption">
            <p>Hi, this is Olu.</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img width={400} height={150} alt="900x500" className="carousel-image" src={carouselTwo}/>
          <div className="carousel-caption">
            <p>Olu sometimes buys jackets, sometimes notebooks, <br/> and sometimes gifts for friends.</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img width={400} height={150} alt="900x500" className="carousel-image" src={help}/>
          <div className="carousel-caption">
            <p>Mily, living far away, is not doing well. <br/> Olu wants to help Mily, but is unsure how much they can do.</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img width={400} height={150} alt="900x500" className="carousel-image" src={helpOlu}/>
          <div className="carousel-caption">
            <p>On some days, Olu thinks, “Maybe it’s not my responsibility.” </p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img width={400} height={150} alt="900x500" className="carousel-image" src={oluSoulsmile}/>
          <div className="carousel-caption">
            <p>One day, Olu downloads the Soulsmile extension. <br/> Olu continues to buy jackets, notebooks, keyboards and gifts for friends.</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img width={400} height={150} alt="900x500" className="carousel-image" src={oluMily}/>
          <div className="carousel-caption">
            <p>Each time Olu shops in Soulsmile Club, Olu is doing something for Mily. <br/>On some days, Olu thinks, “Maybe we are all the same inside.“ </p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img width={400} height={150} alt="900x500" className="carousel-image" src={circleSoulsmile}/>
          <div className="carousel-caption">
            <p>And there are many more like them. </p>
          </div>
        </Carousel.Item>
      </Carousel>

      </div>
      :
      <header className="App-header-home">
          <img src={extension} className="App-logo-home" alt="logo" />
          <div id="slogan">
            <TextLoop>
                <span>Support <span id="smile">Global Health</span></span>
                <span>Stand with <span id="smile">Racial Justice</span></span>
                <span>Provide <span id="smile">Water &amp; Food Security</span></span>
                <span>Empower <span id="smile">Women</span></span>
            </TextLoop>{" "}
            <div className="subtitle-home">Donate <span id="emphasize">without spending extra</span> when shopping online.</div>
            <Button variant="outline-secondary btn-round-header" size="lg" href="https://tiny.cc/soulsmile-extension">Add to chrome</Button>{' '}
          </div><br/>       
      </header>
      } {/* TFAC Ternary Operator 2 End*/}

      {/* TFAC Ternary Operator 3 Start*/}
      {collab ?
      <header className="App-header-home">
          <img src={extension} className="App-logo-home" alt="logo" />
          <div id="slogan">
            <div className="subtitle-home">Soulsmile Club is no longer in operation. Thank you so much for your support. Goodbye and see you again.</div>
            <TextLoop>
                <span>Support <span id="smile">Global Health</span></span>
                <span>Stand with <span id="smile">Racial Justice</span></span>
                <span>Provide <span id="smile">Water &amp; Food Security</span></span>
                <span>Empower <span id="smile">Women</span></span>
            </TextLoop>{" "}
            <div className="subtitle-home">Donate <span id="emphasize">without spending extra</span> when shopping online.</div>
            <Button variant="outline-secondary btn-round-header" size="lg" href="https://tiny.cc/soulsmile-extension">Add to chrome</Button>{' '}
          </div><br/>       
      </header>
      :
      <div>
        <h3 id="home-story-header"><b>Meet Olu and Mily</b></h3>
        <Carousel>
          <Carousel.Item>
            <img width={400} height={150} alt="900x500" className="carousel-image" src={carouselOne}/>
            <div className="carousel-caption">
              <p>Hi, this is Olu.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img width={400} height={150} alt="900x500" className="carousel-image" src={carouselTwo}/>
            <div className="carousel-caption">
              <p>Olu sometimes buys jackets, sometimes notebooks, <br/> and sometimes gifts for friends.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img width={400} height={150} alt="900x500" className="carousel-image" src={help}/>
            <div className="carousel-caption">
              <p>Mily, living far away, is not doing well. <br/> Olu wants to help Mily, but is unsure how much they can do.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img width={400} height={150} alt="900x500" className="carousel-image" src={helpOlu}/>
            <div className="carousel-caption">
              <p>On some days, Olu thinks, “Maybe it’s not my responsibility.” </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img width={400} height={150} alt="900x500" className="carousel-image" src={oluSoulsmile}/>
            <div className="carousel-caption">
              <p>One day, Olu downloads the Soulsmile extension. <br/> Olu continues to buy jackets, notebooks, keyboards and gifts for friends.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img width={400} height={150} alt="900x500" className="carousel-image" src={oluMily}/>
            <div className="carousel-caption">
              <p>Each time, Olu is doing something for Mily. <br/>On some days, Olu thinks, “Maybe we are all the same inside.“ </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img width={400} height={150} alt="900x500" className="carousel-image" src={circleSoulsmile}/>
            <div className="carousel-caption">
              <p>And there are many more like them. </p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      } {/* TFAC Ternary Operator 3 End*/} 

      <div className="flex-container-how-home">
          <div>
              <p className="stepHome"><span className="numberCircleSmallHome">1.</span><br/> Add to Chrome.</p>
              <p className="explanation">The Soulsmile extension is free, safe, open-source and respects your privacy.</p>
          </div>
          <div>
              <p className="stepHome"><span className="numberCircleSmallHome">2.</span><br/> Earn cashback.</p>
              <p className="explanation">When you shop, Soulsmile Club earns commission as a "thank you" from the retailer for directing you to their site.</p>
          </div>
          <div>
              <p className="stepHome"><span className="numberCircleSmallHome">3.</span><br/> For donation.</p>
              <p className="explanation">Cashback will be added to your Soulsmile Wallet not as money for spending, but soulsmiles for donating. Choose which charity to give soulsmiles to in the Soulsmile web app. </p>
          </div>
      </div>
      <div className="feel-impact">
        <img src={feelImpact}/>
        <div className="feel-impact-description">
          <h3>Feel your impact growing <br/>every single day<br/> as you shop online.</h3>
          <p>Without spending extra, you can support impactful organizations around the world.</p>
          <Button variant="outline-secondary btn-round btn-middle-blue" size="lg" href="/login">Start Your Journey</Button>{' '}
        </div>
      </div>
      <br/>
      <div className="feel-impact">
        <div className="feel-impact-description">
          <h3>Donation feed, a social <br/>experience that centers<br/> around what you care about. </h3>
          <p>You are not alone in being part of the change you want to see.</p>
          <Button variant="outline-secondary btn-round btn-middle-pink" size="lg" href="/login">Join the Community</Button>{' '}
        </div>
        <img src={donationFeed}/>
      </div>
      <br/>
      <Button variant="outline-secondary btn-round" size="lg" href="/vision">Learn more about soul<span id="smile">smile</span> club</Button>{' '}
    </div>
    </>
  );
}

export default Home;
