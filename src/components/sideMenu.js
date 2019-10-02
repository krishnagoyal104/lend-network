import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class SideMenu extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			select: null
		}
	}
	
	navigate = (val, path) => {
		this.setState(({
			select: val
		}));
		this.props.history.push(path);
	}

	render(){

		const {select} = this.state;

		return(
			<div id="container">
				<div id="logo_container">
					<span id="logo">Ethlend</span>
				</div>
				<ul id="list">
					<li className={select === 1 ? 'active_li' : null} onClick={() => this.navigate(1, '/offers')}>All offers</li>
					<li className={select === 2 ? 'active_li' : null} onClick={() => this.navigate(2, '/requests')}>All requests</li>
					<li className={select === 3 ? 'active_li' : null} onClick={() => this.navigate(3, '/create_offer')}>New lend offer</li>
					<li className={select === 4 ? 'active_li' : null} onClick={() => this.navigate(4, '/create_request')}>New borrow request</li>
					<li className={select === 5 ? 'active_li' : null} onClick={() => this.navigate(5, '/dashboard/offers')}>Dashboard</li>
					<li className={select === 6 ? 'active_li' : null} onClick={() => this.navigate(6, '/wallet')}>Wallet</li>
					<li className={select === 7 ? 'active_li' : null} onClick={() => this.navigate(7, '/faucet')}>Faucet</li>
				</ul>
				{/*<div id="sidemenu_bottom_container">
					<div id="sidemenu_ticker_container">
						<span>Eth price: ${this.props.price}</span>
						<span>Dai price: $1</span>
					</div>
				</div>*/}
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return{
		price: state.ticker
	};
};

export default connect(mapStateToProps)(withRouter(SideMenu));