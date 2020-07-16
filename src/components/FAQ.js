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
                            <div>
                                <p>
                                    <span className="question">{question}</span>
                                    <br/>
                                    <span className="answer">{answer}</span>
                                </p>
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
                <p>FAQs</p>
            </header>
            <hr />
            <div className="flex-container-faq">
                {allQAs}
            </div>
        </>
    );
}

export default FAQ;
