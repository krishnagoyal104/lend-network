import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import { Result, Button } from 'antd';
import {closeModal} from '../actions/modal';

const customStyles = {
  content : {
    height                : '400px',
    width                 : '600px',
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

const ResultModal = (props) => {

  const path = props.location.pathname;

	return(
		<Modal
      id="modal"
      isOpen={props.modal.isOpen}
      onRequestClose={() => props.dispatch(closeModal())}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Transaction Result"
    >
    	<div id="result_modal_container">
      	<Result
		    status="success"
		    title="Transaction Successful"
		    subTitle="The transaction has been successfully submitted."
		    extra={[
		      <Button type="primary" key="console" onClick={() => {
            props.history.push({
              pathname: `/dashboard${props.modal.path}`,
              state: {
                refetch: true
              }
            });
            props.dispatch(closeModal());
          }}>
		        Go to dashboard
		      </Button>,
		      <Button key="buy" onClick={() => props.dispatch(closeModal())}>Continue</Button>,
		    ]}
			  />
		  </div>
		</Modal>
	);
}

const mapStateToProps = (state) => {
  return{
    modal: state.modal
  };
};

export default withRouter(connect(mapStateToProps)(ResultModal));