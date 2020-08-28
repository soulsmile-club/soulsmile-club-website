import React, { useEffect } from 'react';
import '../css/FAQ.css';
import faqs from '../files/faqs.txt';

function FAQ() {
    const [allQAs, setAllQAs] = React.useState([]);
    useEffect(() => {
        async function handleText() {
            fetch(faqs)
                .then((r) => r.text())
                .then(text  => {
                    var fetchData = [];
                    var sections = text.split('\n');
                    for (var i = 0; i < sections.length; i++) {
                        var question = sections[i].split("|")[0];
                        var answer = sections[i].split("|")[1];
                        fetchData.push(
                            <div key={"question" + i}>
                            <input type="checkbox" id={"question" + i} name="q" className="questions"></input>
                              <div className="plus">+</div>
                              <label htmlFor={"question" + i} className="question">
                                {question}
                              </label>
                              <div className="answers">
                                {answer}
                              </div>
                            </div>
                        );
                    }     
                    setAllQAs(fetchData);    
                });
        }
        handleText();
    }, [allQAs]);
    return (
        <>
            <header className="App-header">
                FAQs
            </header>
            <hr />
            <div className="flex-container-faq">
                {allQAs}
            </div>
        </>
    );
}

export default FAQ;
