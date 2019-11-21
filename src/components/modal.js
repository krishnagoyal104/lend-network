import React from 'react';
import Modal from 'react-modal';
import Steps from './steps';

const customStyles = {
  content : {
    height                : '550px',
    width                 : '800px',
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

const ModalView = (props) => {
	return(
		<Modal
      id="modal"
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Loan"
    >
			<Steps {...props} />
		</Modal>
	);
}

export default ModalView;