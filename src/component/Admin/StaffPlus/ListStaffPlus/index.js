import React from "react";
import { NormalButton } from "component/common";
import { InputSearch, TableWrapper } from "component/common";
import "./style.scss";
import { getJobtitle, getCommonApi } from "redux/actions/common";
import { getStaffPlus, deleteStaffPlus } from "redux/actions/staffPlus";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Navigation } from "react-minimal-side-navigation";

export class ListStaffPlusClass extends React.Component {
  state = {
    headerDetails: [
      { label: "Staff name", sortKey: true },
      { label: "Phone" },
      { label: "Staff ID", sortKey: true },
      { label: "Specialist", sortKey: true },
      { label: "Home site", sortKey: true },
      { label: "Current site", sortKey: true },
      { label: "" },
    ],
    staffList: [],
    filter: "",
    locationOption: [],
    levelList: [],
    jobOption: [],
    pageMeta: {},
    filerOption: "/",
    active: false,
    currentIndex: -1,
    is_loading: false,
  };

  componentDidMount() {
    this.queryHandler({});
  }

  componentWillMount() {
    this.props.getCommonApi("branchlist/").then((res) => {
      let { locationOption } = this.state;
      for (let key of res.data) {
        locationOption.push({
          title: key.itemsite_desc,
          itemId: "/sitelist/" + key.id,
        });
      }
      this.setState({ locationOption });
    });

    // level option api
    this.props.getCommonApi("securities/").then((res) => {
      let { levelList } = this.state;
      for (let key of res.data) {
        levelList.push({ itemId: "/emp_lvl/" + key.id, title: key.level_name });
      }
      this.setState({ levelList });
    });

    // jobtitle option api
    this.props.getJobtitle().then(() => {
      this.getDatafromStore("jobtitle");
    });
  }

  // popup open/close
  handleClick = (key) => {
    if (!this.state.active) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState((prevState) => ({
      active: !prevState.active,
      currentIndex: key,
    }));
  };

  handleFilterChange = (filterOption = "") => {
    var splitted = filterOption.split("/");
    var filter = this.state.filter;
    console.log(filterOption);
    if (splitted.length == 2) {
      switch (splitted[1]) {
        case "withSecurityAccount":
          filter = "is_login=True";
          break;
        case "withoutSecurityAccount":
          filter = "is_login=False";
          break;
        case "active":
          filter = "emp_isactive=True";
          break;
        case "inactive":
          filter = "emp_isactive=False";
          break;
      }
    } else if (splitted.length == 3) {
      switch (splitted[1]) {
        case "emp_lvl":
          filter = `LEVEL_ItmIDid=${splitted[2]}`;
          break;
        case "sitelist":
          filter = `Site_Codeid=${splitted[2]}`;
          break;
        case "operation":
          filter = `EMP_TYPEid=${splitted[2]}`;
          break;
      }
    }
    if (this.state.filter != filter) {
      this.state.filter = filter;
      this.queryHandler({});
    }
  };

  // while clicking popup close at outside click
  handleOutsideClick = (e) => {
    if (this.node != null) {
      if (this.node.contains(e.target)) {
        return;
      }
    }
    this.handleClick();
  };

  // api call for staff
  queryHandler = (data) => {
    this.setState({ is_loading: true });
    let { page = 1, limit = 10, search = "" } = data;
    this.props
      .getStaffPlus(
        `?page=${page}&limit=${limit}${
          this.state.filter == "" ? "" : `&${this.state.filter}`
        }${search == "" ? "" : `&search=${search}`}`
      )
      .then((res) => {
        // this.props.getStaffPlus(`?page=${page}&limit=${limit}&search=${search}`).then((res) => {
        console.log(res, "dsfdfaafg", res.data.dataList);
        let { staffList, pageMeta, filteredStaffList } = this.state;
        staffList = res.data.dataList;
        filteredStaffList = res.data.dataList;
        pageMeta = res.data.meta.pagination;
        this.setState({
          staffList,
          pageMeta,
          filteredStaffList,
          is_loading: false,
        });
      });
  };

  // pagination
  handlePagination = (page) => {
    this.queryHandler(page);
  };

