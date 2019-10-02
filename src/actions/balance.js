import {startLoading, stopLoading} from './loader';
import {getDaiBalance, getBalance, fetchAllowance, getDaiTokens} from '../utils/index';

export const setBalance = (balance) => {
  return {
    type: 'SET_BALANCE',
    balance
  };
};

export const fetchBalance = () => {
  return async(dispatch, getState) => {
    dispatch(startLoading());
    try{
      const account = getState().account;
      const result = await Promise.all([getBalance(account), getDaiBalance(account), fetchAllowance(account)]);
      dispatch(setBalance({
        eth: result[0],
        dai: result[1],
        allowance: result[2]
      }));
      dispatch(stopLoading());
    }
    catch(e){
      console.log(e);
      dispatch(startLoading());
    }
  }
}

export const getDai = () => {
  return async(dispatch, getState) => {
    dispatch(startLoading());
    try{
      const account = getState().account;
      await getDaiTokens(account);
      const result = await getDaiBalance(account);
      dispatch(setBalance({dai: result}));
      dispatch(stopLoading());
    }
    catch(e){
      console.log(e);
      dispatch(stopLoading());
    }
  }
}