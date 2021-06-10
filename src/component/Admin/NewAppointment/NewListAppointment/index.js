import React from "react";
import { Scheduler } from "./Scheduler";
import "./style.scss";
import { NormalButton, NormalInput, NormalModal } from "component/common";
import { TreatmentHistory } from "./modal/TreatmentHistory";
import { UpcomingAppointment } from "./modal/UpcomingAppointment";
import closeIcon from "assets/images/close.png";
import _ from "lodash";
import { getCustomer, getCommonApi } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Toast } from "service/toast";
import { Popover, Button } from "antd";
import filter from "assets/images/filter.png";
import { normalizeTickInterval } from "highcharts";

export class NewListAppointmentClass extends React.Component {
  state = {
    isCalander: false,
    selectedDate: null,
    isTreatmentHistoryModal: false,
    isUpcomingAppointmentModal: false,
    customerId: 0,
    custName: "",
    custPhone: "",
    isOpenModal: false,
    customerOption: [],
    search: "",
    customerNumber: 0,
    visible: false,
    language: "",
  };
  handleClick = key => {
    if (!this.state.visible) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    if (this.state.visible) {
      let { basicApptDetail } = this.props;
      this.search(basicApptDetail);
    }
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  };

  handleOutsideClick = e => {
    if (this.node != null) {
      if (this.node.contains(e.target)) {
        return;
      }
    }
    this.handleClick();
  };

  handleBack = () => {
    let { isCalander } = this.state;
    isCalander = false;
    this.setState({
      isCalander,
    });
  };

  handleOpen = async date => {
    let { isCalander, selectedDate } = this.state;
    isCalander = true;
    selectedDate = date;
    await this.setState({
      selectedDate,
    });
    await this.setState({
      isCalander,
    });
  };
  handleTreatmentHistory = () => {
    let { customerId } = this.state;
    if (customerId > 0) {
      this.setState(prevState => ({
        isTreatmentHistoryModal: !prevState.isTreatmentHistoryModal,
        customerNumber: this.state.customerId,
      }));
    } else {
      Toast({ type: "error", message: "Please select customer" });
    }
  };
  handleUpcomingAppointment = () => {
    let { customerId } = this.state;
    if (customerId > 0) {
      this.setState(prevState => ({
        isUpcomingAppointmentModal: !prevState.isUpcomingAppointmentModal,
        customerNumber: this.state.customerId,
      }));
    } else {
      Toast({ type: "error", message: "Please select customer" });
    }
  };

  handleSelectCustomer = async data => {
    await this.setState({
      customerId: data.id,
      custName: data.cust_name,
      custPhone: data.cust_phone1,
      isOpenModal: false,
      customerOption: [],
    });
    this.handleClick();
  };

  handleSearch = async event => {
    let { visible } = this.state;
    visible = true;
    await this.setState({ custName: event.target.value, visible });

    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(async () => {
        let { basicApptDetail } = this.props;
        this.search(basicApptDetail);
      }, 500);
    }
    this.debouncedFn();
  };

  search = basicApptDetail => {
    let { custName } = this.state;
    this.props
      .getCommonApi(
        `custappt/?Outlet=${
          basicApptDetail.branchId ? basicApptDetail.branchId : ""
        }&search=${custName}`
      )
      .then(key => {
        let { status, data } = key;
        if (status === 200) {
          this.setState({ customerOption: data });
        }
      });
  };
  handleDialog = () => {
    let { isOpenModal } = this.state;
    isOpenModal = !isOpenModal;
    this.setState({
      isOpenModal,
    });
  };

  render() {
    let {
      isCalander,
      selectedDate,
      isTreatmentHistoryModal,
      isUpcomingAppointmentModal,
      customerId,
      custName,
      custPhone,
      isOpenModal,
      customerOption,
      search,
      currentIndex,
    } = this.state;
    return (
      <div className="history-search">     
        {this.state.visible ? (
          <div className="customerSearch-block">
            <div className="row mt-4 table table-header w-100 m-0">
              <div className="col-4">Name</div>
              <div className="col-2">Phone</div>
              <div className="col-3">Cust Code</div>
              <div className="col-3">Email</div>
            </div>
            <div className="response-table w-100">
              {customerOption.length > 0 ? (
                customerOption.map((item, index) => {
                  return (
                    <div
                      className="row m-0 table-body w-100 border"
                      onClick={() => this.handleSelectCustomer(item)}
                      key={index}
                    >
                      <div className="col-4">{item.cust_name}</div>
                      <div className="col-2">{item.cust_phone1}</div>
                      <div className="col-3">{item.cust_code}</div>
                      <div className="col-3">{item.cust_email}</div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center w-100">No Data are available</div>
              )}
            </div>
          </div>
        ) : null}

        {isTreatmentHistoryModal ? (
          <TreatmentHistory
            isTreatmentHistoryModal={isTreatmentHistoryModal}
            handleTreatmentHistory={this.handleTreatmentHistory}
            customerNumber={this.state.customerNumber}
            custName={this.state.custName}
            custPhone={this.state.custPhone}
          />
        ) : (
          ""
        )}
        {isUpcomingAppointmentModal ? (
          <UpcomingAppointment
            isUpcomingAppointmentModal={isUpcomingAppointmentModal}
            handleUpcomingAppointment={this.handleUpcomingAppointment}
            customerNumber={this.state.customerNumber}
            custName={this.state.custName}
            custPhone={this.state.custPhone}
          />
        ) : (
          ""
        )}
        <div>
          <Scheduler handleOpen={this.handleOpen} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  basicApptDetail: state.appointment.basicApptDetail,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCustomer,
      getCommonApi,
    },
    dispatch
  );
};

export const NewListAppointment = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewListAppointmentClass);
