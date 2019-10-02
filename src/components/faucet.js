import React from 'react';
import {connect} from 'react-redux';
import {fetchBalance, getDai} from '../actions/balance';
import {round, fromWei} from '../utils/index';
import Button from './button';
import Loader from './loader';

class Faucet extends React.Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.dispatch(fetchBalance());
	}

	getDaiTokens = () => {
		this.props.dispatch(getDai());
	}

	render(){

		return(
			<div id="faucet">
				<div id="faucet_info_container">
					<p id="faucet_info">
						Fund your account with free Dai tokens on Rinkeby Testnet by submitting a request to the faucet.<br/>
						Your balance will be updated within a few seconds.
					</p>
				</div>
				<div id="faucet_container">
					<img id="faucet_image" src={require('../images/dai.svg')} />
					<p>Dai</p>
					<div id="faucet_balance_container">
						<p>Balance:</p>
						<p id="faucet_balance">{this.props.loading ? <Loader size={30} /> : round(fromWei(this.props.balance.dai), 2)}</p>
					</div>
					<div id="faucet_button_container">
						<p>Get 1000 Dai</p>
						<Button name={'Request Dai'} height={'60px'} width={'250px'} handler={this.getDaiTokens} />
					</div>
				</div>
			</div>
		);

	}

}

const mapStateToProps = (state) => {
	return{
		loading: state.loading,
		account: state.account,
		balance: state.balance
	};
};

export default connect(mapStateToProps)(Faucet);