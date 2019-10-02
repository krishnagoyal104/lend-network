import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import { ApolloProvider } from '@apollo/react-hooks';
import {client} from './graphql/config';
import AppRouter from './router/router';
import configureStore from './store/configureStore.js';
import Intro from './components/intro';
import Metamask from './components/metamask';
import {getAccounts, enableMetamask, getNetwork} from './utils';
import {setAccount} from './actions/account';

const {store, persistor} = configureStore();

const onBeforeLift = async() => {
	try{
		await enableMetamask();
		const account = await getAccounts();
		store.dispatch(setAccount(account));
	}
	catch(e){
		console.log(e);
	}
}

const App = () => {
	const path = window.location.pathname;
	const promise = new Promise(async(resolve, reject) => {
		/*if(path === '/'){
			resolve(<Intro />);
		}*/
		if(typeof web3 !== 'undefined'){
			try{
				await getNetwork();
				resolve(
					<Provider store={store}>
						<PersistGate 
				      loading={<Metamask lock={true} />}
				      onBeforeLift={onBeforeLift}
				      persistor={persistor}>
				      <ApolloProvider client={client}>
								<AppRouter />
							</ApolloProvider>
						</PersistGate>
					</Provider>
				);
			}
			catch(e){
				resolve(<Metamask />);
			}
		}
		else{
			 resolve(<Metamask error={true} />);
		}
	});
	return promise;
}

export default App;