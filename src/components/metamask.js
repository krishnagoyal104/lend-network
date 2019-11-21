import React from 'react';

const Metamask = (props) => {

	return(
		<div id="metamask_container">
			<div className="col-md-6 col-lg-4" id="metamask_sub_container">
				<p id="metamask_header">Oops! Something went wrong.</p>
				<img id="metamask_icon" src={require('../images/metamask.png')} alt="" />
				<p id="metamask_description">
				{props.error ?
					'Could not find any external ethereum wallet installed. Please install an external wallet like metamask to continue.' :
					props.lock ? 'Metamask seems to be locked. Please unlock your wallet to proceed.' : 'The service is currently available only on the testnet. Please select the Rinkeby Testnet to proceed.'
				}</p>
			</div>
		</div>
	);

}

export default Metamask;