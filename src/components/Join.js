import React, { useEffect } from 'react';
import '../css/Join.css';

function Join() {
    return (
        <>
            <header className="App-header">
                Join the team.
            </header>
            <hr />
            
            <div className="join-container-faq">
                <p className="join-header">Who are we</p>
                <p className="join-body">Soulsmile Club is a tech nonprofit started by Penn alums that seeks to combine philanthropy with everyday consumerism to make the world happier. Soulsmile Club is currently a Chrome browser extension that allows you to donate without spending extra when shopping online – like Honey for social good, in short. Currently, the Soulsmile extension works with over 90 retailers. </p>
                <br/>
                <p className="join-header">How Does Soulsmile Club Work</p>
                <p className="join-body">When you shop online through our banners or our browser extension, Soulsmile Club earns commission, also known as soulsmiles, on your qualifying purchases as a "thank you" from the retailer. Instead of keeping them, we direct all the commission we receive towards organizations working on the most pressing humanitarian issues today. This way, you can give back to your community without spending extra, and impactful organizations can get real financial support. </p>
                <br/>
                <p className="join-header">Who Should Join Us</p>
                <p className="join-body">
                    You should join the Soulsmile team if you:
                    <ul>
                        <li>Constantly think about how you can make the world better</li>
                        <li>Are optimistic about how technology, creativity and compassion combined can make a difference</li>
                        <li>Are interested to work and learn in a start-up environment and develop diverse skills as you work across functions</li>
                        <li>Are keen to learn from a passionate team of diverse academic backgrounds and professional achievements</li>
                    </ul>
                </p>
                <p className="join-header">Web Development Internship</p>
                <p className="join-role-header">Roles and Responsibilities</p>
                <p className="join-body">Work with the CTO and Tech Lead to build and improve on the Soulsmile extension and Soulsmile web app, both using web technologies</p>
                <p className="join-role-header">Basic Qualifications</p>
                <p className="join-body">Experience with web technologies (HTML/CSS, Javascript) and basic software development.</p>
                <br/>
                <p className="join-header">Social Media Marketing Internship</p>
                <p className="join-role-header">Roles and Responsibilities</p>
                <p className="join-body">
                    <ul>
                        <li>Work with the Social Media Lead to ideate and manage social media schedule</li>
                        <li>Work with the Soulsmile team to create engaging Instagram/LinkedIn posts</li>
                        <li>Create and manage Facebook and Instagram ad campaigns</li>
                    </ul>
                </p>
                <p className="join-role-header">Basic Qualifications</p>
                <p className="join-body">Experience creating promotional material (i.e. Canva).</p>
                <br/>
                <p className="join-header">Apply</p>
                <p className="join-body">Please apply at <a href="tiny.cc/soulsmile-intern-apply">tiny.cc/soulsmile-intern-apply</a>. Please email <a href="mailto:team@soulsmile.club">team@soulsmile.club</a> for any questions. </p>
            </div>
        </>
    );
}

export default Join;
