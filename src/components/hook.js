import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {query_offers, query_requests, query_user_requests, query_user_offers} from '../graphql/config';
import Loader from './loader';
import ErrorView from './error';
import {toChecksum} from '../utils';

const Hook = (Component) => {
	return function WrappedComponent(props) {
		const query = (pathname) => {
			switch(pathname){
				case '/offers':
					return query_offers;
				case '/requests':
					return query_requests;
				case '/dashboard/offers':
					return query_user_offers;
				case '/dashboard/requests':
					return query_user_requests;
			}
		};

		let {loading, error, data, refetch} = useQuery(query(props.location.pathname), {
			variables: {'address': props.account},
			notifyOnNetworkStatusChange: true
		});

		if (loading) return <Loader />;
  	if (error) return <ErrorView />;

  	const {pathname} = props.location;	

		if(pathname === '/offers' || pathname === '/requests'){
			const address = toChecksum(props.account);
			data.loans = data.loans.filter((loan) => {
				if(toChecksum(loan.lender) !== address && toChecksum(loan.borrower) !== address){
					return loan;
				}
			});
		}
		else{

		}

	  return <Component {...props} data={data.loans} refetch={() => refetch()} />;
	}    
}

export default Hook;