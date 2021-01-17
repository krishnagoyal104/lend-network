import React from 'react';
import { Steps, Button, Icon } from 'antd';
import {round, fromWei} from '../utils';
import Loader from './loader';

const { Step } = Steps;

const offer_steps = [
  {
    title: 'Overview',
    description: 'Review specifications',
  },
  {
    title: 'Collateral',
    description: 'Approve Dai',
  },
  {
    title: 'Accept',
    description: 'Accept offer',
  },
];

const request_steps = [
  {
    title: 'Overview',
    description: 'Review specifications',
  },
  {
    title: 'Review Balance',
    description: 'Ether Balance',
  },
  {
    title: 'Accept',
    description: 'Accept request',
  },
];

class StepsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next = () => {
    this.setState((prevState) => ({
      current: prevState.current + 1
    }));
  }

  onChange = (current) => {
    this.setState(({
      current
    }));
  }

  render() {

    let {loanAmount, collateralAmount, installments, interest} =
    this.props.data;
    let {eth, dai, allowance} = this.props.balance;
    const toApprove = collateralAmount - allowance;
    const _amount = collateralAmount;
    const ethRequired = loanAmount - eth;
    loanAmount = round(fromWei(loanAmount), 2);
    collateralAmount = round(fromWei(collateralAmount), 2);
    allowance = round(fromWei(allowance), 2);
    const hasBalance = round(fromWei(dai), 2) > collateralAmount;  //comparison won't work on BN

    const {mode} = this.props;
    const steps = mode ? request_steps : offer_steps;

    return (
      <div>
        <Steps current={this.state.current} onChange={this.onChange}>
          {steps.map((item, index) => (
            <Step key={item.title} title={item.title} description={item.description}
            disabled={this.state.current < index} />
          ))}
        </Steps>
        <div className="steps-content">
          {this.state.current === 0 &&
          <div className="steps_container">
            <div className="steps_header">
              <span>{mode ? 'Request overview' : 'Offer overview'}</span>
            </div>
            <div className="steps_body">
              <div className="steps_keys_container">
                <p>Loan Amount</p>
                <p>Collateral Amount</p>
                <p>Installments</p>
                <p>Duration</p>
                <p>Interest</p>
              </div>
              <div className="steps_values_container">
                <p>{loanAmount} Eth</p>
                <p>{collateralAmount} Dai</p>
                <p>{installments}</p>
                <p>{installments * 30} days</p>
                <p>{interest} %</p>
              </div>
            </div>
            <div className="steps_button_container">
              <Button className="steps_button" size="large" onClick={this.next}>
                <Icon type="right-circle" />
                <span>Next</span>
              </Button>
            </div>
          </div>}
          {this.state.current === 1 &&
          <div className="steps_container">
            <div className="steps_header">
              <span>{mode ? 'Ether' : 'Collateral'}</span>
            </div>
            <div className="steps_body">
              <div className="steps_keys_container">
                <p>Your balance</p>
                <p>{mode ? 'Required Ether' : 'Required Colateral'}</p>
                <p>{!mode && 'Already Approved'}</p>
                <p>{mode ? (ethRequired > 0 && 'Required') : 'To Approve'}</p>
              </div>
              <div className="steps_values_container">
                <p>{round(fromWei(mode ? eth : dai), 2)}</p>
                <p>{mode ? `${loanAmount} Eth` : `${collateralAmount} Dai`}</p>
                <p>{!mode && `${allowance} Dai`}</p>
                <p>{mode ? (ethRequired > 0 && `${round(fromWei(ethRequired), 2)} Eth`) : toApprove > 0 ? `${round(fromWei(toApprove), 2)} Dai` : '0'}</p>
              </div>    
            </div>
            <div className="steps_button_container">
              {this.props.loading ? <Loader size={30} /> :
              (mode ?
                <Button className="steps_button" size="large" disabled={ethRequired > 0} onClick={this.next}>
                  <Icon type="right-circle" />
                  <span>Next</span>
                </Button> :
                <Button className="steps_button" size="large" disabled={!hasBalance} onClick={() => toApprove > 0 ? this.props.approve(_amount, this.next) : this.next()}>
                  <Icon type="right-circle" />
                  <span>{toApprove > 0 ? 'Approve' : 'Next'}</span>
                </Button>)
              }
            </div>
            {!mode && toApprove > 0 && <p id="steps_info">*Approve dai to our contract as collateral to proceed.</p>}
            {!mode && !hasBalance && <p id="steps_info">You don't have enough dai. You can request some from the <span className="steps_link" onClick={this.props.navigate}>faucet</span>.</p>}
            {mode && ethRequired > 0 && <p id="steps_info">Your account does not have sufficient ether. You can request some from the <span className="steps_link" onClick={this.props.navigate}>faucet</span>.</p>}
          </div>
          }
          {this.state.current === 2 &&
          <div className="steps_container">
            <div className="steps_header">
              <span>Accept Offer</span>
            </div>
            <div className="steps_body">
              {mode ?
                <ul id="steps_submit_pointers">
                  <li>Your account will immediately be debited with {loanAmount} Eth.</li>
                  <li>Installments are receivable at the end of every month.</li>
                  <li>Installments will include an interest of {interest}% on outstanding amounts.</li>
                  <li>Collateral can be claimed in case the borrower defaults at least two consecutive installments.</li>
                </ul> :
                <ul id="steps_submit_pointers">
                  <li>Your account will immediately be credited with {loanAmount} Eth.</li>
                  <li>Installments(principle + interest) are payable at the end of every month.</li>
                  <li>Default on installments will add 5% of the outstanding amount as fine.</li>
                  <li>Installments can be paid within 7 days of becoming due.</li>
                  <li>Collateral can be claimed after the entire loan is paid back.</li>
                </ul>
              }
            </div>
            <div className="steps_button_container">
              {this.props.loading ? <Loader size={30} /> :
              <Button className="steps_button" size="large" onClick={mode ? this.props.acceptRequest : this.props.acceptOffer}>
                <Icon type="right-circle" />
                <span>Accept</span>
              </Button>}
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default StepsView;