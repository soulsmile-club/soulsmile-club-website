import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { Button } from 'react-bootstrap';
import '../css/Payment.css';

const causes =[
    {value: 0, label: 'All Soulsmile Causes'},
    {value: 1, label: 'Education'},
    {value: 2, label: 'Global Health'},
    {value: 3, label: 'Racial Justice'},
    {value: 4, label: 'Humanitarian Aid'}
]

function Payment() {
    function useQuery() {
      return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();

    var oneTimeDonationButtons = (
            <PayPalButton
                amount={query.get("amount")}
                shippingPreference="NO_SHIPPING"
                onSuccess={(details, data) => {
                  alert("Transaction completed by " + details.payer.name.given_name);
                   return fetch("/paypal-transaction-complete", {
                    method: "post",
                    body: JSON.stringify({
                      orderID: data.orderID
                    })
                  });
                }}
                options={{
                  clientId: "sb"
                }}
            />
    );

    var subscriptionButtons;

  return (
    <>
    <div id="payPalButtons">
        {query.get("type") === "single" ?
            <>
            <header className="App-header">
                <span>Complete your ${query.get("amount")} donation for {causes[query.get("cause")].label}!</span>
            </header>
            {oneTimeDonationButtons}
            </>
        :
            <>
            <header className="App-header">
                <span>Complete your ${query.get("amount")} monthly donation to {causes[query.get("cause")].label}!</span>
            </header>
            {subscriptionButtons}
            </>
        }
        <a id="cancelButton" href="/dashboard">
            <Button bsPrefix="donateButton">Cancel Payment</Button>
        </a>
    </div>
    </>
  );
}

export default Payment;
