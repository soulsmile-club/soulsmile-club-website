import React from 'react';
import extension from '../images/home-laptop.png';
import carouselOne from '../images/carousel-1.jpg';
import carouselTwo from '../images/carousel-2.jpg';
import '../css/Home.css';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel'

function Home() {
  return (
    <>
    <style type="text/css">
      {`
      .btn-round-header {
        width: 100%;
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
      img {
        padding-bottom: 100px;
      }
      .carousel-caption {
        color: black;
      }
      .carousel-control-next,
      .carousel-control-prev {
        filter: invert(100%);
      }
      `}
    </style>
    <header className="App-header-home">
        <img src={extension} className="App-logo" alt="logo" />
        <div id="slogan">
          Support <span id="smile">Global Health</span>.<br/>
          Stand with <span id="smile">Racial Justice</span>.<br/>
          Provide Water &amp; <span id="smile">Food Security</span>.<br/>
          <div className="subtitle-home">Donate <span id="emphasize">without spending extra</span> when shopping online.</div>
          <Button variant="outline-secondary btn-round-header" size="lg" href="https://tiny.cc/soulsmile-extension">Add to chrome</Button>{' '}
        </div><br/>       
    </header>
    <h3 id="home-story-header"><b>Meet Olu and Mily</b></h3>
    <Carousel>
      <Carousel.Item>
        <img width={400} height={150} alt="900x500" src={carouselOne}/>
        <div className="carousel-caption">
          <p>Hi, this is Olu.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img width={400} height={150} alt="900x500" src={carouselTwo}/>
        <div className="carousel-caption">
          <p>Olu sometimes buys <span id="smile">jackets</span>, sometimes <span id="smile">notebooks</span>, <br/> and sometimes <span id="smile">gifts for friends</span>.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img width={400} height={150} alt="900x500" src={carouselOne}/>
        <div className="carousel-caption">
          <p>Hi, this is Olu.</p>
        </div>
      </Carousel.Item>
    </Carousel>
    <Button variant="outline-secondary btn-round" size="lg" href="/how-it-works">Interested in learning more?</Button>{' '}
    </>
  );
}

export default Home;
