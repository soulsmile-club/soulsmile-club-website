import React from 'react';
import '../css/Team.css';
import Sneha_Rampalli from '../images/team/Sneha_Rampalli.jpg';
import Wenhan_Zhang from '../images/team/Wenhan_Zhang.png';
import Sneha_Advani from '../images/team/Sneha_Advani.jpg';
import Hannah_Gonzalez from '../images/team/Hannah_Gonzalez.jpg';
import Wendy_Qian from '../images/team/Wendy_Qian.jpg';
import Nidhi_Reddy from '../images/team/Nidhi_Reddy.jpeg';

function Team() {
  return (
    <>
    <header className="App-header">
        <p>Meet the girls.</p>
    </header>  
    <h4 id="subtitle">We are a team of students and fresh graduates from University of Pennsylvania.</h4>
    <div className="flex-container-team">
      <div>
        <img id="team" src={Wenhan_Zhang}></img>
        <h4 id="name">Wenhan Zhang (Han)</h4>
        <h5 id="role">Founder, CEO</h5>
        <h4 id="major">Philosophy, CS</h4>
        <p id="description">Hi, I’m Han. A dreamer and an engineer, I believe that we 
        truly can change things. In Soulsmile Club, everyone can be significant, 
        generous and proud, for being part of social change every single day.</p>
        <p id="description">If I could give 30 soulsmiles every month, I would give them 
        to <a href="https://www.charitywater.org/" target="_blank" rel="noopener noreferrer">Charity: Water</a> and <a href="http://philosophizethis.org/" target="_blank" rel="noopener noreferrer">Philosophize This</a>.</p>
      </div>
      <div>
        <img id="team" src={Sneha_Rampalli}></img>
        <h4 id="name">Sneha Rampalli</h4>
        <h5 id="role">Co-Founder, CTO</h5>
        <h4 id="major">Computer Science</h4>
        <p id="description">Hi, I’m Sneha! As a graduate of Computer Science, I believe that 
          Soulsmile Club allows consumerism and social change to co-exist, 
          just through our everyday purchases.</p>
        <p id="description">If I could give 30 soulsmiles every month, I would give them 
        to <a href="https://aidindia.org/" target="_blank" rel="noopener noreferrer">Association for India's Development</a> and <a href="https://agapewebsite.org/" target="_blank" rel="noopener noreferrer">Agape International Missions</a>.</p>
      </div>
      <div>
        <img id="team" src={Sneha_Advani}></img>
        <h4 id="name">Sneha Advani</h4>
        <h5 id="role">Tech Developer</h5>
        <h4 id="major">Computer Science, Cognitive Science</h4>
        <p id="description">Hi, I’m Sneha! As a graduate of Computer Science and Cognitive 
        Science, I believe that human behavior at its core is driven by empathy, kindness, 
        and altruism. With Soulsmile Club, we can combine these natural forces for good 
        with everyday consumerism to amplify our impact and make a real change in the world.</p>
        <p id="description">If I could give 30 soulsmiles every month, I would give them 
        to <a href="https://www.nanhikali.org/" target="_blank" rel="noopener noreferrer">Project Nanhi Kali</a> and <a href="https://thelovelandfoundation.org/" target="_blank" rel="noopener noreferrer">The Loveland Foundation</a>.</p>
      </div>
      <div>
        <img id="team" src={Hannah_Gonzalez}></img>
        <h4 id="name">Hannah Gonzalez</h4>
        <h5 id="role">Partner Outreach</h5>
        <h4 id="major">Computer Science</h4>
        <p id="description">Hi, I’m Hannah. As a sophomore studying Computer Science, 
        I envision a world where donating through your daily purchases is possible and 
        Soulsmile Club is making that happen!</p>
        <p id="description">If I could give 30 soulsmiles every month, I would give them 
        to <a href="https://www.hsf.net/" target="_blank" rel="noopener noreferrer">Hispanic Scholarship Fund</a> and <a href="https://www.doctorswithoutborders.org/" target="_blank" rel="noopener noreferrer">Doctors Without Borders</a>.</p>
      </div>
      <div>
        <img id="team" src={Nidhi_Reddy}></img>
        <h4 id="name">Nidhi Reddy</h4>
        <h5 id="role">User Outreach</h5>
        <h4 id="major">Neuroscience, Healthcare Mgmt.</h4>
        <p id="description">Hi, I’m Nidhi! As a graduate of Neuroscience and Behavior, 
        I believe that Soulsmile Club can transform society by making activism a habit 
        and integrating it into our daily lives.</p>
        <p id="description">If I could give 30 soulsmiles every month, I would give them 
        to <a href="https://www.amnesty.org/" target="_blank" rel="noopener noreferrer">Amnesty International</a> and <a href="https://www.conservationfund.org/" target="_blank" rel="noopener noreferrer">The Conservation Fund</a>.</p>
      </div>
      <div>
        <img id="team" src={Wendy_Qian}></img>
        <h4 id="name">Wendy Qian</h4>
        <h5 id="role">Retailer Outreach</h5>
        <h4 id="major">Psychology, Fine Arts</h4>
        <p id="description">Hi! I’m Wendy. I believe in Soulsmile Club because it allows 
        us to disrupt traditional consumerism one soulsmile at a time.</p>        
        <p id="description">If I could give 30 soulsmiles every month, I would give them 
        to <a href="https://www.nokidhungry.org/" target="_blank" rel="noopener noreferrer">No Kid Hungry</a> and <a href="https://inliquid.org/" target="_blank" rel="noopener noreferrer">InLiquid</a>.</p>
      </div>
    </div>
    </>
  );
}

export default Team;
