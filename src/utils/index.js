import Web3 from 'web3';
import {ERC20_ABI, ETHLEND_ABI, FAUCET_ABI} from './abi.js';
import {DAI_TOKEN_ADDRESS, ETHLEND_CONTRACT_ADDRESS, FAUCET_ADDRESS} from '../config/config';

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

const tokenContract = new web3.eth.Contract(ERC20_ABI, DAI_TOKEN_ADDRESS);
const contract = new web3.eth.Contract(ETHLEND_ABI, ETHLEND_CONTRACT_ADDRESS);
const faucet = new web3.eth.Contract(FAUCET_ABI, FAUCET_ADDRESS);

export const enableMetamask = () => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			await window.ethereum.enable();
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getNetwork = () => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const network = await web3.eth.net.getNetworkType();
			if(network === 'rinkeby'){
				resolve();
			}
			else{
				reject();
			}
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getAccounts = (args) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await web3.eth.getAccounts();
			resolve(result[0]);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getEthPrice = (args) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await contract.methods.ETHUSD().call();
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getBalance = (account) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const balance = await web3.eth.getBalance(account);
			resolve(balance);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

//tokenContract
export const approveTokens = (account, amount) => {
	//const weiAmount = toWei(amount);
	amount = amount.toString();
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await tokenContract.methods.approve(ETHLEND_CONTRACT_ADDRESS, amount).send({from: account});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const fetchAllowance = (account) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await tokenContract.methods.allowance(account, ETHLEND_CONTRACT_ADDRESS).call();
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

//ethlendContract
export const createLoanRequest = (account, {amount, duration, interest}) => {
	const weiAmount = toWei(amount);
	const promise = new Promise(async(resolve, reject) => {
		try{
			await contract.methods.createLoanRequest(weiAmount, duration, interest).send({from: account});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const createLoanOffer = (account, {amount, duration, interest}) => {
	const weiAmount = toWei(amount);
	const promise = new Promise(async(resolve, reject) => {
		try{
			await contract.methods.createLoanOffer(weiAmount, duration, interest).send({from: account, value: weiAmount});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const acceptLoanOffer = (account, id) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			await contract.methods.acceptOffer(id).send({from: account});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const acceptLoanRequest = (account, id, amount) => {
	//const weiAmount = toWei(amount);
	const promise = new Promise(async(resolve, reject) => {
		try{
			await contract.methods.acceptRequest(id).send({from: account, value: amount});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const cancelLoanRequest = (account, id) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			await contract.methods.cancelLoanRequest(id).send({from: account});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const cancelLoanOffer = (account, id) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			await contract.methods.cancelLoanOffer(id).send({from: account});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const payLoanInstallment = (account, id, amount) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			await contract.methods.payInstallment(id).send({from: account, value: amount});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

const fetchRequests = async() => {
	try{
		const id = await contract.methods.id.call();
		console.log(id);
	}
	catch(e){
		console.log(e);
	}
}

export const getDaiTokens = (account) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			await faucet.methods.getTokens(account)
			.send({from: account, gas: 3000000});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getDaiBalance = (account) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const balance = await tokenContract.methods.balanceOf(account).call();
			resolve(balance);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const fromWei = (amount) => {
	return Web3.utils.fromWei(amount.toString());
}

export const toWei = (amount) => {
	return Web3.utils.toWei(amount.toString());
}

export const toChecksum = (address) => {
	if(address === null){
		return null;
	}
	return web3.utils.toChecksumAddress(address);
}

export const round = (number, digits) => {
	const _number = 10 ** digits;
  return Math.floor(number * _number)/_number;
}