import {
  NormalButton,
  NormalDateTime,
  NormalMultiSelect,
  NormalSelect,
} from "component/common";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCommonApi } from "redux/actions/common";
import { Viewer, Designer } from "@grapecity/activereports-react";
import "../style.scss";
import { Fragment } from "react";
import report from "./Files/urr-report-template.json";
const reportName = "urr-report-template.json";

class DailyCollectionReportClass extends Component {
  state = {
    selectedSites: "",
    siteOptions: [],
    selectedSiteGroup: "",
    siteGroupOptions: [],
    isEdit: false,
    isMounted: true,
    isLoading: true,
    start: Date.now(),
    inOptions: [
      { label: "Month", value: "month" },
      { label: "Week", value: "week" },
      { label: "Day", value: "day" },
    ],
    selectedInOption: "week",
    data: null,
  };

  updateState = (state) => {
    if (this.state.isMounted) this.setState(state);
  };

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let { siteOptions, siteGroupOptions } = this.state;
    let branchRes = await this.props.getCommonApi("branchlist/");
    let siteGroupRes = await this.props.getCommonApi("site_group_list/");
    for (let key of branchRes.data) {
      siteOptions.push({
        value: key.itemsite_code,
        label: key.itemsite_desc,
      });
    }
    for (let key of siteGroupRes.data.groups) {
      siteGroupOptions.push({ value: key.code, label: key.description });
    }
    this.updateState({ siteOptions, siteGroupOptions, isLoading: false });
  };

  getFormatedDate = (input) => {
    let date = new Date(input);
    let d = date.getDate();
    let day = d < 10 ? "0" + d : d;
    let a = date.getMonth() + 1;
    let month = a < 10 ? "0" + a : a;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  handleChanges = (e) => {
    this.state[e.target.name] = e.target.value;
    this.updateState({});
  };

  handleMultiSelect = (data = []) => {
    if (data.length == 0) return this.updateState({ selectedSites: "" });
    let { selectedSites } = this.state;
    selectedSites = [];
    data.forEach((element) => {
      selectedSites.push(element.value);
    });
    selectedSites = selectedSites.reduce((a, e) => a + "," + e);
    this.updateState({ selectedSites });
  };

  handleDatePick = (name, value) => {
    this.state[name] = value;
    this.updateState({});
  };

  onRun = async () => {
    this.updateState({ isLoading: true });
    let { data, selectedSites, selectedInOption, selectedSiteGroup, start } =
      this.state;
    let additionalParams = "";
    if (selectedSiteGroup) additionalParams = `&siteGroup=${selectedSiteGroup}`;
    else additionalParams = `&siteCodes=${selectedSites}`;
    let res = await this.props.getCommonApi(
      `SalesDailyReporting?start=${this.getFormatedDate(
        start
      )}&in=${selectedInOption}${additionalParams}`
    );
    console.log(res);
    data = res.data;
    this.updateState({ data, isLoading: false });
  };

  render() {
    let { t } = this.props;
    let { inOptions } = this.state;
    inOptions = inOptions.map((e) => {
      return { ...e, label: t(e.label) };
    });

    function onSaveReport(info) {
      console.log("save clicked");
      console.log(info);
      return Promise.resolve({ displayName: "report" });
    }
    report.DataSources[0].ConnectionProperties.ConnectString = `jsondata=${JSON.stringify(
      { data: this.state.data }
    )}`;
    console.log(report);
    return (
      <div className="container-fluid report-types">
        <div className="row mb-4">
          <div className="col">
            <h3>{t("Daily Collection")}</h3>
          </div>
        </div>
        {this.state.isLoading ? (
          <div class="d-flex mt-5 align-items-center justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row mb-2">
              <div className="col-md-3 col-lg-2 mb-4">
                <NormalButton
                  label={t("Run")}
                  mainbg="true"
                  onClick={this.onRun}
                />
              </div>
              <div className="col-md-4 col-lg-3 mb-4">
                <NormalButton
                  label={
                    this.state.isEdit
                      ? t("Switch to View Mode")
                      : t("Switch to Edit Mode")
                  }
                  mainbg="true"
                  onClick={() =>
                    this.updateState({ isEdit: !this.state.isEdit })
                  }
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-1">
                  {t("From Date")}
                </label>
                <NormalDateTime
                  onChange={this.handleDatePick}
                  value={this.state.start}
                  name="start"
                  showYearDropdown={true}
                />
              </div>
              <div className="col-md-4 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-1">
                  {t("In")}
                </label>
                <NormalSelect
                  onChange={this.handleChanges}
                  options={inOptions}
                  value={this.state.selectedInOption}
                  name="selectedInOption"
                  showYearDropdown={true}
                />
              </div>
              <div className="col-md-4 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-1">
                  {t("Site Group")}
                </label>
                <NormalSelect
                  onChange={this.handleChanges}
                  options={this.state.siteGroupOptions}
                  value={this.state.selectedSiteGroup}
                  name="selectedSiteGroup"
                  showYearDropdown={true}
                />
              </div>
              <div className="col-md-4 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-1">
                  {t("Sites")}
                </label>
                <NormalMultiSelect
                  handleMultiSelect={this.handleMultiSelect}
                  options={this.state.siteOptions}
                  value={this.state.selectedSites}
                  name="selectedSites"
                  showYearDropdown={true}
                />
              </div>
            </div>
            <div className="row mb-4">
              {this.state.data ? (
                <Fragment>
                  {this.state.isEdit ? (
                    <div id="designer-host">
                      <Designer
                        report={{
                          id: reportName,
                          displayName: reportName,
                        }}
                        language={localStorage.getItem("lang")}
                        onSave={onSaveReport}
                      />
                    </div>
                  ) : (
                    <div id="viewer-host">
                      <Viewer
                        report={{ Uri: report }}
                        availableExports={[]}
                        sidebarVisible={true}
                        language={localStorage.getItem("lang")}
                      />
                    </div>
                  )}
                </Fragment>
              ) : null}
            </div>
          </>
        )}
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

export const DailyCollectionReport = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(DailyCollectionReportClass)
);
