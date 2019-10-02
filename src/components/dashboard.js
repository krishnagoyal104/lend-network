import React from 'react';
import {connect} from 'react-redux';
import {Button, Icon, Radio, message} from 'antd';
import Table from './table';
import Hook from './hook';
import Modal from './dashboardModal';
import {cancelOffer, cancelRequest, payInstallment} from '../actions/transaction';

class Dashboard extends React.Component {
	
  constructor(props){
    super(props);
    this.state = {
      index: null,
      modal: false
    };
    this.mode = this.props.match.params.mode;
    //this.data = this.filter();
  }

  openModal = (index) => {
    this.setState(({
      index: index,
      modal: true
    }));
  }

  closeModal = () => {
    this.setState(({
      modal: false
    }));
  }

  onSelect = (e) => {
    let path;
    if(this.mode === 'offers'){
      path = 'requests';
    }
    else{
      path = 'offers';
    }
    this.props.history.push(`/dashboard/${path}`);
  }

  filter = () => {
    return this.props.data.reduce((data, loan) => {
      if(loan.borrower === this.props.account){
        data.requests.push(loan);
      }
      else if(loan.lender === this.props.account){
        data.offers.push(loan);
      }
      else{
        
      }
      return data;
    }, {offers: [], requests: []});
  }

  cancelLoanOffer = async() => {
    const {_id} = this.props.data[this.state.index];
    try{
      await this.props.dispatch(cancelOffer(_id));
      this.closeModal();
    }
    catch(e){
      console.log(e);
    }
  }

  cancelLoanRequest = async() => {
    const {_id} = this.props.data[this.state.index];
    try{
      await this.props.dispatch(cancelRequest(_id));
      this.closeModal();
    }
    catch(e){
      console.log(e);
    }
  }

  payInstallment = (amount) => {
    message.error('Installment not due yet.');
    //const {_id} = this.props.data[this.state.index];
    //this.props.dispatch(payInstallment(_id, amount));
  }

  render(){

    return(
      <div id="dashboard_container">
        <div id="dashboard_switch_container">
          <Radio.Group size={'large'} defaultValue={this.mode}
          onChange={this.onSelect} buttonStyle="solid">
            <Radio.Button value="offers">Lent by you</Radio.Button>
            <Radio.Button value="requests">Borrowed by you</Radio.Button>
          </Radio.Group>
        </div>
        <div id="dashboard_table_container">
          <Button id="dashboard_button" type="primary" onClick={() => this.props.refetch()}>
            <Icon type="sync" />
            Reload
          </Button>
          <Table data={this.props.data} openModal={this.openModal} account={this.props.account} />
          {this.state.index !== null && <Modal isOpen={this.state.modal} closeModal={this.closeModal}
          mode={this.mode === 'requests'} loading={this.props.loading} data={this.props.data[this.state.index]}
          cancelOffer={this.cancelLoanOffer} cancelRequest={this.cancelLoanRequest} pay={this.payInstallment} />}
        </div>
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  return{
    loading: state.loading,
    requests: state.requests,
    account: state.account
  };
};

export default connect(mapStateToProps)(Hook(Dashboard));