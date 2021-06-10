import React, { Component } from "react";
import {
  updateForm,
  getCommonApi,
  commonCreateApi,
  commonPatchApi,
} from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  NormalButton,
  NormalModal,
  NormalInput,
  TableWrapper,
  NormalTextarea,
} from "component/common";
import classnames from "classnames";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import closeIcon from "assets/images/close.png";
import { ItemUsageUpdatePopup } from "./ItemUsageUpdatePopup";
import { Toast } from "service/toast";
import { TreatmentUsageDetail } from "./TreatmentUsageDetail";

export class TreatmentUsagePopupClass extends Component {
  state = {
    TreatmentUsageListHeader: [
      { label: "No." },
      { label: "Item Code" },
      { label: "Link Code" },
      { label: "Item Desc" },
      { label: "Quantity" },
      { label: "UOM" },
      { label: "Remove" },
    ],
    TreatmentUsageList: [],
    meta: {},
    ExchangeTreatmentListHeader: [
      { label: "No." },
      { label: "Staff Code" },
      { label: "Staff Name" },
      { label: "Trmt No" },
      { label: "Original Item Code" },
      { label: "Original Item Desc" },
      { label: "Exchange Item Code" },
      { label: "Exchange Item Desc" },
      { label: "Trans#" },
      { label: "Trans. Date" },
      { label: "Exchange Date" },
    ],
    ExchangeTreatmentList: [],
    ExchangeMeta: {},
    activeTab: "3",
    isItemUsageUpdatePopup: false,
    TreatmentHistoryId: 0,
    treatment_code: "",
    course: "",
    remarks: "",
    EditableRemark: true,
    ExchangeStaffListHeader: [
      { label: "No." },
      { label: "Staff Code" },
      { label: "Staff Name" },
    ],
    ExchangeStaffList: [],
    isNewItemUsage: false,
  };

  componentDidMount = () => {
    this.getTreatmentUsageList(this.props.TreatmentHistoryId);
  };

