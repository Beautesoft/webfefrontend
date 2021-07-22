import React, { Component } from "react";
import { getCommonApi } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";

class StaffListClass extends Component {
  componentDidMount = () => {};

  render() {
    let { staffList, meta, t } = this.props;
    return (
      <div>
        <div className="staff-listing d-flex">
          <div
            className="d-flex justify-content-start align-items-center forward-button cursor-pointer col fw-700"
            onClick={this.props.handleBack}
          >
            {meta && Number(meta.current_page) !== 1 ? (
              <svg
                width="10"
                height="25"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 0.5L1 5L5 9.5"
                  stroke="#888888"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </div>
          {staffList.dataList && staffList.dataList.length > 0 ? (
            staffList.dataList.map((item, index) => {
              return (
                <div
                  className="mx-1 staff-list cursor-pointer col p-2"
                  key={index}
                  onClick={() => this.props.handleSelectedStaff(item)}
                >
                  <img src={item.emp_pic} alt="" />
                  <span className="fs-11">{item.emp_name}</span>
                </div>
              );
            })
          ) : (
            <div className="mx-1 staff-list cursor-pointer">{t("No data")}</div>
          )}

          <div
            className="d-flex justify-content-end align-items-center back-button cursor-pointer col fw-700"
            onClick={this.props.handleNext}
          >
            {meta && Number(meta.current_page) !== Number(meta.total_pages) ? (
              <svg
                width="10"
                height="25"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 9.5L4.5 5L0.5 0.5"
                  stroke="#888888"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCommonApi,
    },
    dispatch
  );
};

export const StaffList = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(StaffListClass)
);
