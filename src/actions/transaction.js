import React from 'react';
import {notification} from 'antd';
import {startLoading, stopLoading} from './loader';
import {
	createLoanRequest,
	createLoanOffer,
	approveTokens,
	acceptLoanRequest,
	acceptLoanOffer,
	cancelLoanOffer,
	cancelLoanRequest,
	payLoanInstallment
} from '../utils/index';
import {openModal} from './modal';

const openNotification = () => {
    notification.open({
    	placement: 'topLeft',
    	duration: '10',
      message: <span style={{fontSize: '20px'}}>Transaction Initiated</span>,
      description: <span style={{fontSize: '18px'}}>Please accept the transaction using metamask.</span>,
      icon: <img src="/images/metamask.png" style={{height: '30px', width: '30px'}} alt="" />,
    });
  };

export const createRequest = (args) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		openNotification();
		try{
			const account = getState().account;
			await createLoanRequest(account, args);
			dispatch(stopLoading());
			dispatch(openModal('/requests'));
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}

export const createOffer = (args) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		openNotification();
		try{
			const account = getState().account;
			await createLoanOffer(account, args);
			dispatch(stopLoading());
			dispatch(openModal('/offers'));
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}

export const acceptRequest = (id, amount) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		openNotification();
		try{
			const account = getState().account;
			await acceptLoanRequest(account, id, amount);
			dispatch(stopLoading());
			dispatch(openModal('/offers'));
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}

//call approve
export const acceptOffer = (id, amount) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		openNotification();
		try{
			const account = getState().account;
			await acceptLoanOffer(account, id);
			dispatch(stopLoading());
			dispatch(openModal('/requests'));
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}

export const approve = (amount) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		openNotification();
		try{
			const account = getState().account;
			await approveTokens(account, amount);
			dispatch(stopLoading());
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}

export const cancelOffer = (id) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		openNotification();
		try{
			const account = getState().account;
			await cancelLoanOffer(account, id);
			dispatch(stopLoading());
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}

export const cancelRequest = (id) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		openNotification();
		try{
			const account = getState().account;
			await cancelLoanRequest(account, id);
			dispatch(stopLoading());
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}

export const payInstallment = (id, amount) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		openNotification();
		try{
			const account = getState().account;
			await payLoanInstallment(account, id, amount);
			dispatch(stopLoading());
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}