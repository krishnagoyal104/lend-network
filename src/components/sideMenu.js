import React from 'react';
import {NavLink} from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse'

class SideMenu extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			menu: false
		}
	}

	toggle = () => {
		this.setState((prevState) => ({
			menu: !prevState.menu
		}));
	}

	render(){

		const list =
		<ul id="list">
			<li><NavLink to="/offers" activeClassName="active_li"><div>All offers</div></NavLink></li>
			<li><NavLink to="/requests" activeClassName="active_li"><div>All requests</div></NavLink></li>
			<li><NavLink to="/create_offer" activeClassName="active_li"><div>New lend offer</div></NavLink></li>
			<li><NavLink to="/create_request" activeClassName="active_li"><div>New borrow request</div></NavLink></li>
			<li><NavLink to="/dashboard/offers" activeClassName="active_li"><div>Dashboard</div></NavLink></li>
			<li><NavLink to="/wallet" activeClassName="active_li"><div>Wallet</div></NavLink></li>
			<li><NavLink to="/faucet" activeClassName="active_li"><div>Faucet</div></NavLink></li>
		</ul>;

		return(
			<div id="sidemenu">
				<div className="navbar-dark d-flex justify-content-between justify-content-lg-center align-items-center px-4 px-lg-0 h-custom-100" id="logo_container">
					<img id="logo" src={require('../images/logo.png')} />
					<span id="name">Lend Network</span>
					<button onClick={this.toggle} id="toggle" className="d-lg-none" aria-controls="collapsible"
					aria-expanded={this.state.menu}>
            <span className="navbar-toggler-icon"></span>
          </button>
				</div>
				<div className="d-none d-lg-block pt-3">{list}</div>
				<Collapse in={this.state.menu} className="d-lg-none" onClick={this.toggle}>
					<div id="collapsible" className="list_menu">
						{list}
					</div>
				</Collapse>	
			</div>
		);
	}

}

export default SideMenu;