  getTreatmentUsageList = data => {
    let { TreatmentUsageList } = this.state;
    this.setState({
      TreatmentHistoryId: data,
    });
    if (data > 0) {
      this.props.getCommonApi(`stockusage/${data}/`).then(async res => {
        await this.setState({ treatmentUsageList: [] });
        let { data, status } = res;

        if (status === 200 && res.error !== true) {
          if (data) {
            await this.setState({
              TreatmentHistoryId: data.id,
              treatment_code: data.treatment_code,
              course: data.course,
              remarks: data.remarks,
            });

            let ExchangeStaffList = data.staffs;
            for (let datalist of data.usage) {
              let item_code = datalist.item_code;
              let link_code = datalist.link_code;
              let item_desc = datalist.item_desc;
              let qty = datalist.qty;
              let uom = datalist.uom;
              let stock_id = datalist.id;
              let Treatmentid = data.id;
              TreatmentUsageList.push({
                item_code,
                link_code,
                item_desc,
                qty,
                uom,
                stock_id,
                Treatmentid,
              });
            }
            await this.setState({ TreatmentUsageList, ExchangeStaffList });
          }
        }
      });
    }
  };
  toggle = tab => {
    if (tab == "3") {
      this.setState({ EditableRemark: true });
    } else if (tab == "1") {
      let { TreatmentUsageList } = this.state;
      let filterEditableRemark = TreatmentUsageList.find(
        account => account.Treatmentid === 0
      );
      if (filterEditableRemark) {
        this.setState({ EditableRemark: true });
      } else {
        this.setState({ EditableRemark: false });
      }
    } else {
      this.setState({ EditableRemark: false });
    }
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  itemUsageUpdatePopup = () => {
    let { TreatmentUsageList } = this.state;
    if (TreatmentUsageList && TreatmentUsageList.length > 0) {
      this.setState(prevState => ({
        isItemUsageUpdatePopup: !prevState.isItemUsageUpdatePopup,
      }));
    } else {
      this.setState(prevState => ({
        isNewItemUsage: !prevState.isNewItemUsage,
      }));
    }
  };
  handleCloseItemUsagePopup = () => {
    this.setState(prevState => ({
      isItemUsageUpdatePopup: !prevState.isItemUsageUpdatePopup,
    }));
  };

  remarkHandle = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  includeNewItems = async data => {
    await this.setState({
      isNewItemUsage: false,
      isItemUsageUpdatePopup: false,
      EditableRemark: true,
    });

    let { TreatmentUsageList } = this.state;
    for (let value of data) {
      TreatmentUsageList.push({
        item_code: value.item_code,
        link_code: value.link_code,
        item_desc: value.ItemDesc,
        qty: parseInt(value.qty),
        uom: value.uom,
        stock_id: value.stock_id,
        Treatmentid: 0,
      });
    }
    await this.setState({ TreatmentUsageList });
  };
  handleSave = () => {
    let { TreatmentUsageList, TreatmentHistoryId, remarks } = this.state;
    let data = [];
    for (let final of TreatmentUsageList) {
      if (final.Treatmentid == 0) {
        data.push({
          item_code: final.item_code,
          link_code: final.link_code,
          item_desc: final.item_desc,
          qty: final.qty,
          uom: final.uom,
          stock_id: final.stock_id,
        });
      }
    }
    if (data.length > 0) {
      this.props
        .commonCreateApi(
          `stockusage/?treat_id=${TreatmentHistoryId}&treat_remarks=${remarks}`,
          data
        )
        .then(async res => {
          if (res.status === 201) {
            this.setState({ TreatmentUsageList: [], TreatmentHistoryId: 0 });
            this.props.treatmentUsagePopupclose();
          }
        });
    } else {
      Toast({ type: "error", message: "Please Add New Product and then try!" });
    }
  };
  deleteSelectedItem = async item => {
    if (item.Treatmentid === 0) {
      await this.setState(data => ({
        TreatmentUsageList: data.TreatmentUsageList.filter(
          x => x.stock_id != item.stock_id
        ),
      }));
      let { TreatmentUsageList } = this.state;
      let filterEditableRemark = TreatmentUsageList.find(
        account => account.Treatmentid === 0
      );
      if (filterEditableRemark) {
        this.setState({
          EditableRemark: true,
        });
      } else {
        this.setState({
          EditableRemark: false,
        });
      }
    } else {
      let { TreatmentHistoryId } = this.state;
      this.props
        .commonPatchApi(
          `stockusage/${item.stock_id}/?treat_id=${TreatmentHistoryId}`
        )
        .then(async res => {
          if (res.status === 200) {
            await this.setState(data => ({
              TreatmentUsageList: data.TreatmentUsageList.filter(
                x => x.stock_id != item.stock_id
              ),
            }));
          }
        });
    }
  };

  render() {
    let {
      TreatmentUsageList,
      TreatmentUsageListHeader,
      meta,
      isItemUsageUpdatePopup,
      ExchangeTreatmentList,
      ExchangeTreatmentListHeader,
      ExchangeMeta,
      TreatmentHistoryId,
      treatment_code,
      course,
      remarks,
      EditableRemark,
      ExchangeStaffList,
      ExchangeStaffListHeader,
      isNewItemUsage,
    } = this.state;
    return (
      <NormalModal
        className={"select-category"}
        style={{ minWidth: "75%" }}
        modal={this.props.isTreatmentUsagePopup}
        handleModal={this.props.treatmentUsagePopupclose}
      >
        <img
          onClick={this.props.treatmentUsagePopupclose}
          className="close"
          src={closeIcon}
          alt=""
        />
        <div className="d-flex h4 justify-content-center p-1">
          Treatment Usage
        </div>
        <div className="customer-list container">
          <div className="d-flex justify-content-left">
            <div className="col-2">
              <div className="text-left">{`Treatment Code`}</div>
            </div>
            <div className="col-8">
              <div className="text-left fs-15 fw-500">{treatment_code}</div>
            </div>
          </div>
          <div className="d-flex justify-content-left">
            <div className="col-2">
              <div className="text-left">{`Treatment Name`}</div>
            </div>
            <div className="col-8">
              <div className="text-left fs-15 fw-500">{course}</div>
            </div>
          </div>
          <div className="d-flex justify-content-left">
            <div className="col-2">
              <div className="text-left">Treatment Remarks</div>
            </div>
            <div className="col-8">
              <div className="text-left fs-15 fw-500">
                {EditableRemark ? (
                  <NormalTextarea
                    value={remarks}
                    name="remarks"
                    onChange={this.remarkHandle}
                  />
                ) : (
                  <NormalTextarea
                    value={remarks}
                    name="remarks"
                    onChange={this.remarkHandle}
                    disabled
                  />
                )}
              </div>
            </div>
          </div>
          <div className="beautesoft-navlink customer-detail mt-3">
            <div className="filled-tabs">
              <div className="tabs-block">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "3",
                      })}
                      onClick={() => {
                        this.toggle("3");
                      }}
                    >
                      Detail
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1",
                      })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      Stock Usage
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "4",
                      })}
                      onClick={() => {
                        this.toggle("4");
                      }}
                    >
                      Staff
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2",
                      })}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      Exchange Treatment
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  {this.state.activeTab === "1" ? (
                    <div>
                      <NormalButton
                        mainbg={true}
                        className="col-2 fs-15 mt-3"
                        label="Add Item Usage"
                        onClick={this.itemUsageUpdatePopup}
                      />

                      <div className="table-container table-responsive mt-3">
                        <TableWrapper headerDetails={TreatmentUsageListHeader}>
                          {TreatmentUsageList &&
                          TreatmentUsageList.length > 0 ? (
                            TreatmentUsageList.map((item, index) => {
                              return (
                                <tr className="w-100" key={index}>
                                  <td>
                                    <div className="d-flex align-items-center justify-content-center">
                                      {index + 1}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center justify-content-center">
                                      {item.item_code}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center justify-content-center">
                                      {item.link_code}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center justify-content-center">
                                      {item.item_desc}
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
                                    <div
                                      className="d-flex align-items-center justify-content-center"
                                      onClick={() =>
                                        this.deleteSelectedItem(item)
                                      }
                                    >
                                      <img
                                        width="25"
                                        height="25"
                                        className="ml-3"
                                        src={closeIcon}
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr className="w-100">
                              <td>
                                <div className="d-flex align-items-center justify-content-center">
                                  No data available
                                </div>
                              </td>
                            </tr>
                          )}
                        </TableWrapper>
                      </div>
                      <div className="row text-center justify-content-end w-100 mt-3">
                        <NormalButton
                          buttonClass={"col-2"}
                          mainbg={true}
                          className="col-12 ml-4 fs-15 "
                          label="Save"
                          onClick={this.handleSave}
                        />
                        <NormalButton
                          buttonClass={"col-2"}
                          mainbg={true}
                          className="col-12 ml-4 fs-15 "
                          label="Cancel"
                          onClick={this.props.treatmentUsagePopupclose}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="col-12 d-flex justify-center">
                    {isNewItemUsage ? (
                      <>
                        <NormalModal
                          style={{ minWidth: "280px" }}
                          modal={isNewItemUsage}
                          handleModal={this.toggle}
                        >
                          <div className="row new-cart issued-staff p-3">
                            <div className="col-12">
                              <div>
                                <p>
                                  Do you want to add default product for this
                                  treatment ?
                                </p>
                              </div>
                            </div>
                            <div className="col-12 p-3">
                              <div className="row">
                                <div className="col-3">
                                  <button
                                    onClick={() =>
                                      this.setState({ isNewItemUsage: false })
                                    }
                                    className={`btn outline-btn mx-2 fs-14  text-capitalize`}
                                  >
                                    Yes
                                  </button>
                                </div>
                                <div className="col-3">
                                  <button
                                    onClick={() =>
                                      this.setState(prevState => ({
                                        isNewItemUsage: !prevState.isNewItemUsage,
                                        isItemUsageUpdatePopup: !prevState.isItemUsageUpdatePopup,
                                      }))
                                    }
                                    className={`btn outline-btn mx-2 fs-14  text-capitalize`}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </NormalModal>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  {this.state.activeTab === "2" ? (
                    <div className="table-container table-responsive mt-3">
                      <TableWrapper
                        headerDetails={ExchangeTreatmentListHeader}
                        //queryHandler={this.handlePagination}
                        pageMeta={ExchangeMeta}
                      >
                        {ExchangeTreatmentList &&
                        ExchangeTreatmentList.length > 0 ? (
                          ExchangeTreatmentList.map((item, index) => {
                            return (
                              <tr
                                className="w-100"
                                onClick={() => this.handleSelectTreatment(item)}
                                key={index}
                              >
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    {item.Item_Class}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    {item.item_desc}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    {item.add_duration}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    {item.item_price}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    {item.item_price}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    {item.item_price}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="w-100">
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                No data available
                              </div>
                            </td>
                          </tr>
                        )}
                      </TableWrapper>
                    </div>
                  ) : null}
                </TabPane>
                <TabPane tabId="3">
                  {this.state.activeTab === "3" ? (
                    <TreatmentUsageDetail
                      TreatmentHistoryId={this.props.TreatmentHistoryId}
                      remarks={remarks}
                      treatment_code={treatment_code}
                    />
                  ) : null}
                </TabPane>
                <TabPane tabId="4">
                  {this.state.activeTab === "4" ? (
                    <div className="table-container table-responsive mt-3">
                      <TableWrapper
                        headerDetails={ExchangeStaffListHeader}
                        //queryHandler={this.handlePagination}
                        pageMeta={ExchangeMeta}
                      >
                        {ExchangeStaffList && ExchangeStaffList.length > 0 ? (
                          ExchangeStaffList.map((item, index) => {
                            return (
                              <tr className="w-100" key={index}>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    {item.no}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    {item.staff_code}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    {item.helper_name}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="w-100">
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                No data available
                              </div>
                            </td>
                          </tr>
                        )}
                      </TableWrapper>
                    </div>
                  ) : null}
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
        {isItemUsageUpdatePopup ? (
          <ItemUsageUpdatePopup
            isItemUsageUpdatePopup={isItemUsageUpdatePopup}
            itemUsageUpdatePopup={this.handleCloseItemUsagePopup}
            newItemlist={StockItemUsageList =>
              this.includeNewItems(StockItemUsageList)
            }
          />
        ) : null}
      </NormalModal>
    );
  }
}

const mapStateToProps = state => ({
  // filter: state.dashboard
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateForm,
      getCommonApi,
      commonCreateApi,
      commonPatchApi,
    },
    dispatch
  );
};

export const TreatmentUsagePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(TreatmentUsagePopupClass);
