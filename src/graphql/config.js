import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

export const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/krishnagoyal104/project',
});

export const query_all = gql`
  {
    loans {
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
`;

export const query_offers = gql`
  {
    loans(where: {borrower: null}) {
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
`;

export const query_requests = gql`
  {
    loans(where: {lender: null}) {
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
`;

export const query_user_requests = gql`
  query($address: Bytes)
  {
    loans(where: {borrower: $address}) {
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
`;

export const query_user_offers = gql`
  query($address: Bytes)
  {
    loans(where: {lender: $address}) {
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
`;