import React, { Component } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { NormalSelect, NormalButton } from "component/common";
import {
  getAuthorizationSettings,
  updateAuthorizationSettings,
} from "redux/actions/staffPlus";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GroupAuthorizationTable } from "./GroupAuthorizationTable";
import { IndividualAuthorizationTable } from "./IndividualAuthorizationTable";
import { withTranslation } from "react-i18next";

export class SecurityAuthorizationClass extends Component {
  state = {
    emp_data: [],
    selected_emp: "",
    security_groups: [],
    selected_securityGroup: "",
    individualData: {
      FEData: [
        {
          label: "FE Operation",
          className: "table-danger",
          values: [
            { label: "FE Login", value: true },
            { label: "Open Drawer", value: true },
          ],
        },
        {
          label: "FE Transaction",
          className: "table-danger",
          values: [
            { label: "DayEnd Settlement", value: false },
            { label: "Exchange Service", value: false },
            { label: "Exchange Product (EXCWOT)", value: false },
            { label: "Void Transaction", value: false },
            { label: "Void Same Day Transaction", value: false },
            { label: "Change Unit Price", value: false },
            { label: "Allow a Discount", value: false },
            { label: "FOC items", value: false },
            { label: "Change Service Expiry Date", value: true },
          ],
        },
      ],
      BEData: [
        {
          label: "Master Configuration",
          className: "table-primary",
          values: [
            { label: "Currency Code", value: false },
            { label: "Payment Type", value: false },
            { label: "Payment Group", value: false },
            { label: "GST Settings", value: false },
          ],
        },
        {
          label: "Master Article",
          className: "table-primary",
          values: [
            { label: "Add Article", value: false },
            { label: "Edit Article", value: false },
            { label: "Delete Article", value: false },
            { label: "Multi-pricing Policy", value: false },
          ],
        },
        {
          label: "Work Schedule",
          className: "table-primary",
          values: [
            { label: "Schedule Type", value: false },
            { label: "Schedule Hour", value: false },
            { label: "Schedule Settings", value: false },
          ],
        },
      ],
    },
    groupData: [],
    groupColumns: [
      "Administrator",
      "Director",
      "Manager",
      "Supervisor",
      "Beauticion",
      "Therapist",
    ],
    isMounted: true,
  };

  componentDidMount() {
    this.updateGroupData();
  }

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  updateState = (data) => {
    if (this.state.isMounted) this.setState(data);
  };

  updateGroupData = async () => {
    console.log("getAuthorizationSettings");
    await this.props.getAuthorizationSettings();
    console.log("getAuthorizationSettings - done");
    let { staffPlusAuthorization } = this.props;
    this.updateState({ groupData: staffPlusAuthorization });
  };

  render() {
    let { groupData, groupColumns, individualData } = this.state;
    let { t } = this.props;
    return (
      <div className="px-5 container-fluid">
        <div className="row align-items-center">
          <div className="col-md-12 mt-4">
            <h3>{t("Group Authorization")}</h3>
          </div>
        </div>
        <div className="tab-table-content">
          <div className="py-4">
            <div className="table-container">
              <GroupAuthorizationTable
                data={groupData}
                onChange={(data) =>
                  this.updateState(() => (this.state.groupData = data))
                }
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-12 mt-4 mb-4 ">
            <h3>{t("Individual Authorization")}</h3>
          </div>
        </div>
        <div className="form-group mb-4 pb-2">
          <div className="row">
            <div className="col-12">
              <label className="text-left text-black common-label-text fs-17 pb-3">
                {t("Employee")}
              </label>
              <div className="input-group">
                <NormalSelect />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group mb-4 pb-2">
          <div className="row">
            <div className="col-12">
              <label className="text-left text-black common-label-text fs-17 pb-3">
                {t("Security Group")}
              </label>
              <div className="input-group">
                <NormalSelect />
              </div>
            </div>
          </div>
        </div>
        <div className="tab-table-content">
          <div className="py-4">
            <div className="table-container">
              <IndividualAuthorizationTable
                FEData={individualData.FEData}
                BEData={individualData.BEData}
                onFEChange={(data) =>
                  this.updateState(
                    () => (this.state.individualData.FEData = data)
                  )
                }
                onBEChange={(data) =>
                  this.updateState(
                    () => (this.state.individualData.BEData = data)
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="form-group mb-4 pb-2">
          <div className="pt-5 d-flex justify-content-center">
            <div className="col-2">
              <Link to="/admin/staffplus">
                <NormalButton
                  label="Cancel"
                  className="mr-2 bg-danger text-light col-12"
                />
              </Link>
            </div>
            <div className="col-2">
              <NormalButton
                label="Save"
                success={true}
                className="mr-2 col-12"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  staffPlusAuthorization: state.staffPlus.staffPlusAuthorization,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAuthorizationSettings,
      updateAuthorizationSettings,
    },
    dispatch
  );
};

export const SecurityAuthorization = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(SecurityAuthorizationClass)
);
