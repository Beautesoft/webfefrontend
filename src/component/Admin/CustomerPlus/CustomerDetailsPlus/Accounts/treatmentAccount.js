import React, { Component } from 'react';
import "./style.scss";
import { NormalButton, TableWrapper, NormalSelect } from 'component/common';
import { getCommonApi, updateForm, commonCreateApi, commonDeleteApi, commonPatchApi } from "redux/actions/common";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

export class TreatmentAccountClass extends Component {
  state = {
    activeTab: '',
    isOpenTreatmentDone: false,
    isActiveTab: "detail",
    headerDetails: [
      { label: 'Date', sortKey: false, width: "80px" },
      { label: 'Transaction #', width: "52px" },
      { label: 'Treatment #', sortKey: false, width: "75px" },
      { label: 'Description', sortKey: false, width: "155px" },
      { label: 'Payment', sortKey: false, width: "70px" },
      { label: 'Credit Balance', sortKey: false, width: "72px" },
      { label: 'Outstanding', sortKey: false, width: "72px" },
      { label: '', sortKey: false, width: "72px" },
    ],
    detailHeader: [
      { label: 'Date', sortKey: false, width: "80px" },
      { label: 'Description', sortKey: false, width: "155px" },
      { label: 'Type', width: "52px" },
      { label: 'Amount', sortKey: false, width: "70px" },
      { label: 'Credit Balance', sortKey: false, width: "72px" },
      { label: 'Outstanding', sortKey: false, width: "72px" },
    ],
    accountList: [],
    DetailList: [],
    yearList: [],
    year: new Date().getFullYear(),
    accountHeader: {}
  }

  componentDidMount() {
    this.getFilter();
    this.getAccountData();
  }

  getFilter = () => {
    this.props.getCommonApi('treatmentdone/Year/').then((key) => {
      let { status, data } = key;
      let { yearList } = this.state;
      for (let value of data) {
        yearList.push({ value: value, label: value })
      }
      this.setState({ yearList })
    })
  }

  getAccountData = () => {
    let { year, accountHeader } = this.state;
    this.props.getCommonApi(`treatmentacclist/?cust_id=${this.props.id}&year=${year}`).then((key) => {
      let { data, header_data } = key;
      let { accountList } = this.state;
      accountList = data;
      accountHeader = header_data;
      this.setState({ accountList, accountHeader })
    })
  }


  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleChange = async ({ target: { value, name } }) => {    
    let { year } = this.state;
    year = value
    await this.setState({
      year
    })
    this.getAccountData();
  }

  handleOpenDetail = async (data) => {
    let { activeTab } = this.state
    activeTab = 'detail';

    await this.setState({
      activeTab
    })
    this.getDetailList(data.id);
  }

  getDetailList = (id) => {
    this.props.getCommonApi(`treatmentacclist/${id}`).then((key) => {
      let { data, header_data } = key;
      let { DetailList, accountHeader } = this.state;
      DetailList = data;
      accountHeader = header_data;
      this.setState({ DetailList, accountHeader })
    })
  }

  handleBack = () => {
    let { activeTab } = this.state;
    activeTab = '';
    this.setState({
      activeTab,
      DetailList: []
    })
    this.getAccountData();
  }

  render() {
    let { accountHeader = {}, headerDetails, accountList, yearList, year, activeTab, detailHeader, DetailList } = this.state;
    let { balance, treatment_count, outstanding, credit_balance, outstanding_balance } = accountHeader;
    return (

      <div className="treatment-account row">
        <div className="col-6 mt-3 mb-4">
          {
            activeTab !== 'detail' ?
              <div className="row">
                <div className="col-5 mb-2">Treatment List</div>
                <div className="col-5 mb-2">
                  <NormalSelect
                    options={yearList}
                    value={year}
                    name="year"
                    onChange={this.handleChange}
                    className="customer-name py-1"
                  />
                </div>
                <div className="col-5">Total Treatment Count </div>
                <div className="col-5">{treatment_count}</div>
              </div> : ""
          }
        </div>
        <div className="col-6 mt-3 mb-4">
          <div className="row">
            <div className="col-6 mb-2">Credit Balance</div>
            <div className="col-6 mb-2">$ {activeTab !== 'detail' ? balance : credit_balance}</div>

            <div className="col-6">Outstanding Balance</div>
            <div className="col-6">$ {activeTab !== 'detail' ? outstanding : outstanding_balance}</div>
          </div>
        </div>
        <div className="col-12">

          <div className="table">
            {
              activeTab !== 'detail' ?
                <TableWrapper headerDetails={headerDetails} queryHandler={this.handlePagination}>
                  {(accountList && accountList.length > 0) ? accountList.map((item, index) => {
                    return (
                      <tr key={index} >

                        <td><div className="d-flex align-items-center justify-content-center">{item.sa_date}</div></td>
                        <td><div className="d-flex align-items-center justify-content-center">{item.transaction}</div></td>
                        <td><div className="d-flex align-items-center justify-content-center">{item.treatment_parentcode}</div></td>
                        <td><div className="d-flex align-items-center justify-content-center">{item.description}</div></td>
                        <td><div className="d-flex align-items-center justify-content-center">{"$" + item.payment}</div></td>
                        <td><div className="d-flex align-items-center justify-content-center">{"$" + item.balance}</div></td>
                        <td><div className="d-flex align-items-center justify-content-center">{"$" + item.outstanding}</div></td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <NormalButton
                              buttonClass={"view mr-3"}
                              mainbg={true}
                              className="col-12 fs-15 "
                              label="view"
                              onClick={() => this.handleOpenDetail(item)}
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  }) : ""
                  }
                </TableWrapper> : <TableWrapper headerDetails={detailHeader} queryHandler={this.handlePagination}>
                  {DetailList && DetailList.length > 0 ? DetailList.map((item, index) => {
                    return (
                      <tr key={index}>

                        <td><div className="d-flex align-items-center justify-content-center">{item.sa_date}</div></td>
                        <td><div className="d-flex align-items-center justify-content-center">{item.description}</div></td>
                        <td><div className="d-flex align-items-center justify-content-center">{item.type}</div></td>
                        <td><div className="d-flex align-items-center justify-content-center">{"$" + item.amount}</div></td>
                        <td><div className="d-flex align-items-center justify-content-center">{"$" + item.balance}</div></td>
                        <td><div className="d-flex align-items-center justify-content-center">{"$" + item.outstanding}</div></td>
                      </tr>
                    )
                  }) : ""
                  }
                </TableWrapper>
            }
          </div>
        </div>
        <div className="col-12 justify-center d-flex">
          {
            activeTab === 'detail' ? <NormalButton
              buttonClass={"back mr-3"}
              mainbg={true}
              className="col-12 fs-15 "
              label="Back"
              onClick={() => this.handleBack()}
            /> : ""
          }
          <NormalButton
            buttonClass={"print"}
            className="col-12 fs-15 "
            label="Print"
            onClick={() => this.setState({ isOpenEditDisc: false })}
          />
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCommonApi,
    updateForm,
    commonCreateApi,
    commonPatchApi,
    commonDeleteApi
  }, dispatch)
}

export const TreatmentAccount = connect(null, mapDispatchToProps)(TreatmentAccountClass)