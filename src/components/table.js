import React from 'react';
import { Table, Tag } from 'antd';
import Jazzicon, {jsNumberForAddress} from 'react-jazzicon';
import {round, fromWei} from '../utils';

const columns = (address) => {
  return [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text =>
      <div className="table_name_container">
        <Jazzicon diameter={40} seed={jsNumberForAddress(address)} />
        <span className="table_name">Eth/Dai</span>
      </div>,
    width: 200  
  },
  {
    title: 'Loan',
    dataIndex: 'loanAmount',
    key: 'loanAmount',
    render: text => <span>{round(fromWei(text), 2)} Eth</span>,
    width: 150
  },
  {
    title: 'Collateral',
    dataIndex: 'collateralAmount',
    key: 'collateralAmount',
    render: text => <span>{round(fromWei(text), 2)} Dai</span>,
    width: 200
  },
  {
    title: 'Installments',
    dataIndex: 'installments',
    key: 'installments',
  },
  {
    title: 'Paid',
    dataIndex: 'installmentsPaid',
    key: 'installmentsPaid',
  },
  {
    title: 'Interest',
    dataIndex: 'interest',
    key: 'interest',
    render: text => <span>{text} %</span>
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    render: (state, index) => {
      const color = () => {
        switch(state){
          case 'Pending':
            return 'red';
          case 'Accepted':
            return 'green';
          case 'Completed':
            return 'green';
          case 'Defauted':
            return 'red';
          case 'Settled':
            return 'green'; 
          default:
            return 'green';         
        }
      }
      return(
        <span>
          <Tag id="table_tag" color={color()} key={index}>
            {state.toUpperCase()}
          </Tag>
        </span>
      );
    },
  }
];
}

const TableView = (props) => {
  return(
    <Table columns={columns(props.account)} dataSource={props.data} rowKey={record => record._id}
    onRow={(record, index) => {
    return {
      onClick: event => props.openModal(index)
    }}} />
  );
}

export default TableView;