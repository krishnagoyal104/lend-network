import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import {startLoading, stopLoading} from './loader';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/krishnagoyal104/ethereum',
});

export const setRequests = (requests, offers) => {
  return {
    type: 'SET_REQUESTS',
    requests,
    offers
  };
};

/*export const fetchRequests = (publicKey) => {
  return async(dispatch) => {
    try{
      const {data} = await axios('http://localhost:8080/requests');
      const keys = Object.keys(data);
      if(keys.length){
        let array = [];
          keys.map((key) => {
          array.push(JSON.parse(data[key]));
        });
        dispatch(setRequests(array));  
      }
    }
    catch(e){
      console.log(e);
    }
  }
}*/

export const fetchRequests = (publicKey) => {
  return async(dispatch) => {
    dispatch(startLoading());
    try{
      const result = await client.query({
        query: gql`
          {
            loans(first: 5) {
              _id
              state
              loanAmount
              collateralAmount
              installments
              installmentsPaid
              interest
              time
              borrower
              lender
            }
          }
        `
      });
      console.log(result);
      let requests = [];
      let offers = [];
      result.data.loans.map((item) => {
        if(item.borrower){
          requests.push(item);
        }
        else{
          offers.push(item);
        }
      });
      dispatch(setRequests(requests, offers));
      dispatch(stopLoading());
    }
    catch(e){
      console.log(e);
      dispatch(stopLoading());
    }
  }
}