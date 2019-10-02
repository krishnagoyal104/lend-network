import axios from 'axios';
import {getEthPrice} from '../utils';

export const setTicker = (ticker) => {
  return {
    type: 'SET_TICKER',
    ticker
  };
};

export const fetchTicker = (publicKey) => {
  return async(dispatch) => {
    try{
      const result = await getEthPrice();
      console.log(result);
      dispatch(setTicker(result));
    }
    catch(e){
      console.log(e);
    }
  }
}