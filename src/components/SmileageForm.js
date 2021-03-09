import React, { useEffect } from 'react';
import firebase from './Firebase.js';
import '../css/Feed.css';
import '../css/SmileageForm.css';
import { Button } from 'react-bootstrap';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';

const options =[
    {value: 0, label: 'All Soulsmile Causes'},
    {value: 1, label: 'Education'},
    {value: 2, label: 'Global Health'},
    {value: 3, label: 'Racial Justice'},
    {value: 4, label: 'Humanitarian Aid'}
]

const GreenCheckbox = withStyles({
  root: {
    color:"#70A36A",
    padding: "5px",
    '&$checked': {
      color: "#70A36A",
    },
  },
  checked: {},
})((props) => <Checkbox icon={<MdCheckBoxOutlineBlank size={35} />}
            checkedIcon={<MdCheckBox size={35} />} color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    minWidth: 120,
    fontFamily: 'Montserrat',
    margin: '20px',
    fontSize: '20px',
    color: '#444444'
  },
  menuItemStyle: {
    fontFamily: 'Montserrat',
    fontSize: '20px',
    color: '#444444'
  }
}));

function SmileageForm(props) {
    const classes = useStyles();

    const [posts, setPosts] = React.useState([]);
    const [uid, setUid] = React.useState('');

    const [subscriptionAmount, setSubscriptionAmount] = React.useState(50);
    const [subscriptionCause, setSubscriptionCause] = React.useState(0);
    const [processingChecked, setProcessingChecked] = React.useState(true);

    function updateChecked (event) {
        setProcessingChecked(event.target.checked);
    }

    useEffect(() => {
    }, []);


    function handleSubscriptionAmountInputClicked () {
        if (document.getElementById("subscriptionAmountInput").value) {
            setSubscriptionAmount(parseFloat(document.getElementById("subscriptionAmountInput").value).toFixed(1));
        }
    }

    return (
        <div className="feed">
            <div className="smileageQuestion">How many soulsmiles would you like to pledge each month?</div>
            <div className="smileageNote">If you give 50 soulsmiles or more a month, you will be considered a <span className="gold">Soulsmile Club Gold Member</span>! You can always cancel or change this subscription at any time.</div>
            <div className="buttonGroup">
                <Button bsPrefix="amountButton" active={subscriptionAmount === 30} onClick={() => setSubscriptionAmount(30)}>
                    30
                </Button>
                <Button bsPrefix="amountButton" active={subscriptionAmount === 50} onClick={() => setSubscriptionAmount(50)}>
                    50
                </Button>
                <Button bsPrefix="amountButton" active={subscriptionAmount === 100} onClick={() => setSubscriptionAmount(100)}>
                    100
                </Button>
                    <input id="subscriptionAmountInput" onClick={handleSubscriptionAmountInputClicked} className="amountInput" type="number" min="0.1" step="0.1" placeholder="Custom Amount" onChange={e => {if (e.target.value && e.target.value >= 0.1) { setSubscriptionAmount(parseFloat(e.target.value).toFixed(1))} else if (!e.target.value) { setSubscriptionAmount(50) } else { setSubscriptionAmount(0) }}}></input>
            </div>


            <div className="smileageQuestion">Which cause would you like to donate to?</div>
            <div className="smileageNote">Your donation will go directly to Soulsmile Club's carefully curated and vetted organizations that we believe are doing the best work in these areas!</div>
            <Select
              value={subscriptionCause}
              onChange={(e) => setSubscriptionCause(e.target.value)}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {options.map((cause, index) => (
                <MenuItem className={classes.menuItemStyle} key={cause.value} value={cause.value}>{cause.label}</MenuItem>
              ))}
            </Select>

            <div className="checkboxContainer"><GreenCheckbox checked={processingChecked} onChange={updateChecked} /> Add ${+(((0.029 * 0.1 * subscriptionAmount) + 0.3).toFixed(2))} to your monthly payment to cover processing fees?</div>
            <div className="smileageNote">If you cover processing fees, 100% of your donation will go towards your chosen cause!</div>

            <div>
            <a href={"/payment?type=subscription&amount=" + subscriptionAmount + "&cause=" + subscriptionCause}>
                <Button bsPrefix="amount submit">Pledge {subscriptionAmount} soulsmiles/month</Button>
            </a>
            </div>
        </div>
    );
  
}

export default SmileageForm;
