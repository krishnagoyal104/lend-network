import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {message} from 'antd';
import Timeline from './timeline';
import Overview from './overview';
import {toWei} from '../utils';
import {fetchTicker} from '../actions/ticker';
import {fetchBalance} from '../actions/balance';
import {createRequest, createOffer, approve} from '../actions/transaction';

class Form extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			amount: '',
			duration: '',
			interest: '',
			approve: false
		}
	}

	componentDidMount(){
		this.props.dispatch(fetchTicker());
		this.props.dispatch(fetchBalance());
	}

	onEnter = (key, value) => {
		this.setState(({
			[key]: value
		}));
	}

	approveTokens = async(_function) => {
		try{
			const _amount = (this.state.amount * this.props.price * 4)/3;
			await this.props.dispatch(approve(toWei(_amount)));
			this.onEnter('approve', true);
			_function(5);
		}
		catch(e){
			message.error('Transaction failed.');
		}
	}

	submit = (value) => {
		if(value === 'request'){
			let {amount} = this.state;
			amount = amount * this.props.price * 4/3;
			const data = {...this.state, amount};
			this.props.dispatch(createRequest(data));
		}
		else{
			this.props.dispatch(createOffer(this.state));
		}
	}

	navigate = () => {
		this.props.history.push('/faucet');
	}

	render(){
		return(
			<div id="form">
				<div className="view_header">
					{
						this.props.mode ?
						<span className="view_header_text">
							Create a new request to borrow Ethereum.
						</span> :
						<span className="view_header_text">Create a new offer to lend Ethereum.</span>
					}
				</div>
				<div id="form_container">
					<div className="d-none d-lg-block" id="form_container_left">
						<Overview {...this.state} mode={this.props.mode} />
					</div>
					<div id="form_container_right">
						<Timeline {...this.state} mode={this.props.mode} loading={this.props.loading}
						balance={this.props.balance} onEnter={this.onEnter} price={this.props.price}
						approveTokens={this.approveTokens} submit={this.submit} navigate={this.navigate} />
					</div>
				</div>
			</div>
		);
	}

}

const mapStateToProps = (state) => {
  return{
  	loading: state.loading,
    price: state.ticker,
    balance: state.balance
  };
};

export default withRouter(connect(mapStateToProps)(Form));