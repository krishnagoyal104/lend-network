import React from 'react';
import {connect} from 'react-redux';
import Button from './button';
import {fetchTicker} from '../actions/ticker';
import {fetchBalance} from '../actions/balance';
import {round, fromWei} from '../utils';

class Wallet extends React.Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.dispatch(fetchBalance());
		this.props.dispatch(fetchTicker());
	}

	render(){

		let {eth, dai, allowance} = this.props.balance;
		eth = round(fromWei(eth), 2);
		dai = round(fromWei(dai), 2);
		allowance = round(fromWei(allowance), 2);

		return(
		<div id="wallet">
			<div id="wallet_address_container">
				<span>Account:</span>
				<span id="wallet_address">{this.props.account}</span>
			</div>
			<div id="wallet_container">
				<div id="wallet_header">
					<div className="balance_sub_container">
						<span>Token</span>
					</div>
					<div className="balance_sub_container">
						<span>Balance</span>
					</div>
					<div className="balance_sub_container">
						<span>Price</span>
					</div>
					<div className="balance_sub_container">
						<span>More</span>
					</div>
				</div>
				<div className="balance_container">
					<div className="balance_sub_container">
						<span>Ether</span>
					</div>	
					<div className="balance_sub_container">
						<span className="balance_amount">{eth} Eth</span>
					</div>
					<div className="balance_sub_container">
						<span>${this.props.price}</span>
					</div>
					<div className="balance_sub_container">	
						<Button height={'2rem'} width={'5.5rem'} name={"Get Ether"} handler={() => window.open('https://faucet.rinkeby.io/', '_newtab')} />
					</div>
				</div>
				<div className="balance_container">
					<div className="balance_sub_container">
						<span>Dai</span>
					</div>
					<div className="balance_sub_container">	
						<span className="balance_amount">{dai} Dai</span>
					</div>
					<div className="balance_sub_container">
						<span>$1</span>
					</div>
					<div className="balance_sub_container">	
						<Button height={'2rem'} width={'5.5rem'} name={"Get Dai"} handler={() => this.props.history.push('/faucet')} />
					</div>
				</div>
				<div className="balance_container">
					<div className="balance_sub_container">
						<span>Dai approved</span>
					</div>
					<div className="balance_sub_container">	
						<span className="balance_amount">{allowance} Dai</span>
					</div>
					<div className="balance_sub_container">
						<span>$1</span>
					</div>
					<div className="balance_sub_container"></div>
				</div>
			</div>
		</div>
	);
	}

}

const mapStateToProps = (state) => {
	return{
		account: state.account,
		balance: state.balance,
		price: state.ticker
	};
};

export default connect(mapStateToProps)(Wallet);