  // seach change with api call
  handlesearch = (event) => {
    event.persist();

    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        let searchString = event.target.value;
        let data = { search: searchString };
        this.queryHandler(data);
      }, 500);
    }
    this.debouncedFn();
  };

  getDatafromStore = async (type) => {
    let { jobtitleList } = this.props;
    let { jobOption } = this.state;
    if (type === "jobtitle") {
      for (let key of jobtitleList) {
        jobOption.push({
          title: key.level_desc,
          itemId: "/operation/" + key.id,
        });
      }
    }
    await this.setState({
      jobOption,
    });
  };

  // delete api call for staff
  handleDeleteStaff = (id) => {
    this.props.deleteStaff(`${id}/`).then((res) => {});
  };

  render() {
    let {
      headerDetails,
      pageMeta,
      currentIndex,
      locationOption,
      levelList,
      jobOption,
      staffList,
      is_loading,
    } = this.state;
    return (
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-md-4 col-lg-2 mb-2">
            <Link to="/admin/staffplus/schedule">
              <NormalButton
                normal={true}
                className="col-12 fs-15 float-right"
                label="Schedule"
              />
            </Link>
          </div>
          <div className="col-md-4 col-lg-2 mb-2">
            <Link to="/admin/staffplus/authorization">
              <NormalButton
                normal={true}
                className="col-12 fs-15 float-right"
                label="Authorization"
              />
            </Link>
          </div>
          <div className="col-md-4 col-lg-2 mb-2">
            <Link to="/admin/staffplus/skills">
              <NormalButton
                normal={true}
                className="col-12 fs-15 float-right"
                label="Skill Listing"
              />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-3 mb-4">
            <div className="col-md-4">
              <h4>Filters</h4>
            </div>
            <Navigation
              activeItemId="/"
              onSelect={({ itemId }) => this.handleFilterChange(itemId)}
              items={[
                {
                  title: "Show All",
                  itemId: "/",
                },
                {
                  title: "Show Active",
                  itemId: "/active",
                },
                {
                  title: "Show Inctive",
                  itemId: "/inactive",
                },
                {
                  title: "By Emp Level",
                  itemId: "/emplvl",
                  subNav: levelList,
                },
                {
                  title: "With Security Account",
                  itemId: "/withSecurityAccount",
                },
                {
                  title: "Without Security Account",
                  itemId: "/withoutSecurityAccount",
                },
                {
                  title: "By Site List",
                  itemId: "/sitelist",
                  subNav: locationOption,
                },
                {
                  title: "By Operation",
                  itemId: "/operation",
                  subNav: jobOption,
                },
              ]}
            />
          </div>
          <div className="staffList-container col-xl">
            <div className="row align-items-center">
              <div className="col-md-4">
                <h3>List of Staffs</h3>
              </div>
              <div className="col-md-8">
                <div className="d-flex justify-content-between">
                  <div className="w-100 col-8">
                    <InputSearch
                      className=""
                      placeholder="Search Staff"
                      onEnter={this.handlesearch}
                    />
                  </div>
                  <div className="w-100 col-4 ml-1 p-0">
                    <NormalButton
                      mainbg={true}
                      className="col-12 fs-15 float-right"
                      label="Add Staff"
                      onClick={() =>
                        this.props.history.push("/admin/staffplus/add")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-table-content">
              <div className="py-4">
                <div className="table-container">
                  <TableWrapper
                    headerDetails={headerDetails}
                    queryHandler={this.handlePagination}
                    pageMeta={pageMeta}
                  >
                    {" "}
                    {is_loading ? (
                      <tr>
                        <td colSpan="7">
                          <div class="d-flex mt-5 align-items-center justify-content-center">
                            <div class="spinner-border" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : staffList.length > 0 ? (
                      staffList.map(
                        (
                          {
                            id,
                            emp_name,
                            emp_phone1,
                            emp_code,
                            services,
                            site_code,
                            defaultsitecode,
                            status,
                          },
                          index
                        ) => {
                          return (
                            <tr key={index}>
                              <td className="position-relative status-type">
                                <span
                                  className={`${
                                    status === "available"
                                      ? "available"
                                      : "not-available"
                                  }`}
                                ></span>
                                <div className="d-flex align-items-center justify-content-center">
                                  {emp_name}
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center justify-content-center">
                                  {emp_phone1}
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center justify-content-center">
                                  {emp_code}
                                </div>
                              </td>
                              {/* <td><div className="d-flex align-items-center justify-content-center"></div></td> */}
                              <td>
                                <div className="d-flex align-items-center justify-content-center">
                                  {services ? services[0] : ""}
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center justify-content-center">
                                  {defaultsitecode}
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center justify-content-center">
                                  {site_code}
                                </div>
                              </td>
                              <td
                                className="position-relative"
                                ref={(node) => {
                                  this.node = node;
                                }}
                                onClick={() => this.handleClick(index)}
                              >
                                {currentIndex === index ? (
                                  <>
                                    <div className="d-flex align-items-center justify-content-center horizontal-more-active">
                                      <i className="icon-more"></i>
                                    </div>
                                    <div className="option card">
                                      <div
                                        className="d-flex align-items-center fs-14 pt-3"
                                        onClick={() =>
                                          this.props.history.push(
                                            `/admin/staff/${id}/staffDetails`
                                          )
                                        }
                                      >
                                        <span className="icon-eye-grey px-3"></span>{" "}
                                        View{" "}
                                      </div>
                                      <div
                                        className="d-flex align-items-center fs-14"
                                        onClick={() =>
                                          this.props.history.push(
                                            `/admin/staffPlus/${id}/editStaff`
                                          )
                                        }
                                      >
                                        <span className="icon-edit px-3"></span>{" "}
                                        Edit{" "}
                                      </div>
                                      <div
                                        className="d-flex align-items-center fs-14 pb-3"
                                        onClick={() =>
                                          this.handleDeleteStaff(id)
                                        }
                                      >
                                        <span className="icon-delete px-3"></span>{" "}
                                        Delete{" "}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="d-flex align-items-center justify-content-center horizontal-more">
                                    <i className="icon-more text-grey"></i>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      ""
                    )}
                  </TableWrapper>
                  <div className="palette">
                    <div className="color-detail">
                      <div className="color"></div>
                      <div className="detail">Available today</div>
                    </div>
                    <div className="color-detail">
                      <div className="color not-available"></div>
                      <div className="detail">Not Available today</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  jobtitleList: state.common.jobtitleList,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getStaffPlus,
      deleteStaff: deleteStaffPlus,
      getJobtitle,
      getCommonApi,
    },
    dispatch
  );
};

export const ListStaffPlus = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListStaffPlusClass);
