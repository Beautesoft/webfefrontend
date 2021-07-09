import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  NormalDateTime,
  NormalMultiSelect,
  NormalSelect,
  Pagination,
} from "component/common";
import {
  getDailyCollections,
  getMonthlyCollections,
  getConsultantCollections,
  getRankingByOutlet,
  getSalesRankingByConsultant,
  getServiceRankingByOutlet,
} from "redux/actions/kpi";
import { getCommonApi } from "redux/actions/common";
import Tree from "react-animated-tree";
import { HorizontalBar } from "react-chartjs-2";
import { Navigation } from "react-minimal-side-navigation";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import "./style.scss";

class KPIDashboardClass extends Component {
  state = {
    data: [],
    orderOptions: [
      { label: "Average", value: "average" },
      { label: "Count", value: "count" },
      { label: "Amount", value: "amount" },
    ],
    startDate: Date.now(),
    endDate: Date.now(),
    selectedIndex: 0,
    isMonth: false,
    rankingDateType: "month",
    isSiteGroup: true,
    selectedSite: [],
    selectedOrder: "",
    selectedSiteGroup: "",
    siteOptions: [],
    siteGroupOptions: [],
    isMounted: true,
    isLoading: true,
    chartData: [],
    diffTablePagination: { current_page: 1, total_pages: 1, per_page: 10 },
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

  getLastDateOfMonth = (input) => {
    let date = new Date(input);
    let d = date.getDate();
    let day = d < 10 ? "0" + d : d;
    let a = date.getMonth() + 1;
    let month = a < 10 ? "0" + a : a;
    let year = date.getFullYear();
    day = new Date(year, month, 0).getDate();
    return `${year}-${month}-${day}`;
  };

  getFirstDateOfMonth = (input) => {
    let date = new Date(input);
    let a = date.getMonth() + 1;
    let month = a < 10 ? "0" + a : a;
    let year = date.getFullYear();
    return `${year}-${month}-01`;
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let branchRes = await this.props.getCommonApi("branchlist/");
    let siteGroupRes = await this.props.getCommonApi("site_group_list/");
    let { siteOptions, siteGroupOptions } = this.state;
    for (let key of branchRes.data) {
      siteOptions.push({
        value: key.itemsite_code,
        label: key.itemsite_desc,
      });
    }
    for (let key of siteGroupRes.data.groups) {
      siteGroupOptions.push({ value: key.code, label: key.description });
    }
    this.updateState({ siteOptions, siteGroupOptions });
    this.loadData();
  };

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  handleDatePick = (name, value) => {
    this.state[name] = value;
    if (name == "startDate") {
      if (
        new Date(this.state.startDate).getTime() >
        new Date(this.state.endDate).getTime()
      )
        this.state.endDate = this.state.startDate;
    }
    this.updateState({});
    this.loadData();
  };

  handleSiteGroupChange = (e) => {
    this.state.selectedSiteGroup = e.target.value;
    this.updateState({});
    this.loadData();
  };

  handleOrderChange = (e) => {
    this.state.selectedOrder = e.target.value;
    this.updateState({});
    this.loadData();
  };

  handleSiteChange = (e) => {
    let sites = [];
    e.forEach((e) => {
      sites.push(e.value);
    });
    this.state.selectedSite = sites;
    this.updateState({});
    this.loadData();
  };

  updateState = (data) => {
    if (this.state.isMounted) this.setState(data);
  };

  loadData = async () => {
    let {
      selectedIndex,
      selectedSiteGroup,
      selectedOrder,
      selectedSite,
      isMonth,
      isSiteGroup,
      rankingDateType,
    } = this.state;
    let type = "sales";
    selectedSite =
      selectedSite.length == 0
        ? ""
        : selectedSite.reduce((acc, val) => acc + "," + val);

    let appendSites = isSiteGroup
      ? `&siteGroup=${selectedSiteGroup}`
      : `&siteCodes=${selectedSite}`;
    this.updateState({ isLoading: true });
    switch (selectedIndex) {
      case 0:
        if (isMonth) {
          await this.props.getMonthlyCollections(
            `?syear=${this.getFormatedDate(this.state.startDate).slice(
              0,
              4
            )}&smonth=${this.getFormatedDate(this.state.startDate).slice(
              5,
              7
            )}&eyear=${this.getFormatedDate(this.state.endDate).slice(
              0,
              4
            )}&emonth=${this.getFormatedDate(this.state.endDate).slice(5, 7)}` +
              appendSites
          );
          this.state.data = this.props.monthlyCollections.data;
          this.state.chartData = this.props.monthlyCollections.chart;
        } else {
          await this.props.getDailyCollections(
            `?start=${this.getFormatedDate(
              this.state.startDate
            )}&end=${this.getFormatedDate(this.state.endDate)}` + appendSites
          );
          this.state.data = this.props.dailyCollections.data;
          this.state.chartData = this.props.dailyCollections.chart;
        }
        break;
      case 1:
        if (isMonth) {
          await this.props.getConsultantCollections(
            `?start=${this.getFirstDateOfMonth(
              this.state.startDate
            )}&end=${this.getLastDateOfMonth(this.state.endDate)}` + appendSites
          );
          this.state.data = this.props.consultantCollections.data;
          this.state.chartData = this.props.consultantCollections.chart;
        } else {
          await this.props.getConsultantCollections(
            `?start=${this.getFormatedDate(
              this.state.startDate
            )}&end=${this.getFormatedDate(this.state.endDate)}` + appendSites
          );
          this.state.data = this.props.consultantCollections.data;
          this.state.chartData = this.props.consultantCollections.chart;
        }
        break;
      case 2:
        type = "sales";
        break;
      case 3:
        type = "service";
        break;
      case 4:
        type = "product";
        break;
      case 5:
        type = "prepaid";
        break;
      case 6:
        appendSites +=
          selectedOrder.length == 0 ? "" : `&order=${selectedOrder}`;
        await this.props.getServiceRankingByOutlet(
          `?start=${this.getFirstDateOfMonth(
            this.state.startDate
          )}&type=${type}&in=${rankingDateType}` + appendSites
        );
        this.state.data = this.props.serviceRankingByConsultant;
        break;
      case 7:
        await this.props.getSalesRankingByConsultant(
          `?start=${this.getFirstDateOfMonth(
            this.state.startDate
          )}&type=${type}&in=${rankingDateType}` + appendSites
        );
        this.state.data = this.props.salesRankingByConsultant;
        break;
      default:
        break;
    }
    if (selectedIndex < 6 && selectedIndex >= 2) {
      await this.props.getRankingByOutlet(
        `?start=${this.getFirstDateOfMonth(
          this.state.startDate
        )}&type=${type}&in=${rankingDateType}` + appendSites
      );
      this.state.data = this.props.rankingByOutlet;
    }
    this.state.diffTablePagination = {
      current_page: 1,
      total_pages: Math.ceil(this.state.data.length / 10),
      per_page: 10,
    };
    this.updateState({
      isLoading: false,
    });
  };

  handleFilterChange = (filterOption = 0) => {
    let { selectedIndex } = this.state;
    if (selectedIndex == filterOption) return;
    this.state.selectedIndex = filterOption;
    this.loadData();
  };

  handlePagination = (page) => {
    this.state.diffTablePagination.current_page = page;
    this.updateState({});
  };

  drawGraph = (prevValue, currentValue) => {
    return (
      <div className="mb-1" style={{ position: "relative", minWidth: "200px" }}>
        <hr
          style={{
            position: "absolute",
            margin: 0,
            border: "10px solid gray",
            borderRadius: "5px",
            width: "80%",
          }}
        ></hr>
        <hr
          style={{
            position: "absolute",
            margin: 0,
            border: "10px solid blue",
            borderRadius: "5px",
            width: (currentValue / (currentValue + prevValue)) * 80 + "%",
          }}
        ></hr>
        <div
          style={{
            position: "absolute",
            color: "white",
            margin: 0,
            marginLeft: "5px",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {currentValue}
        </div>
        <div
          style={{
            position: "absolute",
            color: "white",
            margin: 0,
            marginLeft: "15px",
            width: "80%",
            textAlign: "right",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {prevValue}
        </div>
      </div>
    );
  };

  render() {
    let { data, selectedIndex, chartData } = this.state;

    var sortedChartData = [];
    for (var key in chartData) {
      sortedChartData.push([key, chartData[key]]);
    }

    sortedChartData.sort(function (a, b) {
      return b[1] - a[1];
    });

    const chartDataObj = {
      labels: sortedChartData.map((e) => e[0]),
      datasets: [
        {
          label: "Total Amount",
          data: sortedChartData.map((e) => e[1]),
          backgroundColor: "blue",
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const columns =
      data.length == 0
        ? []
        : Object.keys(data[0])
            .filter((e) => e != "id")
            .map((e) => {
              return {
                field: e,
                width: e.length * 30 + 40,
                headerName:
                  e.replaceAll("_", " ").charAt(0).toUpperCase() +
                  e.replaceAll("_", " ").slice(1),
              };
            });

    const rows = data;

    const getDefaultDateFormat = () => {
      let customDate = new Date(2222, 11, 18);
      let strDate = customDate.toLocaleDateString();
      let format = strDate
        .replace("12", "mm")
        .replace("18", "dd")
        .replace("2222", "yyyy");
      console.log(format);
    };

    const getMenuName = () => {
      switch (selectedIndex) {
        case 0:
          return "Collections";
        case 1:
          return "Collections By Consultant";
        case 2:
          return "Sales Ranking By Outlet";
        case 3:
          return "Service Ranking By Outlet";
        case 4:
          return "Product Ranking By Outlet";
        case 5:
          return "Prepaid Ranking By Outlet";
        case 6:
          return "Sales Ranking (Treatment Done) By Staff";
        case 7:
          return "Sales Ranking By Staff";
        default:
          return "KPI Dashboard";
      }
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-sm-12 col-lg-3 mb-4"
            style={
              this.state.isLoading
                ? { pointerEvents: "none", opacity: 0.2 }
                : {}
            }
          >
            <Navigation
              activeItemId={selectedIndex}
              onSelect={({ itemId }) => this.handleFilterChange(itemId)}
              items={[
                {
                  title: "Collections",
                  itemId: 0,
                },
                {
                  title: "Collections By Consultant",
                  itemId: 1,
                },
                {
                  title: "Sales Ranking By Outlet",
                  itemId: 2,
                },
                {
                  title: "Service Ranking By Outlet",
                  itemId: 3,
                },
                {
                  title: "Product Ranking By Outlet",
                  itemId: 4,
                },
                {
                  title: "Prepaid Ranking By Outlet",
                  itemId: 5,
                },
                {
                  title: "Sales Ranking (Treatment Done) By Staff",
                  itemId: 6,
                },
                {
                  title: "Sales Ranking By Staff",
                  itemId: 7,
                },
              ]}
            />
          </div>
          <div className="col kpi-dashboard">
            <div className="row mb-4">
              <div className="col">
                <h3>{getMenuName()}</h3>
              </div>
            </div>
            <div
              className="kpi-options mb-2"
              springConfig={(e) => console.log(e, "tree")}
            >
              <Tree
                content="Options"
                springConfig={(e) => {
                  if (document.getElementById("optionsTree") != null)
                    if (e)
                      document
                        .getElementById("optionsTree")
                        .classList.remove("d-none");
                    else
                      document
                        .getElementById("optionsTree")
                        .classList.add("d-none");
                }}
              >
                <div id="optionsTree">
                  {selectedIndex > 1 ? (
                    <>
                      <div className="row mb-2">
                        <div className="col-sm-4 col-md-3">
                          <input
                            type="radio"
                            name="rankingDateType"
                            checked={this.state.rankingDateType == "month"}
                            className="mr-2"
                            defaultChecked
                            onClick={() =>
                              this.updateState({ rankingDateType: "month" })
                            }
                          />
                          By Month
                        </div>
                        <div className="col-sm-4 col-md-3">
                          <input
                            type="radio"
                            name="rankingDateType"
                            checked={this.state.rankingDateType == "week"}
                            className="mr-2"
                            defaultChecked
                            onClick={() =>
                              this.updateState({ rankingDateType: "week" })
                            }
                          />
                          By Week
                        </div>
                        <div className="col-sm-4 col-md-3">
                          <input
                            type="radio"
                            name="rankingDateType"
                            checked={this.state.rankingDateType == "day"}
                            className="mr-2"
                            defaultChecked
                            onClick={() =>
                              this.updateState({ rankingDateType: "day" })
                            }
                          />
                          By Day
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-sm-4 col-md-3">
                          <input
                            type="radio"
                            name="isSiteGroup"
                            checked={!this.state.isSiteGroup}
                            className="mr-2"
                            onClick={() =>
                              this.updateState({ isSiteGroup: false })
                            }
                          />
                          By Site
                        </div>
                        <div className="col-sm-4 col-md-3">
                          <input
                            type="radio"
                            name="isSiteGroup"
                            checked={this.state.isSiteGroup}
                            className="mr-2"
                            defaultChecked
                            onClick={() =>
                              this.updateState({ isSiteGroup: true })
                            }
                          />
                          By Site Group
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row mb-2">
                        <div className="col-sm-6 col-md-4">
                          <input
                            type="radio"
                            name="isMonth"
                            checked={!this.state.isMonth}
                            className="mr-2"
                            defaultChecked
                            onClick={() => this.updateState({ isMonth: false })}
                          />
                          By Date
                        </div>
                        <div className="col-sm-6 col-md-4">
                          <input
                            type="radio"
                            name="isSiteGroup"
                            checked={!this.state.isSiteGroup}
                            className="mr-2"
                            defaultChecked
                            onClick={() =>
                              this.updateState({ isSiteGroup: false })
                            }
                          />
                          By Site
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-sm-6 col-md-4">
                          <input
                            type="radio"
                            name="isMonth"
                            checked={this.state.isMonth}
                            className="mr-2"
                            onClick={() => this.updateState({ isMonth: true })}
                          />
                          By Month
                        </div>
                        <div className="col-sm-6 col-md-4">
                          <input
                            type="radio"
                            name="isSiteGroup"
                            checked={this.state.isSiteGroup}
                            className="mr-2"
                            onClick={() =>
                              this.updateState({ isSiteGroup: true })
                            }
                          />
                          By Site Group
                        </div>
                      </div>
                    </>
                  )}
                  <div
                    className="row"
                    style={{ overflow: "visible !important" }}
                  >
                    {selectedIndex > 1 ? (
                      <>
                        <div className="col-md-8 mb-4">
                          <label className="text-left text-black common-label-text fs-17 pb-3">
                            {this.state.rankingDateType == "month"
                              ? "Select Month"
                              : this.state.rankingDateType == "week"
                              ? "Select Start Day of the Week"
                              : "Select Date"}
                          </label>
                          <NormalDateTime
                            onChange={this.handleDatePick}
                            value={this.state.startDate}
                            name="startDate"
                            showYearDropdown={true}
                            dateFormat={
                              this.state.rankingDateType == "month"
                                ? "yyyy/MM"
                                : getDefaultDateFormat()
                            }
                            showMonthYearPicker={
                              this.state.rankingDateType == "month"
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-md-4 mb-4">
                          <label className="text-left text-black common-label-text fs-17 pb-3">
                            Start Date
                          </label>
                          <NormalDateTime
                            onChange={this.handleDatePick}
                            value={this.state.startDate}
                            name="startDate"
                            showYearDropdown={true}
                            dateFormat={
                              this.state.isMonth
                                ? "yyyy/MM"
                                : getDefaultDateFormat()
                            }
                            showMonthYearPicker={this.state.isMonth}
                          />
                        </div>
                        <div className="col-md-4 mb-4">
                          <label className="text-left text-black common-label-text fs-17 pb-3">
                            End Date
                          </label>
                          <NormalDateTime
                            onChange={this.handleDatePick}
                            value={this.state.endDate}
                            minDate={this.state.startDate}
                            name="endDate"
                            showYearDropdown={true}
                            dateFormat={
                              this.state.isMonth
                                ? "yyyy/MM"
                                : getDefaultDateFormat()
                            }
                            showMonthYearPicker={this.state.isMonth}
                          />
                        </div>
                      </>
                    )}
                    <div className="col-md-8 mb-4">
                      {this.state.isSiteGroup ? (
                        <>
                          <label className="text-left text-black common-label-text fs-17 pb-3">
                            Filter By Site Group
                          </label>
                          <NormalSelect
                            options={this.state.siteGroupOptions}
                            value={this.state.selectedSiteGroup}
                            onChange={this.handleSiteGroupChange}
                          />
                        </>
                      ) : (
                        <>
                          <label className="text-left text-black common-label-text fs-17 pb-3">
                            Filter By Site
                          </label>
                          <NormalMultiSelect
                            options={this.state.siteOptions}
                            value={this.state.selectedSite}
                            handleMultiSelect={this.handleSiteChange}
                          />
                        </>
                      )}
                    </div>
                    {selectedIndex == 6 ? (
                      <div className="col-md-8 mb-4">
                        <label className="text-left text-black common-label-text fs-17 pb-3">
                          Order By
                        </label>
                        <NormalSelect
                          options={this.state.orderOptions}
                          value={this.state.selectedOrder}
                          onChange={this.handleOrderChange}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </Tree>
            </div>
            <div className="row">
              {this.state.isLoading ? null : (
                <div className="col-12 mb-4">
                  {selectedIndex <= 1 ? (
                    <Tree content="Visualize">
                      <div
                        style={{
                          height: Object.keys(chartData)?.length * 40 + 50,
                        }}
                      >
                        <HorizontalBar data={chartDataObj} options={options} />
                      </div>
                    </Tree>
                  ) : (
                    <div className="table-responsive">
                      <table
                        class="table"
                        style={{
                          height: 50 * this.state.diffTablePagination.per_page,
                        }}
                      >
                        <thead className="font-weight-bold">
                          <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">
                              {selectedIndex == 6 || selectedIndex == 7
                                ? "Consultant"
                                : "Outlet"}
                            </th>
                            <th scope="col">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="blue"
                                class="bi bi-caret-up-fill"
                                viewBox="0 0 30 20"
                              >
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="red"
                                class="bi bi-caret-down-fill"
                                viewBox="0 0 30 20"
                              >
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                              </svg>
                            </th>
                            <th scope="col">Amount</th>
                            <th scope="col">Graph</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data
                            .slice(
                              (this.state.diffTablePagination.current_page -
                                1) *
                                10,
                              data.length <
                                this.state.diffTablePagination.current_page * 10
                                ? data.length
                                : this.state.diffTablePagination.current_page *
                                    10
                            )
                            .map((e) => (
                              <tr key={e.id}>
                                <td>#{e.rank}</td>
                                <td>
                                  {selectedIndex == 6 || selectedIndex == 7
                                    ? e.consultant
                                    : e.outlet}
                                </td>
                                {e.rankDif == 0 ? (
                                  <td></td>
                                ) : Math.sign(e.rankDif) == 1 ? (
                                  <td className="text-primary">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="30"
                                      height="30"
                                      fill="blue"
                                      class="bi bi-caret-up-fill"
                                      viewBox="0 0 30 20"
                                    >
                                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                    </svg>
                                    {Math.abs(e.rankDif)}
                                  </td>
                                ) : (
                                  <td className="text-danger">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="30"
                                      height="30"
                                      fill="red"
                                      class="bi bi-caret-down-fill"
                                      viewBox="0 0 30 20"
                                    >
                                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                    {Math.abs(e.rankDif)}
                                  </td>
                                )}
                                <td>
                                  {selectedIndex == 6
                                    ? e[
                                        this.state.selectedOrder.length == 0
                                          ? "count"
                                          : this.state.selectedOrder
                                      ]
                                    : e.amount}
                                </td>
                                <td style={{ width: "50%" }}>
                                  {this.drawGraph(
                                    e.prevValue,
                                    selectedIndex == 6
                                      ? e[
                                          this.state.selectedOrder.length == 0
                                            ? "count"
                                            : this.state.selectedOrder
                                        ]
                                      : e.amount
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      <Pagination
                        handlePagination={this.handlePagination}
                        pageMeta={this.state.diffTablePagination}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-12" style={{ height: 800 }}>
                {this.state.isLoading ? (
                  <div class="d-flex mt-5 align-items-center justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  dailyCollections: state.kpi.dailyCollections,
  monthlyCollections: state.kpi.monthlyCollections,
  consultantCollections: state.kpi.consultantCollections,
  rankingByOutlet: state.kpi.rankingByOutlet,
  salesRankingByConsultant: state.kpi.salesRankingByConsultant,
  serviceRankingByConsultant: state.kpi.serviceRankingByConsultant,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getDailyCollections,
      getMonthlyCollections,
      getConsultantCollections,
      getCommonApi,
      getRankingByOutlet,
      getSalesRankingByConsultant,
      getServiceRankingByOutlet,
    },
    dispatch
  );
};

export const KPIDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(KPIDashboardClass);
