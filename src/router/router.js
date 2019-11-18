import React from 'react';
import {BrowserRouter, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import SideMenu from '../components/sideMenu';
import View from '../components/view';
import Form from '../components/form';
import Dashboard from '../components/dashboard';
import Faucet from '../components/faucet';
import Wallet from '../components/wallet';
import Modal from '../components/result';

const renderHeader = (path) => {
	switch(path){
		case '/offers':
			return 'Latest Loan Offers';
		case '/requests':
			return 'Latest Loan Requests';
		case '/create_offer':
			return 'New Loan Offer';
		case '/create_request':
			return 'New Loan Request';
		case '/dashboard/offers':
			return 'Dashboard';
		case '/dashboard/requests':
			return 'Dashboard';	
		case '/wallet':
			return 'Wallet';
		case '/faucet':
			return 'Faucet';
		default:
			return 'Page Not Found';				
	}
}

const Layout = (props) => {
	const path = props.location.pathname;
	return(
		<div className="flex-column flex-lg-row" id="main_container">
			<div id="main_container_left" className="h-10 h-lg-100 w-100 w-lg-15">
				<SideMenu />
			</div>
			<div id="main_container_right" className="h-90 h-lg-100 w-100 w-lg-85">
				<div id="global_header_container">
					<span id="global_header_text">{renderHeader(path)}</span>
				</div>
				<div id="sub_container">
					<Modal />
					<Switch>
						<Redirect from="/" to="/offers" exact />
			      <Route path="/offers" component={View} />
			      <Route path="/requests" render={(props) => <View mode={true} {...props} />} />
			      <Route path="/create_request" render={() => <Form mode={true} key={"request"} />} />
			      <Route path="/create_offer" render={() => <Form key={"offer"} />} />
			      <Route path="/faucet" component={Faucet} />
			      <Route path="/dashboard/:mode" render={(props) => <Dashboard key={props.match.params.mode} {...props} />} />
			      <Route path="/wallet" component={Wallet} />
			    </Switch>
	    	</div>
			</div>
		</div>
	);
}

const App = withRouter(Layout);

const AppRouter = () => (
  <BrowserRouter>
  	<App />
  </BrowserRouter>
);

export default AppRouter;