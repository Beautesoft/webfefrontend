import React from "react";
import { Link } from "react-router-dom";
import { NormalInput, NormalSelect, NormalButton } from "component/common";
import { bindActionCreators } from "redux";
import {
  addRedeemPlolicySettings,
  updateRedeemPlolicySettings,
  getRedeemPlolicySettings,
} from "redux/actions/customerPlus";
import { getCommonApi } from "redux/actions/common";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

class AddRedeemPolicyClass extends React.Component {
  state = {
    customerClassOptions: [],
    cust_type: "",
    cur_value: 0,
    point_value: 0,
    isactive: true,
    isMounted: true,
  };

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  updateState = (data) => {
    if (this.state.isMounted) this.setState(data);
  };

  componentDidMount() {
    this.props.getCommonApi("CustomerClassList/").then((e) => {
      this.updateState({
        customerClassOptions: e.CustomerClasses.map((e) => {
          return { label: e.class_desc, value: e.class_code };
        }),
      });
    });
    if (this.props.match.params.id) {
      this.props
        .getRedeemPlolicySettings(`/${this.props.match.params.id}`)
        .then((e) => {
          this.updateState({ ...e.data });
        });
    }
  }

  onChange = (e) => {
    this.updateState({ [e.target.name]: e.target.value });
  };

  onSubmit = async () => {
    let { cur_value, cust_type, isactive, point_value } = this.state;
    let data = {
      cur_value,
      cust_type,
      isactive,
      point_value,
    };
    if (this.props.match.params.id) {
      await this.props.updateRedeemPlolicySettings(
        this.props.match.params.id + "/",
        data
      );
    } else {
      await this.props.addRedeemPlolicySettings(data);
    }
    this.props.history.goBack();
  };
  render() {
    let { t } = this.props;
    let { cur_value, cust_type, isactive, point_value, customerClassOptions } =
      this.state;
    return (
      <div className="container-fuild">
        <div className="head-label-nav">
          <p className="category">{t("CustomerPlus")}</p>
          <i className="icon-right mx-md-3"></i>
          <p className="sub-category">{t("Loyalty Points Management")}</p>
          <i className="icon-right mx-md-3"></i>
          <p className="sub-category">
            {t(
              (this.props.match.params.id ? "Edit" : "New") + " Redeem Policy"
            )}
          </p>
        </div>
        <div className="container-lg mt-5">
          <div className="row align-items-center">
            <div className="col-md-12 mb-4">
              <h3>
                {t(
                  (this.props.match.params.id ? "Edit" : "New") +
                    " Redeem Policy"
                )}
              </h3>
            </div>
          </div>
          <div className="form-group pb-2 mb-4">
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  {t("Currency Value")}
                </label>
                <NormalInput
                  name="cur_value"
                  value={cur_value}
                  type="number"
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-6 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  {t("Customer Class")}
                </label>
                <NormalSelect
                  name="cust_type"
                  options={customerClassOptions}
                  value={cust_type}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-6 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  {t("Point Value")}
                </label>
                <NormalInput
                  name="point_value"
                  value={point_value}
                  type="number"
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-6 pt-md-5 mb-4">
                <input
                  type="checkbox"
                  name="isactive"
                  checked={isactive}
                  onClick={() => this.updateState({ isactive: !isactive })}
                />
                <label
                  for="name"
                  className="text-left text-black common-label-text fs-17 pb-3 ml-2"
                >
                  {t("Is Currently Active")}
                </label>
              </div>
            </div>
            <div className="row pt-5 d-flex justify-content-center">
              <div className="col-md-3 mb-4">
                <Link to="/admin/customerplus/lpmanagement">
                  <NormalButton
                    label="Cancel"
                    className="mr-2 bg-danger text-light col-12"
                  />
                </Link>
              </div>
              <div className="col-md-3">
                <NormalButton
                  label="Save"
                  success={true}
                  className="mr-2 col-12"
                  onClick={this.onSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  redeemPolicyList: state.customerPlus.redeemPolicyList,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addRedeemPlolicySettings,
      updateRedeemPlolicySettings,
      getCommonApi,
      getRedeemPlolicySettings,
    },
    dispatch
  );
};

export const AddRedeemPolicy = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AddRedeemPolicyClass)
);
