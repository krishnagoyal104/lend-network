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
						Fund your account with free Dai tokens on Rinkeby Testnet.<br/>
						Your balance will be updated within a few seconds.
					</p>
				</div>
				<div id="faucet_container">
					<img id="faucet_image" src={require('../images/dai.svg')} alt="" />
					<p>Dai</p>
					<div id="faucet_balance_container">
						<span>Balance:</span>
						{this.props.loading ? <Loader size={30} /> : <span id="faucet_balance">{round(fromWei(this.props.balance.dai), 2)}</span>}
					</div>
					<div id="faucet_button_container">
						<p>Get 1000 Dai</p>
						<Button name={'Request Dai'} height={'2.5rem'} width={'8rem'} handler={this.getDaiTokens} />
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