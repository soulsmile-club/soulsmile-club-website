import React from 'react';
import '../css/Team.css';
import Sneha_Rampalli from '../images/team/Sneha_Rampalli.jpg';
import Wenhan_Zhang from '../images/team/Wenhan_Zhang.png';
import Sneha_Advani from '../images/team/Sneha_Advani.jpg';
import Hannah_Gonzalez from '../images/team/Hannah_Gonzalez.jpg';
import Shuke_Zeng from '../images/team/Shuke_Zeng.jpg';
import Regina_Oda from '../images/team/Regina_Oda.png';
import Brittany_Cho from '../images/team/Brittany_Cho.jpg';

function Team() {
  return (
    <>
    <header className="App-header">
        Meet the girls.
    </header>  
    <h4 id="subtitle">We are a team of students and fresh graduates from University of Pennsylvania.</h4>
    <div className="flex-container-team">
      <div>
        <img alt="" id="team" src={Wenhan_Zhang}></img>
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
        <img alt="" id="team" src={Sneha_Rampalli}></img>
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
        <img alt="" id="team" src={Sneha_Advani}></img>
        <h4 id="name">Sneha Advani</h4>
        <h5 id="role">Tech Developer</h5>
        <h4 id="major">Computer Science, Cognitive Science</h4>
        <p id="description">Hi, I’m Sneha! As a graduate of Computer Science and Cognitive 
        Science, I believe that human behavior is driven by empathy, kindness, 
        and altruism. With Soulsmile Club, we can combine these natural forces for good 
        with everyday consumerism to amplify our impact and make a real change in the world.</p>
        <p id="description">If I could give 30 soulsmiles every month, I would give them 
        to <a href="https://www.nanhikali.org/" target="_blank" rel="noopener noreferrer">Project Nanhi Kali</a> and <a href="https://thelovelandfoundation.org/" target="_blank" rel="noopener noreferrer">The Loveland Foundation</a>.</p>
      </div>
      <div>
        <img alt="" id="team" src={Hannah_Gonzalez}></img>
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
        <img alt="" id="team" src={Shuke_Zeng}></img>
        <h4 id="name">Shuke Zeng</h4>
        <h5 id="role">Designer</h5>
        <h4 id="major">Computer Science, English Literature, Business</h4>
        <p id="description">Hi, I’m Shuke! I am passionate about non-profit work personally, and I believe in achieving happiness through helping others.</p>
        <p id="description">If I could give 30 soulsmiles every month, I would give them 
        to <a href="https://www.rescue.org" target="_blank" rel="noopener noreferrer">International Rescue Committee</a> and <a href="https://www.equalitynow.org" target="_blank" rel="noopener noreferrer">Equality Now</a>.</p>
      </div>
      <div>
        <img alt="" id="team" src={Regina_Oda}></img>
        <h4 id="name">Regina Oda</h4>
        <h5 id="role">Tech Developer</h5>
        <h4 id="major">Computer Science, English Literature, Business</h4>
        <p id="description">Hi, I’m Regina! I believe that understanding, generosity, and goodwill can truly make a gigantic difference in our society, no matter how big or small. Helping even just one person can make the world a better place.</p>
        <p id="description">If I could give 30 soulsmiles every month, I would give them 
        to <a href="https://naacp.org" target="_blank" rel="noopener noreferrer">National Association for the Advancement of Colored People</a> and <a href="https://www.nokidhungry.org" target="_blank" rel="noopener noreferrer">No Kid Hungry</a>.</p>
      </div>
      <div>
        <img alt="" id="team" src={Brittany_Cho}></img>
        <h4 id="name">Brittany Cho</h4>
        <h5 id="role">Tech Developer</h5>
        <h4 id="major">Computer Science</h4>
        <p id="description">Hi, I’m Brittany! I believe in Soulsmile because I see an enormous potential to positively impact society through collective action when integrating social good with everyday purchases.</p>
        <p id="description">If I could give 30 soulsmiles every month, I would give them 
        to <a href="https://www.equalitynow.org" target="_blank" rel="noopener noreferrer">Equality Now</a> and <a href="https://www.conservation.org" target="_blank" rel="noopener noreferrer">Conservation International</a>.</p>
      </div>
    </div>
    </>
  );
}

export default Team;
