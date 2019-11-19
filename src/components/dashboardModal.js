import React from 'react';
import {Tag} from 'antd';
import Modal from 'react-modal';
import moment from 'moment';
import {round, fromWei} from '../utils';
import Button from './button';
import Loader from './loader';

const customStyles = {
  content : {
    height                : '500px',
    width                 : '500px',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    boxShadow             : '0 8px 12px 0 rgba(0,0,0,0.2)'
  },
  overlay: {
    zIndex: 2
  }
};

const color = (state) => {
  switch(state){
    case 'Pending':
      return 'red';
    case 'Accepted':
      return 'green';
    case 'Completed':
      return 'green';
    case 'Defauted':
      return 'red';
    case 'Settled':
      return 'green';        
  }
}

const DashboardModal = (props) => {

  let {state, loanAmount, collateralAmount, installments, installmentsPaid, interest, time} = props.data;
  const pricipleDue = loanAmount/installments;
  const interestDue = loanAmount * (installments - installmentsPaid)/installments * interest/100;
  const amountDue = pricipleDue + interestDue;
  loanAmount = round(fromWei(loanAmount), 2);
  collateralAmount = round(fromWei(collateralAmount), 2);
  const status = state === 'Accepted';
  console.log('fsdfsdf', amountDue, pricipleDue, interestDue);

	return(
		<Modal
      id="modal"
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="Dashboard"
      ariaHideApp={false}
      closeTimeoutMS={200}
    >
    	<div id="dashboard_modal_container">
        <div id="dashboard_modal_body">
          <div id="dashboard_modal_keys_container">
            <span>Status</span>
            <span>Amount borrowed</span>
            <span>Collateral pledged</span>
            <span>Interest</span>
            <span>Total installments</span>
            <span>Duration</span>
            {status && <span>{props.mode ? 'Installments paid' : 'Installments received'}</span>}
            {status && <span>{time && 'Next installment due'}</span>}
            {status && <span>Installment amount</span>}
          </div>
          <div id="dashboard_modal_values_container">
            <Tag id="dashboard_modal_tag" color={color(state)}>
              <span style={{color: color(state)}}>{state.toUpperCase()}</span>
            </Tag>
            <span>{loanAmount} Eth</span>
            <span>{collateralAmount} Dai</span>
            <span>{interest} %</span>
            <span>{installments}</span>
            <span>{installments * 30} days</span>
            {status && <span>{installmentsPaid}</span>}
            {status && <span>{moment.unix(time).add(30, 'days').format('LL')}</span>}
            {status && <span>{round(fromWei(amountDue), 2)}</span>}
          </div>
        </div>
        <div id="dashboard_modal_button_container">
          {props.loading ? <Loader /> : <div id="dashboard_modal_button"
          onClick={status ? () => props.pay(amountDue) : props.mode ? props.cancelRequest : props.cancelOffer}>
            <span id="dashboard_modal_button_text">{status ? 'Pay installment' : props.mode ? 'Cancel Request' : 'Cancel Offer'}</span>
          </div>}
        </div>
    	</div>
		</Modal>
	);

}

export default DashboardModal;