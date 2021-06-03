import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation } from "react-minimal-side-navigation";
import { getJobtitle, getCommonApi } from "redux/actions/common";
import {
  getStaffPlus,
  getStaffSchedule,
  getAllEmpSchedule,
} from "redux/actions/staffPlus";
import { NormalSelect, NormalInput, Pagination } from "component/common";
import { ScheduleTable } from "./SheduleTable";
import { CalenderTable } from "./CalenderTable";
import { BigCalander } from "./BigCalander";

class StaffScheduleClass extends React.Component {
  state = {
    currentMenu: "/indi",
    startMonth: new Date(),
    endMonth: new Date(),
    selectedMonth: new Date(),
    fullScheduleMonth: new Date(),
    formFields: {
      ws: [],
      altws: [],
      cal_data: [],
      status: "All",
      staff_data: [
        { name: "apple", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
        { name: "orange", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
        { name: "mango", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
        { name: "mango", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
        { name: "mango", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
        { name: "mango", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
      ],
    },
    pageMeta: {},
    jobOption_selected: "",
    jobOption: [],
    staffList_selected: "",
    staffList: [],
    siteOptions: [],
    selectedSiteOption: "",
    filteredSiteOptions: [],
    selected_site: "",
    isLoading: true,
    scheduleOptions: [],
  };

  componentWillMount() {
    const date = new Date();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    this.setState({
      selectedMonth: `${year}-${month}`,
      startMonth: `${year}-${month}`,
      endMonth: `${year}-${month}`,
      fullScheduleMonth: `${year}-${month}`,
    });
    this.getDatafromStore();
  }

  getDatafromStore = async () => {
    await this.props.getJobtitle();
    let scheduleRes = await this.props.getCommonApi("WorkScheduleHours/");
    let siteRes = await this.props.getCommonApi("branchlist/");
    let { jobtitleList } = this.props;
    let {
      jobOption,
      jobOption_selected,
      siteOptions,
      filteredSiteOptions,
      scheduleOptions,
    } = this.state;
    for (let key of jobtitleList) {
      jobOption.push({ label: key.level_desc, value: key.id });
    }
    for (let key of siteRes.data) {
      siteOptions.push({ value: key.id, label: key.itemsite_desc });
    }
    for (let key of scheduleRes.schedules) {
      scheduleOptions.push({
        id: key.id,
        value: key.itm_code,
        label: key.itm_desc,
        color: key.itm_color,
        shortDesc: key.shortDesc,
      });
    }

    this.setState({
      jobOption,
      jobOption_selected,
      siteOptions,
      filteredSiteOptions,
      scheduleOptions,
      isLoading: false,
    });
  };

  updateStaffList = async () => {
    this.setState({ isLoading: true });
    let { staffList, staffList_selected, formFields, selected_site } =
      this.state;
    formFields.ws = [];
    formFields.altws = [];
    formFields.cal_data = [];
    formFields.staff_data = [];
    staffList_selected = "";
    selected_site = "";
    if (this.state.jobOption_selected == "") {
      staffList = [];
    } else {
      await this.props.getStaffPlus(
        `?limit=100&EMP_TYPEid=${this.state.jobOption_selected}`
      );

      let { staffPlusDetail } = this.props;

      staffPlusDetail.dataList.forEach((key) => {
        staffList.push({
          label: key.emp_name,
          value: key.emp_code,
          sites: key.Site_Codeid,
        });
      });
    }
    this.setState({
      staffList,
      formFields,
      staffList_selected,
      selected_site,
      isLoading: false,
    });
  };

  updateSiteList = () => {
    let {
      staffList_selected,
      staffList,
      filteredSiteOptions,
      siteOptions,
      formFields,
    } = this.state;
    formFields.ws = [];
    formFields.altws = [];
    formFields.cal_data = [];
    formFields.staff_data = [];
    filteredSiteOptions = [];
    let selected = staffList.find((e) => e.value == staffList_selected);
    filteredSiteOptions = siteOptions.filter((e) => e.value == selected.sites);
    this.setState({ filteredSiteOptions, formFields });
  };

  getScheduleData = async () => {
    let {
      startMonth,
      endMonth,
      jobOption_selected,
      selected_site,
      staffList_selected,
      formFields,
    } = this.state;
    if (
      selected_site == "" ||
      staffList_selected == "" ||
      jobOption_selected == ""
    )
      return;
    let startDate = new Date(startMonth);
    let d = startDate.getDate();
    let day = d < 10 ? "0" + d : d;
    let a = startDate.getMonth() + 1;
    let month = a < 10 ? "0" + a : a;
    let year = startDate.getFullYear();
    startDate = `${year}-${month}-${1}`;

    let endDate = new Date(endMonth);
    endDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
    d = endDate.getDate();
    day = d < 10 ? "0" + d : d;
    a = endDate.getMonth() + 1;
    month = a < 10 ? "0" + a : a;
    year = endDate.getFullYear();
    endDate = `${year}-${month}-${day}`;
    this.setState({ isLoading: true });
    await this.props.getStaffSchedule(
      `?emp_code=${staffList_selected}&site_code=${selected_site}&start=${startDate}&end=${endDate}`
    );
    let { weekSchedule, altWeekSchedule, monthlySchedule } =
      this.props.staffSchedule;
    formFields.ws.monday = weekSchedule.monday;
    formFields.ws.tuesday = weekSchedule.tuesday;
    formFields.ws.wednesday = weekSchedule.wednesday;
    formFields.ws.thursday = weekSchedule.thursday;
    formFields.ws.friday = weekSchedule.friday;
    formFields.ws.saturday = weekSchedule.saturday;
    formFields.ws.sunday = weekSchedule.sunday;
    formFields.altws.monday = altWeekSchedule.monday;
    formFields.altws.tuesday = altWeekSchedule.tuesday;
    formFields.altws.wednesday = altWeekSchedule.wednesday;
    formFields.altws.thursday = altWeekSchedule.thursday;
    formFields.altws.friday = altWeekSchedule.friday;
    formFields.altws.saturday = altWeekSchedule.saturday;
    formFields.altws.sunday = altWeekSchedule.sunday;
    formFields.cal_data = monthlySchedule;
    this.setState({ formFields, isLoading: false });
  };

  getFullScheduleData = async () => {
    let { selected_site, fullScheduleMonth, formFields, pageMeta } = this.state;
    formFields.staff_data = [];
    if (selected_site == "") {
      return this.setState({ formFields });
    }
    this.setState({ isLoading: true });
    let date = new Date(fullScheduleMonth);
    let a = date.getMonth() + 1;
    let month = a < 10 ? "0" + a : a;
    let year = date.getFullYear();
    await this.props.getAllEmpSchedule(
      `?siteCode=${selected_site}&year=${year}&month=${month}`
    );
    let { staffAllEmpSchedule } = this.props;
    staffAllEmpSchedule.per_page = pageMeta;
    for (let key of staffAllEmpSchedule.fullSchedule) {
      formFields.staff_data.push({
        name: key.emp_name,
        schedule: key.schedules.map((e) => {
          let date = new Date(e.date);
          return { day: date.getDate(), value: e.itm_type };
        }),
      });
    }
    this.setState({ formFields, pageMeta });
  };

  onJobChanged = (e) => {
    this.state.jobOption_selected = e.target.value;
    this.setState({});
    this.updateStaffList();
  };

  onStaffChanged = (e) => {
    this.state.staffList_selected = e.target.value;
    this.setState({});
    this.updateSiteList();
  };

  onSiteChange = (e) => {
    this.state.selected_site = e.target.value;
    this.setState({});
    this.getScheduleData();
  };

  onSiteOptionChange = (e) => {
    this.state.selectedSiteOption = e.target.value;
    this.setState({});
  };

  onFullScheduleMonthChange = (e) => {
    this.state.fullScheduleMonth = e.target.value;
    this.setState({});
  };

  render() {
    let {
      currentMenu,
      formFields,
      startMonth,
      endMonth,
      jobOption,
      jobOption_selected,
      staffList_selected,
      staffList,
      filteredSiteOptions,
      isLoading,
      selected_site,
      siteOptions,
      selectedSiteOption,
      selectedMonth,
      scheduleOptions,
      fullScheduleMonth,
    } = this.state;

    let { ws, altws, cal_data, status, staff_data } = formFields;

    const handleMenuSelection = (value) => {
      this.setState({ currentMenu: value });
    };

    const handleMonthChange = (e) => {
      this.state[e.target.name] = e.target.value;
      if (e.target.name == "startMonth") {
        this.state.endMonth = this.state.startMonth;
        this.state.selectedMonth = this.state.startMonth;
      } else if (e.target.name == "endMonth")
        this.state.selectedMonth = this.state.startMonth;
      this.getScheduleData();
      this.setState({});
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-2 mb-4">
            <Navigation
              activeItemId={currentMenu}
              onSelect={({ itemId }) => handleMenuSelection(itemId)}
              items={[
                {
                  title: "Individual Schedule",
                  itemId: "/indi",
                },
                {
                  title: "Full Schedule",
                  itemId: "/full",
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
          ) : (
            <div className="col-xl">
              <div className="row align-items-center">
                <div className="col-md-8 mb-4">
                  <h3>
                    {currentMenu == "/indi" ? "Individual" : "Full"} Staff
                    Schedule
                  </h3>
                </div>
              </div>
              {currentMenu == "/indi" ? (
                <>
                  <div className="form-group mb-4 pb-2">
                    <div className="row">
                      <div className="col-12">
                        <label className="text-left text-black common-label-text fs-17 pb-3">
                          Employee Type
                        </label>
                        <div className="input-group">
                          <NormalSelect
                            options={jobOption}
                            value={jobOption_selected}
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
                          Staff
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
                  <div className="form-group mb-4 pb-2">
                    <div className="row">
                      <div className="col-12">
                        <label className="text-left text-black common-label-text fs-17 pb-3">
                          Site List
                        </label>
                        <div className="input-group">
                          <NormalSelect
                            options={filteredSiteOptions}
                            value={selected_site}
                            onChange={this.onSiteChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-4 pb-2">
                    <div className="row">
                      <div className="col-12">
                        <label className="text-left text-black common-label-text fs-17 pb-3">
                          Work Schedule
                        </label>
                        <ScheduleTable
                          data={ws}
                          altws_data={altws}
                          optionList={scheduleOptions}
                          onChange={(data) => {
                            let { formFields } = this.state;
                            formFields["ws"] = data;
                            this.setState({
                              formFields,
                            });
                          }}
                          onAltChange={(data) => {
                            let { formFields } = this.state;
                            formFields["altws"] = data;
                            this.setState({
                              formFields,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-4 pb-2">
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <label className="text-left text-black common-label-text fs-17 pb-3">
                          Start Year and Month
                        </label>
                        <div className="input-group">
                          <NormalInput
                            type="month"
                            value={startMonth}
                            name="startMonth"
                            onChange={handleMonthChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-4">
                        <label className="text-left text-black common-label-text fs-17 pb-3">
                          End Year and Month
                        </label>
                        <div className="input-group">
                          <NormalInput
                            type="month"
                            value={endMonth}
                            min={startMonth}
                            name="endMonth"
                            onChange={handleMonthChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <label className="text-left text-black common-label-text fs-17 pb-3">
                          Selected Year and Month
                        </label>
                        <div className="input-group">
                          <NormalInput
                            type="month"
                            value={selectedMonth}
                            min={startMonth}
                            max={endMonth}
                            name="selectedMonth"
                            onChange={handleMonthChange}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-group">
                          <CalenderTable
                            data={cal_data}
                            date={selectedMonth}
                            onChange={(data) => {
                              let { formFields } = this.state;
                              formFields["cal_data"] = data;
                              this.setState({
                                formFields,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group mb-4 pb-2">
                    <div className="row">
                      <div className="col-12 mb-4">
                        <label className="text-left text-black common-label-text fs-17 pb-3">
                          Site
                        </label>
                        <div className="input-group">
                          <NormalSelect
                            options={siteOptions}
                            value={selectedSiteOption}
                            name="selectedSiteOption"
                            onChange={this.onSiteOptionChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-4 pb-2">
                    <div className="row">
                      <div className="col-4 mb-4">
                        <label className="text-left text-black common-label-text fs-17 pb-3">
                          Year and Month
                        </label>
                        <div className="input-group">
                          <NormalInput
                            type="month"
                            value={fullScheduleMonth}
                            onChange={this.onFullScheduleMonthChange}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-group">
                          <BigCalander
                            date={startMonth}
                            data={staff_data}
                            onChange={(data) => {
                              let { formFields } = this.state;
                              formFields["staff_data"] = data;
                              this.setState({
                                formFields,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="palette">
                    <div className="color-detail">
                      <div className="color"></div>
                      <div className="detail">Available</div>
                    </div>
                    <div className="color-detail">
                      <div className="color not-available"></div>
                      <div className="detail">Holiday</div>
                    </div>
                  </div>
                </>
              )}
              <div className="row m-2">
                {scheduleOptions.map((e) => {
                  return (
                    <div className="col-md-6 col-lg-4 col-sm-12">
                      <div className="row w-100">
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "5px",
                            backgroundColor: `${e.color}`,
                          }}
                        />
                        {e.shortDesc} - {e.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  jobtitleList: state.common.jobtitleList,
  staffPlusDetail: state.staffPlus.staffPlusDetail,
  staffSchedule: state.staffPlus.staffPlusSchedule,
  staffAllEmpSchedule: state.staffPlus.staffPlusAllEmpSchedule,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getJobtitle,
      getStaffPlus,
      getCommonApi,
      getStaffSchedule,
      getAllEmpSchedule,
    },
    dispatch
  );
};

export const StaffSchedule = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffScheduleClass);
