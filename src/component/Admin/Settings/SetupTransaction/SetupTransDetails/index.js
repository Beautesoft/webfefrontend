import React, { Component } from "react";
import {
  NormalInput,
  NormalTextarea,
  NormalSelect,
  NormalButton,
} from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import { getCommonApi, commonDeleteApi } from "redux/actions/common";
import { history } from "helpers";
import "./style.scss";
import { withTranslation } from "react-i18next";

export class SetupTransDetailsClass extends Component {
  state = {
    formFields: {
      title: "",
      logo_pic: "",
      site_id: 0,
      gst_reg_no: "",
      trans_h1: "",
      trans_h2: "",
      trans_footer1: "",
      trans_footer2: "",
      trans_footer3: "",
      trans_footer4: "",
    },

    setupTransactionId: null,
  };
  componentDidMount = () => {
    this.setState({
      setupTransactionId: this.props.match.params.id,
    });
    if (this.props.match.params.id && this.props.match.params.id > 0) {
      this.props
        .getCommonApi(`title/${this.props.match.params.id}/`)
        .then((res) => {
          if (res.status == 200) {
            this.setState({ formFields: res.data });
            console.log(res, "smtpsettingviewclick");
          }
        });
    }
  };
  handleDeleteSetupTrans = (id) => {
    this.props.commonDeleteApi(`title/${id}/`).then((res) => {});
    this.props.history.push(`/admin/settings/setuptransaction`);
  };
  render() {
    let { formFields, setupTransactionId } = this.state;
    let { t } = this.props;
    return (
      <div className="smtp-Setting-detail-section col-12">
        <div className="card row">
          <div className="d-flex flex-row">
            <div className="col-6">
              <div className="d-flex justify-content-start head-label-nav p-4">
                <p
                  className="category"
                  onClick={() =>
                    this.props.history.push(`/admin/settings/setuptransaction`)
                  }
                >
                  {t("Setup Transaction")}
                </p>
                <i className="icon-right mx-md-3"></i>
                <p className="sub-category">{t("Details")}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex justify-content-end p-4">
                <div className="col-3 icon-change">
                  <button
                    className="btn outline-btn col-12 mx-2 fs-15 float-right text-capitalize"
                    onClick={() =>
                      this.props.history.push(
                        `/admin/settings/setuptransaction/${this.props.match.params.id}/edit`
                      )
                    }
                  >
                    <span className="icon-edit mr-2"></span>
                    {t("Edit")}
                  </button>
                </div>
                <div className="col-3 icon-change">
                  <button
                    className="btn outline-btn col-12 mx-2 fs-15 float-right text-capitalize"
                    onClick={() =>
                      this.handleDeleteSetupTrans(this.props.match.params.id)
                    }
                  >
                    <span className="icon-delete mr-2"></span>
                    {t("Delete")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container border p-3">
            <div className="d-flex flex-wrap">
              <div className="col-md-3 col-12"></div>
              <div className="col-md-3 col-12">
                <p className="fw-500 pb-4">{t("Title")}</p>
              </div>
              <div className="col-md-6 col-12">
                <p className="pb-4">{formFields.title}</p>
              </div>

              <div className="col-md-3 col-12"></div>
              <div className="col-md-3">
                <p className="fw-500 pb-4">{t("Header 1")}</p>
              </div>
              <div className="col-md-6">
                <p className=" pb-4">{formFields.trans_h1}</p>
              </div>

              <div className="col-md-3 col-12"></div>
              <div className="col-md-3 col-12">
                <p className="fw-500 pb-4">{t("Header 2")}</p>
              </div>
              <div className="col-md-6 col-12">
                <p className=" pb-4">{formFields.trans_h2}</p>
              </div>

              <div className="col-md-3 col-12"></div>
              <div className="col-md-3 col-12">
                <p className="fw-500 pb-4">{t("Footer 1")}</p>
              </div>
              <div className="col-md-6 col-12">
                <p className=" pb-4">{formFields.trans_footer1}</p>
              </div>

              <div className="col-md-3 col-12"></div>
              <div className="col-md-3 col-12">
                <p className="fw-500 pb-4">{t("Footer 2")}</p>
              </div>
              <div className="col-md-6 col-12">
                <p className=" pb-4">{formFields.trans_footer2}</p>
              </div>

              <div className="col-md-3 col-12"></div>
              <div className="col-md-3 col-12">
                <p className="fw-500 pb-4">{t("Footer 3")}</p>
              </div>
              <div className="col-md-6 col-12">
                <p className=" pb-4">{formFields.trans_footer3}</p>
              </div>

              <div className="col-md-3 col-12"></div>
              <div className="col-md-3 col-12">
                <p className="fw-500 pb-4">{t("Footer 4")}</p>
              </div>
              <div className="col-md-6">
                <p className=" pb-4">{formFields.trans_footer4}</p>
              </div>
              <div className="col-md-3 col-12"></div>
              <div className="col-md-3 col-12">
                <p className="fw-500 pb-4">{t("Gst Reg. No.")}</p>
              </div>
              <div className="col-md-6 col-12">
                <p className=" pb-4">{formFields.gst_reg_no}</p>
              </div>
              <div className="col-md-3 col-12"></div>
              <div className="col-md-3 col-12">
                <p className="fw-500 pb-4">{t("Site")}</p>
              </div>
              <div className="col-md-6 col-12">
                <p className=" pb-4">{formFields.product_license}</p>
              </div>

              <div className="col-md-3 col-12"></div>
              <div className="col-md-3 col-12">
                <p className="fw-500 pb-4">{t("Logo")}</p>
              </div>
              <div className="col-md-6 col-12">
                <p className=" pb-4">
                  <img
                    src={formFields.logo_pic}
                    alt=""
                    width="55px"
                    height="50px"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-12 p-4">
            <div className="d-flex justify-content-center">
              <NormalButton
                buttonClass={"treatment"}
                mainbg={true}
                className="col-12"
                label="Go Back to List"
                onClick={() =>
                  this.props.history.push(`/admin/settings/setuptransaction`)
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customerDetail: state.customer.customerDetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCommonApi,
      commonDeleteApi,
    },
    dispatch
  );
};
export const SetupTransDetails = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(SetupTransDetailsClass)
);
