import React from 'react';
import '../css/HowItWorks.css';
import { AiOutlineShopping } from 'react-icons/ai';
import { BsCreditCard } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa';

function HowItWorks() {
  return (
    <>
    <header className="App-header">
        How does it work?
    </header>
    <hr />
    <div className="flex-container-how">
        <div>
            <AiOutlineShopping size={150} style={{color: '#444444'}}/>
            <p className="step"><span class="numberCircleSmall">1</span> Download the Soul<span id="smile">smile</span> extension <a href="https://tiny.cc/soulsmile-extension" target="_blank" rel="noopener noreferrer">here</a> or shop with any of our partner retailers <a href="/retailers">here</a>.</p>
        </div>
        <div>
            <BsCreditCard size={150} style={{color: '#444444'}}/>
            <p className="step"><span class="numberCircleSmall">2</span> When you purchase qualifying items, Soul<span id="smile">smile</span> Club earns commission as a "thank you" from the retailer for directing you to their site.</p>
        </div>
        <div>
            <FaRegHeart size={150} style={{color: '#444444'}}/>
            <p className="step"><span class="numberCircleSmall">3</span> We direct ALL the commission to <a href="/causes">impactful organizations.</a></p>
        </div>
    </div>
    </>
  );
}

export default HowItWorks;
