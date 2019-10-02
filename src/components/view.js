import React from 'react';
import {connect} from 'react-redux';
import {Icon, notification} from 'antd';
import Card from './card';
import {fetchBalance} from '../actions/balance';
import Hook from './hook';
import Modal from './modal';
import {approve, acceptRequest, acceptOffer} from '../actions/transaction';

class View extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			select: null,
			modal: false
		};
	}

	componentDidMount(){
		this.props.dispatch(fetchBalance());
	}

	onSelect = (index) => {
		this.setState(({
			select: index,
			modal: true
		}));
	}

	closeModal = () => {
		this.setState(({
			modal: false
		}));
	}

	approve = async(amount, _next) => {
		try{
			await this.props.dispatch(approve(amount));
			_next();
		}
		catch(e){
			console.log(e);
		}
	}

	acceptRequest = async() => {
		try{
			const {_id, loanAmount} = this.props.data[this.state.select];
			await this.props.dispatch(acceptRequest(_id, loanAmount));
			this.closeModal();
			this.props.refetch();
		}
		catch(e){
			console.log(e);
		}
	}

	acceptOffer = async() => {
		try{
			const {_id} = this.props.data[this.state.select];
			await this.props.dispatch(acceptOffer(_id));
			this.closeModal();
			this.props.refetch();
		}
		catch(e){
			console.log(e);
		}
	}

	openNotification = () => {
    notification.open({
      message: 'Request Accepted',
      description: 'A loan has been extended from your account to the borrower.',
      icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />,
    });
    notification.open({
      message: 'Offer Accepted',
      description: 'Your account has been credited with ethers.',
      icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />,
    });
  };

	navigate = () => {
		if(this.props.mode){
			window.open('https://faucet.rinkeby.io/', '_newtab')
		}
		else{
			this.props.history.push('/faucet');
		}
	}

	render(){

		return(
			<div id="view">
				<div class="view_header">
					{
						this.props.mode ?
						<span class="view_header_text">
							Lend Ether by selecting one of the requests below.
						</span> :
						<span class="view_header_text">Borrow Ether by selecting one of the offers below.</span>
					}
				</div>
				<div id="view_container">
					{this.props.data.map((request, index) => (
						<Card mode={this.props.mode} request={request} price={this.props.price} key={index}
						index={index} loading={this.props.loading} select={this.state.select}
						onSelect={() => this.onSelect(index)} navigate={() => this.navigate(index)} />
					))}
				</div>
				{
					this.state.select != null &&
					<Modal isOpen={this.state.modal} closeModal={this.closeModal} mode={this.props.mode}
					data={this.props.data[this.state.select]} navigate={this.navigate}
					balance={this.props.balance} loading={this.props.loading} approve={this.approve}
					acceptRequest={this.acceptRequest} acceptOffer={this.acceptOffer} />
				}
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return{
		account: state.account,
		loading: state.loading,
		balance: state.balance,
		price: state.ticker
	};
};

export default connect(mapStateToProps)(Hook(View));