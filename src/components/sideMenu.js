import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse'

class SideMenu extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			select: null,
			menu: false
		}
	}
	
	navigate = (val, path) => {
		this.setState(({
			select: val
		}));
		this.props.history.push(path);
	}

	toggle = () => {
		this.setState((prevState) => ({
			menu: !prevState.menu
		}));
	}

	render(){

		const {select} = this.state;

		const list =
		<ul id="list" onClick={this.toggle}>
			<li className={select === 1 ? 'active_li' : null} onClick={() => this.navigate(1, '/offers')}>All offers</li>
			<li className={select === 2 ? 'active_li' : null} onClick={() => this.navigate(2, '/requests')}>All requests</li>
			<li className={select === 3 ? 'active_li' : null} onClick={() => this.navigate(3, '/create_offer')}>New lend offer</li>
			<li className={select === 4 ? 'active_li' : null} onClick={() => this.navigate(4, '/create_request')}>New borrow request</li>
			<li className={select === 5 ? 'active_li' : null} onClick={() => this.navigate(5, '/dashboard/offers')}>Dashboard</li>
			<li className={select === 6 ? 'active_li' : null} onClick={() => this.navigate(6, '/wallet')}>Wallet</li>
			<li className={select === 7 ? 'active_li' : null} onClick={() => this.navigate(7, '/faucet')}>Faucet</li>
		</ul>;

		return(
			<div id="sidemenu">
				<div className="navbar-dark d-flex justify-content-between justify-content-lg-center align-items-center px-4 px-lg-0" id="logo_container">
					<img id="logo" src={require('../images/logo.png')} />
					<span id="name">Lend Network</span>
					<button onClick={this.toggle} className="d-lg-none" id="toggle" type="button" data-toggle="collapse" data-target="#menu">
            <span className="navbar-toggler-icon"></span>
          </button>
				</div>
				<div className="d-none d-lg-block pt-3">{list}</div>
				<Collapse in={this.state.menu} className="list_menu" id="menu">
					{list}
				</Collapse>	
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