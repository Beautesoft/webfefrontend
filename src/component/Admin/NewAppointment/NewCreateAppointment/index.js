import React, { Component } from "react";
// import { Cart } from './Cart'
import "./style.scss";
import { CustomerAppointment } from "./customerAppoitment";
// import { Treatment } from './treatments';
import Availability from "./Availability";
import { dateFormat } from "service/helperFunctions";
import { getCommonApi } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NormalModal } from "component/common";
import closeIcon from "assets/images/close.png";
import { history } from "helpers";

export class CreateAppointmentClass extends Component {
  state = {
    list: [],
    isOpenModal: true,
  };

  componentDidMount = () => {
    debugger;
    this.props
      .getCommonApi(
        `staffsavailable/?Appt_date=${dateFormat(new Date(), "yyyy-mm-dd")}`
      )
      .then(key => {
        let { status, data } = key;
        if (status === 200) {
          // for (let value of data) {
          //     staffList.push({ value: value.id, label: value.emp_name })
          // }
          this.setState({ list: data });
        }
      });
  };

  handleCloseDialog = () => {
    this.setState({
      isOpenModal: false,
    });
    history.push(`/admin/newappointment`);
  };

  render() {
    let { list, isOpenModal } = this.state;
    return (
      <>
        <NormalModal
          className="col-12 col-md-12 col-sm-12"
          style={{ minWidth: "1100px", height: "100%" }}
          modal={isOpenModal}
          handleModal={this.handleCloseDialog}
        >
          <img
            onClick={this.handleCloseDialog}
            className="close"
            src={closeIcon}
            alt=""
          />
          <div className="row">
            {/* {
              <div className="col-md-2 pr-0 position-relative">
                <div className="availability">
                  <p className="heading">Staff Availability</p>
                  {list.map((data, index) => (
                    <>
                      <Availability availability={data}></Availability>
                    </>
                  ))}
                </div>
              </div>
            } */}
            <div className=" col-md-12 col-12 appointment-box appointment-col">
              <div className="appointment">
                <div className="appointment-holder">
                  <CustomerAppointment />
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
  customerDetail: state.appointment.customerDetail,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCommonApi,
    },
    dispatch
  );
};

export const NewCreateAppointment = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAppointmentClass);
