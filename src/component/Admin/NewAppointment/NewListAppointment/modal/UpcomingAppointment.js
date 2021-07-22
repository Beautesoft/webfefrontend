import React, { Component } from "react";
import { InputSearch, TableWrapper } from "component/common";
import { updateForm, getCommonApi } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NormalModal } from "component/common";
import closeIcon from "assets/images/close.png";
import _ from "lodash";
import { withTranslation } from "react-i18next";

export class UpcomingAppointmentClass extends Component {
  state = {
    headerDetails: [
      { label: "Date" },
      { label: "Description", width: "250px" },
      { label: "Staff" },
      { label: "Status" },
      { label: "Secondary Status" },
      { label: "Location" },
    ],
    upcomingAppList: [],
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
    this.getUpcomingAppList({});
  };

  getUpcomingAppList = (data) => {
    let { customerNumber } = this.state;
    let { page = 1, limit = 10, search = "" } = data;
    this.props
      .getCommonApi(
        `upcomingappointment/?cust_id=${customerNumber}&page=${page}&limit=${limit}`
      )
      .then((res) => {
        console.log(res, "dsfdfaafg");
        if (res.status === 200) {
          if (res.data) {
            this.setState({
              upcomingAppList: res.data.dataList,
              meta: res.data.meta.pagination,
            });
          }
        }
      });
  };

  handlePagination = (page) => {
    this.getUpcomingAppList(page);
  };
  // handlesearch = (event) => {
  //     console.log("sadfasdfasdf", event.target.value)
  //     event.persist();

  //     if (!this.debouncedFn) {
  //         this.debouncedFn = _.debounce(() => {
  //             let searchString = event.target.value;
  //             let data = { search: searchString }
  //             this.getUpcomingAppList(data)
  //         }, 500);
  //     }
  //     this.debouncedFn();
  // }

  render() {
    let { headerDetails, upcomingAppList, meta, CustomerName, customerPhone } =
      this.state;
    let { customerId, t } = this.props;
    return (
      <>
        <NormalModal
          className={"multiple-appointment select-category"}
          style={{ minWidth: "80%" }}
          modal={this.props.isUpcomingAppointmentModal}
          handleModal={this.props.handleUpcomingAppointment}
        >
          <img
            onClick={this.props.handleUpcomingAppointment}
            className="close"
            src={closeIcon}
            alt=""
          />
          <div className="customer-list container">
            <div className="tab-table-content">
              <div className="py-4">
                <div className="col-12 p-2 text-center">
                  <h5 className="fw-500">{t("Upcoming Appointment")}</h5>
                </div>
                <div className="d-flex flex-noWrap mb-2">
                  <div className="col-4">
                    <div className="col-12">
                      {t("Customer Name")} :
                      <span className="fw-500 h6">{CustomerName}</span>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="col-12">
                      {t("Customer Phone")} :
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
                    {upcomingAppList && upcomingAppList.length > 0 ? (
                      upcomingAppList.map((item, index) => {
                        let {
                          id,
                          appt_date,
                          appt_fr_time,
                          appt_remark,
                          emp_name,
                          appt_status,
                          sec_status,
                          itemsite_code,
                        } = item;
                        return (
                          <tr key={id}>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {appt_date} {appt_fr_time}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {appt_remark}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {emp_name}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {appt_status}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {sec_status}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {itemsite_code}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {t("No data available")}
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

const mapStateToProps = (state) => ({
  // filter: state.dashboard
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateForm,
      getCommonApi,
    },
    dispatch
  );
};

export const UpcomingAppointment = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(UpcomingAppointmentClass)
);
