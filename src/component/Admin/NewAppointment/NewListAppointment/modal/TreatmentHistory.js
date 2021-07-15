import React, { Component } from "react";
import { InputSearch, TableWrapper } from "component/common";
import { updateForm, getCommonApi } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NormalModal } from "component/common";
import closeIcon from "assets/images/close.png";
import _ from "lodash";

export class ListTreatmentHistoryClass extends Component {
  state = {
    headerDetails: [
      { label: "Date" },
      { label: "Description", width: "200px" },
      { label: "Staff" },
      { label: "Location", width: "100px" },
      { label: "Course", width: "200px" },
      { label: "Service Staff" },
      { label: "Txn No." },
    ],
    treatmentPackageList: [],
    meta: {},
    customerNumber: 0,
    CustomerName: "",
    customerPhone: "",
  };

  componentWillMount = async () => {
    await this.setState({
      customerNumber: this.props.customerNumber,
      CustomerName: this.props.custName,
      customerPhone: this.props.custPhone,
    });
    this.getPackageList({});
  };

  getPackageList = data => {
    let { customerNumber } = this.state;
    let { page = 1, limit = 10, search = "" } = data;
    this.props
      .getCommonApi(
        `appttreatmentdonehistory/?cust_id=${customerNumber}&page=${page}&limit=${limit}`
      )
      .then(res => {
        if (res.status === 200) {
          if (res.data) {
            this.setState({
              treatmentPackageList: res.data.dataList,
              meta: res.data.meta.pagination,
            });
          }
        }
      });
  };

  handlePagination = page => {
    this.getPackageList(page);
  };

  // handlesearch = (event) => {
  //     console.log("sadfasdfasdf", event.target.value)
  //     event.persist();

  //     if (!this.debouncedFn) {
  //         this.debouncedFn = _.debounce(() => {
  //             let searchString = event.target.value;
  //             let data = { search: searchString }
  //             this.getPackageList(data)
  //         }, 500);
  //     }
  //     this.debouncedFn();
  // }

  render() {
    let {
      headerDetails,
      treatmentPackageList,
      meta,
      CustomerName,
      customerPhone,
    } = this.state;
    let { customerId } = this.props;
    return (
      <>
        <NormalModal
          className={"multiple-appointment select-category"}
          style={{ minWidth: "80%" }}
          modal={this.props.isTreatmentHistoryModal}
          handleModal={this.props.handleTreatmentHistory}
        >
          <img
            onClick={this.props.handleTreatmentHistory}
            className="close"
            src={closeIcon}
            alt=""
          />
          <div className="customer-list container">
            <div className="tab-table-content">
              <div className="py-2">
                <div className="col-12 p-2 text-center">
                  <h5 className="fw-500">Treatment History</h5>
                </div>
                <div className="d-flex flex-noWrap mb-2">
                  <div className="col-4">
                    <div className="col-12">
                      Customer Name :{" "}
                      <span className="fw-500 h6">{CustomerName}</span>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="col-12">
                      Customer Phone :{" "}
                      <span className="fw-500 h6">{customerPhone}</span>
                    </div>
                  </div>
                </div>
                <div className="table-container">
                  <TableWrapper
                    headerDetails={headerDetails}
                    queryHandler={this.handlePagination}
                    pageMeta={meta}
                  >
                    {treatmentPackageList && treatmentPackageList.length > 0 ? (
                      treatmentPackageList.map((item, index) => {
                        let {
                          date,
                          appt_fr_time,
                          description,
                          staff,
                          itemsite_code,
                          course,
                          service_staff,
                          helper_transacno,
                        } = item;
                        return (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {date} {appt_fr_time}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {description}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {staff}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {itemsite_code}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {course}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {service_staff}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {helper_transacno}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            No data available
                          </div>
                        </td>
                      </tr>
                    )}
                  </TableWrapper>
                </div>
              </div>
            </div>
          </div>
        </NormalModal>
      </>
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
    },
    dispatch
  );
};

export const TreatmentHistory = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTreatmentHistoryClass);
