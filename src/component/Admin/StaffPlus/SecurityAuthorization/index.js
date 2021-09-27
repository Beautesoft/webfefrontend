import React, { Component } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { NormalSelect, NormalButton } from "component/common";
import {
  getIndividualAuthorizationSettings,
  updateIndividualAuthorizationSettings,
  getAuthorizationSettings,
  updateAuthorizationSettings,
} from "redux/actions/staffPlus";
import { getJobtitle } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GroupAuthorizationTable } from "./GroupAuthorizationTable";
import { IndividualAuthorizationTable } from "./IndividualAuthorizationTable";
import { withTranslation } from "react-i18next";
import { Navigation } from "react-minimal-side-navigation/lib";
import { getStaffPlus } from "redux/actions/staffPlus";

export class SecurityAuthorizationClass extends Component {
  state = {
    currentMenu: "/group",
    staffList: [],
    staffList_selected: "",
    jobOptions: [],
    jobOptions_selected: "",
    security_groups: [],
    selected_securityGroup: "",
    individualData: [],
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
    isLoading: true,
  };

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  updateState = (data) => {
    if (this.state.isMounted) this.setState(data);
  };

  loadData = async () => {
    this.updateState({ isLoading: true });
    await this.props.getJobtitle();
    await this.props.getAuthorizationSettings();
    let { staffPlusAuthorization, jobtitleList } = this.props;
    let { jobOptions } = this.state;
    for (let key of jobtitleList) {
      jobOptions.push({ label: key.level_desc, value: key.id });
    }
    this.updateState({
      jobOptions,
      isLoading: false,
      groupData: staffPlusAuthorization,
    });
  };

  onJobChanged = (e) => {
    this.state.jobOptions_selected = e.target.value;
    this.updateState({});
    this.updateStaffList();
  };

  updateStaffList = async () => {
    this.updateState({ isLoading: true });
    let { staffList, staffList_selected, individualData } = this.state;
    staffList_selected = "";
    staffList = [];
    individualData = [];
    if (this.state.jobOptions_selected != "") {
      await this.props.getStaffPlus(
        `?limit=100&EMP_TYPEid=${this.state.jobOptions_selected}`
      );

      let { staffPlusDetail } = this.props;

      staffPlusDetail.dataList.forEach((key) => {
        staffList.push({
          label: key.emp_name,
          value: key.id,
          sites: key.site_list.map((e) => e.site_code),
        });
      });
    }
    this.updateState({
      staffList,
      individualData,
      staffList_selected,
      isLoading: false,
    });
  };

  onStaffChanged = async (e) => {
    this.updateState({ isLoading: true });
    let { staffList_selected, individualData } = this.state;
    staffList_selected = e.target.value;
    if (staffList_selected != "") {
      await this.props.getIndividualAuthorizationSettings(staffList_selected);
      let { staffPlusIndividualAuthorization } = this.props;
      individualData = staffPlusIndividualAuthorization?.settings_list;
    }
    this.updateState({ staffList_selected, individualData, isLoading: false });
  };

  onSumbit = async () => {
    this.updateState({ isLoading: true });
    let { currentMenu, groupData, individualData, staffList_selected } =
      this.state;
    try {
      if (currentMenu == "/group") {
        let level_list = groupData.reduce((a, e) => a.concat(e.levels), []);
        await this.props.updateAuthorizationSettings({ level_list });
      } else {
        await this.props.updateIndividualAuthorizationSettings(
          staffList_selected,
          { level_list: individualData }
        );
      }
    } catch (error) {
      console.log(error);
    }
    this.updateState({ isLoading: false });
  };

  render() {
    let {
      isLoading,
      currentMenu,
      groupData,
      jobOptions,
      jobOptions_selected,
      staffList,
      staffList_selected,
      individualData,
    } = this.state;
    let { t } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-2 mb-4">
            <Navigation
              activeItemId={currentMenu}
              onSelect={({ itemId }) => {
                this.updateState({ currentMenu: itemId });
              }}
              items={[
                {
                  title: t("Group Authorization"),
                  itemId: "/group",
                },
                {
                  title: t("Individual Authorization"),
                  itemId: "/indi",
                },
              ]}
            />
          </div>
          {isLoading ? (
            <div className="col">
              <div class="d-flex mt-5 align-items-center justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          ) : currentMenu == "/group" ? (
            <div className="col-lg-10 col-md-12">
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
            </div>
          ) : (
            <div className="col-lg-10 col-md-12">
              <div className="row align-items-center">
                <div className="col-md-12 mt-4 mb-4 ">
                  <h3>{t("Individual Authorization")}</h3>
                </div>
              </div>
              <div className="form-group mb-4 pb-2">
                <div className="row">
                  <div className="col-12">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      {t("Employee Type")}
                    </label>
                    <div className="input-group">
                      <NormalSelect
                        options={jobOptions}
                        value={jobOptions_selected}
                        onChange={this.onJobChanged}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group mb-4 pb-2">
                <div className="row">
                  <div className="col-12">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      {t("Employee")}
                    </label>
                    <div className="input-group">
                      <NormalSelect
                        options={staffList}
                        value={staffList_selected}
                        onChange={this.onStaffChanged}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-table-content">
                <div className="py-4">
                  <div className="table-container">
                    <IndividualAuthorizationTable
                      data={individualData}
                      onChange={(individualData) =>
                        this.updateState({ individualData })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {!isLoading && (
            <div className="col-12 form-group mb-4 pb-2">
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
                    onClick={this.onSumbit}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  staffPlusAuthorization: state.staffPlus.staffPlusAuthorization,
  staffPlusIndividualAuthorization:
    state.staffPlus.staffPlusIndividualAuthorization,
  jobtitleList: state.common.jobtitleList,
  staffPlusDetail: state.staffPlus.staffPlusDetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAuthorizationSettings,
      updateAuthorizationSettings,
      getJobtitle,
      getStaffPlus,
      getIndividualAuthorizationSettings,
      updateIndividualAuthorizationSettings,
    },
    dispatch
  );
};

export const SecurityAuthorization = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(SecurityAuthorizationClass)
);
