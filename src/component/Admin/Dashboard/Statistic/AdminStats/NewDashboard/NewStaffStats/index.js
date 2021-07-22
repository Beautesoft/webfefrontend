import React, { Component } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCommonApi, commonCreateApi } from "redux/actions/common";
import user from "assets/images/user-image.png";
import { getTokenDetails } from "redux/actions/auth";
import { withTranslation } from "react-i18next";

export class NewStaffStatsClass extends Component {
  state = { staffList: [], limit: 8, page: 1, meta: {} };
  componentDidMount = () => {
    this.getStafflist({});
  };
  getStafflist = (data) => {
    let { page, limit } = this.state;
    this.props
      .getCommonApi(`attendancestaff/?page=${page}&limit=${limit}`)
      .then(async (key) => {
        let { status, data } = key;
        console.log(key, "sdfgsdfgsdfgdfg sdfgsdfgsdfg");
        let { staffList } = this.state;
        let { meta } = this.state;
        staffList = [];
        meta = {};
        // if (data && data.length > 0) {
        //   staffList = data;
        //   meta = data.meta.pagination;
        // }
        console.log(meta, "metalist");
        this.setState({
          staffList,
          meta,
        });
      });
  };

  handleNext = async () => {
    let { page } = this.state;
    page = page + 1;
    await this.setState({
      page,
    });
    if (page > 0) {
      this.getStafflist();
    }
  };

  handleBack = async () => {
    let { page } = this.state;
    page = page - 1;
    await this.setState({
      page,
    });
    if (page > 0) {
      this.getStafflist();
    }
  };

  render() {
    let { staffList, meta } = this.state;
    let { tokenDetail, t } = this.props;
    return (
      <div className="staffStats pb-5">
        <div className="row pb-4">
          <div className="color-detail col-md-7 fs-18 fw-500">
            {t("Hello")} {tokenDetail.username},
          </div>
        </div>
        <div className="row pb-4">
          <div className="color-detail col-md-7 fs-18 fw-500">
            {t("Staffs in attendance today")}
          </div>
        </div>
        <div className="d-flex">
          <div
            className="d-flex justify-content-start align-items-center forward-button cursor-pointer col fw-700"
            onClick={this.handleBack}
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

          <div className="d-flex">
            {staffList.dataList && staffList.dataList.length > 0 ? (
              staffList.dataList.map((item, index) => {
                return (
                  <div className={`d-flex product-card card`} key={index}>
                    <div className="d-flex justify-content-center">
                      <div className="cart-img">
                        <img src={item.emp_pic ? item.emp_pic : user} alt="" />
                      </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center pt-1">
                      <p className="customer-label">{item.emp_name}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mx-1 staff-list cursor-pointer">
                {t("No staffs in attendance")}
              </div>
            )}
          </div>

          <div
            className="d-flex justify-content-end align-items-center back-button cursor-pointer col fw-700"
            onClick={this.handleNext}
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

const mapStateToProps = (state) => ({
  tokenDetail: state.authStore.tokenDetails,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCommonApi,
      commonCreateApi,
      getTokenDetails,
    },
    dispatch
  );
};

export const NewStaffStats = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(NewStaffStatsClass)
);
