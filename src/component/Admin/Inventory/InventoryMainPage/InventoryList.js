import React, { Component } from "react";
import {
  NormalInput,
  NormalSelect,
  NormalButton,
  NormalDate,
  NormalModal,
  TableWrapper,
} from "component/common";
import { Toast } from "service/toast";
import { getCommonApi, commonPatchApi } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dateFormat } from "service/helperFunctions";
import closeIcon from "assets/images/close.png";
import { CreateNewInventory } from "./Model";
import "./style.scss";

export class InventoryListClass extends Component {
  state = {
    searchDate: new Date(),
    stockMemoList: [],
    meta: {},
    stockMemoListHeader: [
      { label: "Date" },
      { label: "Product" },
      { label: "Employee" },
      { label: "Qty" },
      { label: "UOM" },
      { label: "Remark" },
      { label: "Reversal" },
    ],
    isCreateNewInventoryPopup: false,
    isReversalPopup: false,
    stockMemoId: 0,
    reversalqty: 0,
    qty: 0,
  };
  componentDidMount = () => {
    this.getstockMemoList({});
  };

  getstockMemoList = data => {
    let { searchDate } = this.state;
    let { page = 1, limit = 10, search = "" } = data;
    this.props
      .getCommonApi(
        `stockusagememo/?date=${dateFormat(
          searchDate
        )}&page=${page}&limit=${limit}`
      )
      .then(key => {
        let { status, data } = key;
        if (status === 200) {
          if (data) {
            this.setState({
              stockMemoList: data.dataList,
              meta: data.meta.pagination,
            });
          }
        }
      });
  };
  handleDateChange = async ({ target: { value, name } }) => {
    await this.setState({
      [name]: value,
    });
    this.getstockMemoList({});
  };
  handlePagination = page => {
    this.getstockMemoList(page);
  };

  handleCreateNewPopup = async () => {
    await this.setState(prevState => ({
      isCreateNewInventoryPopup: !prevState.isCreateNewInventoryPopup,
    }));
  };
  handleCreateNewSave = () => {
    this.handleCreateNewPopup();
    this.getstockMemoList({});
  };
  handleReversalPopup = async () => {
    await this.setState(prevState => ({
      isReversalPopup: !prevState.isReversalPopup,
    }));
  };

  handleReversal = async data => {
    await this.setState({
      stockMemoId: 0,
      qty: 0,
      reversalqty: 0,
    });
    await this.setState({
      stockMemoId: data.id,
      qty: data.qty,
    });
    this.handleReversalPopup();
  };
  handleReversalSubmitClick = () => {
    let { reversalqty, qty } = this.state;
    if (reversalqty <= 0 || reversalqty == "" || reversalqty > qty) {
      Toast({ type: "error", message: "Please enter valid Qty!" });
    } else {
      this.handleReversalUpdate();
    }
  };
  handleReversalUpdate = () => {
    let { reversalqty, stockMemoId } = this.state;
    let data = { quantity: Number(reversalqty) };
    this.props
      .commonPatchApi(`stockusagememo/${stockMemoId}/`, data)
      .then(async res => {
        console.log(res);
        if (res.status === 200) {
          this.handleReversalPopup();
          this.getstockMemoList({});
        }
      });
  };
  handleChange = async ({ target: { value, name } }) => {
    await this.setState({
      [name]: value,
    });
  };
  render() {
    let {
      searchDate,
      stockMemoList,
      stockMemoListHeader,
      isCreateNewInventoryPopup,
      meta,
      isReversalPopup,
      qty,
      reversalqty,
    } = this.state;
    return (
      <>
        <div className="row mt-3">
          <div className="col-6 p-0 m-0">
            <div className="col-3 p-0">
              <div className="">
                <NormalDate
                  value={new Date(searchDate)}
                  name="searchDate"
                  type="date"
                  onChange={this.handleDateChange}
                />
              </div>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="d-flex justify-content-end">
              <NormalButton
                buttonClass={"col-3"}
                mainbg={true}
                className="col-12 ml-4 fs-15 "
                label="Add New"
                onClick={this.handleCreateNewPopup}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="table-container table-responsive mt-3">
            <TableWrapper
              headerDetails={stockMemoListHeader}
              queryHandler={this.handlePagination}
              pageMeta={meta}
            >
              {stockMemoList && stockMemoList.length > 0
                ? stockMemoList.map((item, index) => {
                    return (
                      <tr className="w-100" key={index}>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {item.date_out}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {item.item_name}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {item.staff_name}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {item.qty}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {item.uom}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {item.memo_remarks}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <NormalButton
                              mainbg={true}
                              className="col-12 fs-15 "
                              label="Reversal"
                              onClick={() => this.handleReversal(item)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </TableWrapper>
            {isReversalPopup ? (
              <NormalModal
                className={"select-category Treatment-usage"}
                style={{ minWidth: "25%" }}
                modal={isReversalPopup}
                handleModal={this.handleReversalPopup}
              >
                <img
                  onClick={this.handleReversalPopup}
                  className="close"
                  src={closeIcon}
                  alt=""
                />
                <div className="d-flex h5 justify-content-center p-1">
                  Reversal
                </div>
                <div className="row p-3">
                  <div className="col-4 mb-3">
                    <label className="text-left text-black common-label-text ">
                      Qty
                    </label>
                    <div className="input-group">
                      <NormalInput value={qty} name="qty" disabled />
                    </div>
                  </div>

                  <div className="col-4 mb-3">
                    <div>
                      <label className="text-left text-black common-label-text ">
                        Reversal Qty
                        <span className="error-message text-danger validNo fs-16">
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group">
                      <NormalInput
                        value={reversalqty}
                        name="reversalqty"
                        onChange={this.handleChange}
                        type={`number`}
                      />
                    </div>
                  </div>
                  <div className="col-4 mb-3">
                    <div className="d-flex justify-content-center p-4 w-100">
                      <NormalButton
                        mainbg={true}
                        className="col-12 ml-4 fs-15 "
                        label="Submit"
                        onClick={this.handleReversalSubmitClick}
                      />
                    </div>
                  </div>
                </div>
              </NormalModal>
            ) : null}
            {isCreateNewInventoryPopup ? (
              <CreateNewInventory
                isCreateNewInventoryPopup={isCreateNewInventoryPopup}
                handleCreateNewPopup={this.handleCreateNewPopup}
                handleCreateNewSave={this.handleCreateNewSave}
              />
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCommonApi,
      commonPatchApi,
    },
    dispatch
  );
};

export const InventoryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryListClass);
