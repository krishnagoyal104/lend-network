import React from 'react';
import {Button, Icon, message} from 'antd';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Loader from './loader';
import {round, fromWei, toWei} from '../utils';

const SliderWithTooltip = createSliderWithTooltip(Slider);

class Timeline extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      display: 1
    };
  }

  onChangeDisplay = (val) => {
    this.setState({
      display: val + 1
    }, () => {
      var element = document.getElementById('form_container_right');
      element.scrollTop = element.scrollHeight - element.clientHeight;
    });
  }

  proceed = (key, display) => {
    this.props[key] ? this.onChangeDisplay(display) :
    message.error(`Please enter the ${key} to proceed.`);
  }

  render(){

    const {mode} = this.props;

    const slider =
    <SliderWithTooltip
      min={mode ? 25 : 0.1}
      max={mode ? 5000 : 20}
      step={mode ? 25 : 0.1}
      trackStyle={{ backgroundColor: '#007ee5', height: 10 }}
      handleStyle={{
        borderColor: 'blue',
        height: 28,
        width: 28,
        marginLeft: -14,
        marginTop: -9,
        backgroundColor: '#0F47A6',
      }}
      railStyle={{ backgroundColor: '#F7F9FB', height: 10 }}
      defaultValue={mode ? '25' : '5'}
      value={this.props.amount}
      onChange={(val) => this.props.onEnter('amount', val)}
    />

    const slider_interest = 
      <SliderWithTooltip
        min={3}
        max={100}
        step={1}
        trackStyle={{ backgroundColor: '#007ee5', height: 10 }}
        handleStyle={{
          borderColor: 'blue',
          height: 28,
          width: 28,
          marginLeft: -14,
          marginTop: -9,
          backgroundColor: '#0F47A6',
        }}
        railStyle={{ backgroundColor: '#F7F9FB', height: 10 }}
        defaultValue={20}
        value={this.props.interest}
        onChange={(val) => this.props.onEnter('interest', val)}
      />

    const renderDurationPicker = () => {
      const containers = [];
      for(let i=1; i<=12; i++){
        const days = 30 * i;
        containers.push(
          <div id="duration_sub_container" key={i} onClick={() => this.props.onEnter('duration', i)}>
            <span id={this.props.duration === i ? 'duration_sub_container_select' : null}>{days}</span>
          </div>
        );
      }
      return containers;
    }

    const {eth, dai, allowance} = this.props.balance;
    const toApprove = toWei(this.props.amount || '0') - allowance;
    const hasBalance = round(fromWei(dai), 2) > this.props.amount;

    return(
      <VerticalTimeline layout={'1-column'}>
        {this.state.display >= 1 &&
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        >
          <div className="timeline_event_container">
            <div>
              <p id="timeline_event_title">1. Chose collateral currency:</p>
              <span id="timeline_event_description">
                {
                  mode ? 'The maximux amount you can borrow will be 70% of the amount of collateral.' :
                  'Chose the currency you wish to receive as collateral.'
                }
              </span>
            </div>
            <div id="currencies">
              <div id="currencies_sub_container">
                <img className="timeline_event_img" src={require('../images/dai.svg')} />
                <p>Dai</p>
              </div>
              <p>(Support for multiple currencies to be added soon.)</p>
            </div>
            <Button className="timeline_event_button" size="large" onClick={() => this.onChangeDisplay(1)}>
              <Icon className="timeline_event_icon" type="right-circle" />
              <span>Next</span>
            </Button>
          </div>
        </VerticalTimelineElement>}
        {this.state.display >= 2 &&
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        >
          <div className="timeline_event_container">
            <div>
              <p id="timeline_event_title">
                {
                  mode ? '2. Enter amount to pledge as collateral:' :
                  '2. Enter the amount you wish to lend:'
                }
              </p>
              <span id="timeline_event_description">
                {
                  mode ? 'The maximux amount you can borrow will be 70% of the amount of collateral.' :
                  'Loan will be backed by collateral pledged by the borrower by an extra margin of 33% to act as safeguard.'
                }
              </span>
            </div>
            <div id="collateral_container">
              <div id="slider_container">
                {slider}
              </div>
              <div id="slider_input_container">
                <p id="slider_input_text">
                  {mode ? 'Enter collateral amount:' : 'Enter loan amount:'}
                </p>
                <input id="slider_input" type={'number'} value={this.props.amount} onChange={(e) => this.props.onEnter('amount', e.target.value)} />
                <p>{mode ? '(in Dai)' : '(in Eth)'}</p>
              </div>
              <div id="max_loan_container">
                <p id="max_loan_text">{mode ? 'Max Loan Amount:' : 'Backed by collateral:'}</p>
                <p id="max_loan_amount">
                  {mode ? `${round((this.props.amount * 3/4)/this.props.price, 3)} Eth` :
                    `${round((this.props.amount * 4 * this.props.price)/3, 3)} Dai`
                  }
                </p>
              </div>
            </div>
            <Button className="timeline_event_button" size="large" onClick={() => this.proceed('amount', 2)}>
              <Icon className="timeline_event_icon" type="right-circle" />
              <span>Next</span>
            </Button>
          </div>
        </VerticalTimelineElement>}
        {this.state.display >= 3 &&
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        >
          <div className="timeline_event_container">
            <div>
              <p id="timeline_event_title">3. Enter the duration of the loan in months:</p>
              <p id="timeline_event_description">
                Installments will be due at the end of every month. If the borrower fails to pay an installment,
                a fine of 5% will be added to the outstanding amount.
              </p>
            </div>
            <div id="duration_container">
              {renderDurationPicker()};
              <p>(in days)</p>
            </div>
            <Button className="timeline_event_button" size="large" onClick={() => this.proceed('duration', 3)}>
              <Icon className="timeline_event_icon" type="right-circle" />
              <span>Next</span>
            </Button>
          </div>
        </VerticalTimelineElement>}
        {this.state.display >= 4 &&
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        >
          <div className="timeline_event_container">
            <div>
              <p id="timeline_event_title">
                {mode ? '4. Enter the interest you are willing to pay:' :
                '4. Enter the interest you wish to receive:'
                }
              </p>
              <p id="timeline_event_description">
                {mode ? 'A reasonable amount of interest will attract lenders.' :
                'A reasonable amount of interest will attract borrowers.'
                }
              </p>
            </div>
            <div id="slider_container">
              {slider_interest}
              <p id="percentage_symbol">%</p>
            </div>
            <div id="interest_container">
              <p>Interest</p>
              <p id="interest_amount">{this.props.interest ? this.props.interest : 0}%</p>
            </div>
            <Button className="timeline_event_button" size="large" onClick={() => this.proceed('interest', mode ? 4 : 5)}>
              <Icon className="timeline_event_icon" type="right-circle" />
              <span>Next</span>
            </Button>
          </div>
        </VerticalTimelineElement>}
        {this.state.display >= 5 && mode &&
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        >
          <div className="timeline_event_container">
            <div>
              <p id="timeline_event_title">1. Approve collateral to Ethlend:</p>
              <p id="timeline_event_description">
                Approve the collateral tokens to the Ethlend contract.
                Once the loan request is submitted, these can be claimed only after all installments are paid.
              </p>
            </div>
            {
              hasBalance ?
              <div>
                <div id="timeline_approve_container">
                  <span id="timeline_approve_text">Collateral Amount:</span>
                  <span id="timeline_approve_amount">{this.props.amount} Dai</span>
                </div>
                <div id="timeline_approve_container">
                  <span id="timeline_approve_text">Approved:</span>
                  <span id="timeline_approve_amount">{round(fromWei(allowance), 2)} Dai</span>
                </div>
                <div id="timeline_approve_container">
                  <span id="timeline_approve_text">To Approve:</span>
                  <span id="timeline_approve_amount">{toApprove > 0 ? round((toApprove / 10**18), 2) : 0} Dai</span>
                </div>
              </div> :
              <div>
                <div id="timeline_approve_container">
                  <span id="timeline_approve_text">Collateral Amount:</span>
                  <span id="timeline_approve_amount">{this.props.amount} Dai</span>
                </div>
                <div id="timeline_approve_container">
                  <span id="timeline_approve_text">Your Dai Balance:</span>
                  <span id="timeline_approve_amount">{round(fromWei(dai), 2)} Dai</span>
                </div>
              </div>
            }
            {this.props.approve ? <img id="check_mark_image" src={require('../images/check-mark.svg')} /> :
              this.props.loading ? <Loader /> :
              <Button className="timeline_event_button" disabled={!hasBalance} size="large" onClick={() => {
                toApprove > 0 ? this.props.approveTokens(this.onChangeDisplay) : this.onChangeDisplay(5);
              }}>
                <Icon className="timeline_event_icon" type="right-circle" />
                <span>{toApprove > 0 ? 'Approve' : 'Next'}</span>
              </Button>
            }
            {
              !hasBalance &&
              <p id="steps_info">You dont't have enough dai. You can request some from the <span className="steps_link" onClick={this.props.navigate}>faucet</span>.</p>
            }
          </div>
        </VerticalTimelineElement>}
        {this.state.display >= 6 &&
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
        >
          <div className="timeline_event_container">
            <div>
              <p id="timeline_event_title">5. Submit Loan Request:</p>
              <p>Please keep in mind:</p>
              {mode ?
                <ul id="timeline_submit_pointers">
                  <li>Once you submit, your request will be visible to lenders who may chose to fund your request.</li>
                  <li>Installments(along with interest) will become due every 30 days.</li>
                  <li>Installments will default on non-payment within 7 days of becoming due.</li>
                  <li>Lender can claim the collateral only in the case of default.</li>
                  <li>Only the outstanding loan amount can be claimed as collateral.</li>
                </ul> :
                <ul id="timeline_submit_pointers">
                  <li>Once you submit, your offer will be visible to others who may chose to borrow from you.</li>
                  <li>Installments(along with interest) will be receivable every 30 days.</li>
                  <li>Collateral can be claimed in case of default by the borrower.</li>
                  <li>Only the outstanding loan amount can be claimed as collateral.</li>
                </ul>
              }
            </div>
            {this.props.loading ? <Loader /> :
              <Button className="timeline_event_button" size="large" onClick={() => this.props.submit(this.props.mode ? 'request' : '')}>
                <Icon className="timeline_event_icon" type="right-circle" />
                <span>Submit</span>
              </Button>}
          </div>
        </VerticalTimelineElement>}
      </VerticalTimeline>
    );
  }
}

export default Timeline;