import React from 'react';

const Overview = (props) => {

	return(
		<div id="overview">
			<div id="overview_container">
				<div id="overview_header">
					<p>Overview</p>
				</div>
				<div id="overview_sub_container">
					<div>
						<p>Collateral Asset</p>
						<p className="overview_values">Dai</p>
					</div>
					<div>
						<p>{props.mode ? 'Loan Amount(Dai)' : 'Collateral Amount(Eth)'}</p>
						<p className="overview_values">{props.amount}</p>
					</div>
					<div>
						<p>Installments</p>
						<p className="overview_values">{props.duration}</p>
					</div>
					<div>
						<p>Interest(%)</p>
						<p className="overview_values">{props.interest}</p>
					</div>
					{props.mode &&
					<div>
						<p>Contract Approval</p>
						<p className="overview_values">{props.approve && props.approve.toString()}</p>
					</div>}
				</div>
			</div>
		</div>
	);

}

export default Overview;