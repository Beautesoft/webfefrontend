import React, { Component } from "react";
import { NormalInput, NormalButton } from "component/common";
import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { forgotPassword, verifyOtp } from "../../redux/actions/auth";
import "assets/scss/pages/login.scss";
import { history } from "helpers";
import { withTranslation } from "react-i18next";

export class ForgotPasswordClass extends Component {
  state = {
    recoverAccount: {
      emp_name: "",
    },
    toggleView: {
      recoverView: 1,
      verificationView: 0,
    },
    viewOtp: false,
  };

  componentWillMount() {
    this.validator = new SimpleReactValidator({
      element: (message) => (
        <span className="error-message font-md">{message}</span>
      ),
      autoForceUpdate: this,
    });
  }

  handleRecoveryInput = ({ target: { value, name } }) => {
    let recoverAccount = Object.assign({}, this.state.recoverAccount);
    recoverAccount[name] = value;
    this.setState({
      recoverAccount,
    });
  };

  handleEmailRecovery = (event) => {
    event.preventDefault();
    let { emp_name, otp } = this.state.recoverAccount;
    if (this.validator.allValid()) {
      let recoverAccount = Object.assign({}, this.state.recoverAccount);
      if (this.state.viewOtp) {
        this.props
          .verifyOtp(`?emp_name=${emp_name}`, { otp: otp })
          .then((res) => {
            if (res.status === 200) {
              history.push(`/auth/resetPassword/${emp_name}`);
            }
          });
      } else {
        this.props.forgotPassword(recoverAccount).then((res) => {
          if (res.status === 200) {
            this.setState({ viewOtp: true });
          }
        });
      }
    } else {
      this.validator.showMessages();
    }
  };

  render() {
    let { recoverAccount, viewOtp } = this.state;
    let { t } = this.props;
    return (
      <>
        <div id="recoverAccount" className="h-100 px-2">
          <h1 className="text-left common-heading mb-5 fs-28">
            {t("Forgot Password")}
          </h1>
          <div className="form-group">
            <label className="text-left text-black common-para-text fs-16 pb-1">
              {t("Please enter your Name")}
            </label>
            <div className="input-group pt-2">
              <NormalInput
                name="emp_name"
                placeholder="Name"
                value={recoverAccount.emp_name}
                onChange={this.handleRecoveryInput}
              />
              {t(" ")}
            </div>
            {this.validator.message(
              "Employee name",
              recoverAccount.emp_name,
              "required"
            )}
            <br></br>
            {viewOtp ? (
              <>
                <label className="text-left text-black common-para-text fs-16 mt-3 pb-1">
                  {t("Please enter OTP")}
                </label>
                <div className="input-group pt-2">
                  <NormalInput
                    name="otp"
                    placeholder="OTP"
                    value={recoverAccount.otp}
                    onChange={this.handleRecoveryInput}
                  />
                  {t(" ")}
                </div>
                {this.validator.message("OTP", recoverAccount.otp, "required")}
              </>
            ) : (
              ""
            )}

            <p
              className="fs-13 text-left tc-primary link-text py-5 cursor-pointer"
              onClick={() => history.push("/auth/login")}
            >
              {t("Back to Login")}
            </p>
            {t(" ")}
          </div>

          <div className="form-group px-0 pt-4 d-flex justify-content-center col-12">
            <NormalButton
              onClick={this.handleEmailRecovery}
              mainbg={true}
              className="mr-2 col-12"
              label="submit"
            />
            {t(" ")}
          </div>
          {t(" ")}
        </div>
        {t(" ")}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      forgotPassword,
      verifyOtp,
    },
    dispatch
  );
};

let component = ForgotPasswordClass;

export const ForgotPassword = withTranslation()(
  connect(null, mapDispatchToProps)(component)
);
