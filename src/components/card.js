import React from 'react';
import {Button} from 'antd';
import Spinner from './spinner';
import {round, fromWei} from '../utils';

const Card = (props) => {
	
	const {request, price} = props;
	let {id, loanAmount, collateralAmount, installments, interest} = request;
	loanAmount = round(fromWei(loanAmount), 2);
	collateralAmount = round(fromWei(collateralAmount), 2);

	return(
		<div id="card">
			<div id="card_partition_top">
				<div id="card_partition_top_left">
					<img className="card_pic" src={require('../images/ethereum.svg')} />
					<span>Eth</span>
					<span>{loanAmount}</span>
				</div>
				<div id="card_partition_top_right">
					<img className="card_pic" src={require('../images/dai.svg')} />
					<span>Dai</span>
					<span>{collateralAmount}</span>
				</div>
			</div>
			<div id="card_partition_bottom">
				<div id="card_info">
					<div id="card_info_key">
						<span>Interest</span>
						<span>Installments</span>
					</div>
					<div id="card_info_value">
						<span>{interest}%</span>
						<span>{installments}</span>
					</div>
				</div>
				<div id="card_button_container">
					{props.loading && props.select === props.index ? <Spinner /> :
					<Button id="card_button" onClick={props.onSelect}><span id="card_button_text">{props.mode ? 'Lend' : 'Borrow'}</span></Button>
					}
				</div>
			</div>
		</div>
	);

}

export default Card;