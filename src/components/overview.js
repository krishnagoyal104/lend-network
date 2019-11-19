import React from 'react';

const Overview = (props) => {

	return(
		<div id="overview">
			<div id="overview_container">
				<div id="overview_header">
					<span>Overview</span>
				</div>
				<div id="overview_sub_container">
					<div>
						<span>Collateral Asset</span>
						<span className="overview_values">Dai</span>
					</div>
					<div>
						<span>Loan Amount(Eth)</span>
						<span className="overview_values">{props.amount}</span>
					</div>
					<div>
						<span>Installments</span>
						<span className="overview_values">{props.duration}</span>
					</div>
					<div>
						<span>Interest(%)</span>
						<span className="overview_values">{props.interest}</span>
					</div>
					{props.mode &&
					<div>
						<span>Contract Approval</span>
						<span className="overview_values">{props.approve && props.approve.toString()}</span>
					</div>}
				</div>
			</div>
		</div>
	);

}

export default Overview;