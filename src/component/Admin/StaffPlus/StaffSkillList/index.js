import React from "react";
import {
  NormalButton,
  NormalSelect,
  InputSearch,
  TableWrapper,
} from "component/common";
import { getCommonApi, getJobtitle } from "redux/actions/common";
import { getSkillList } from "redux/actions/staffPlus";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import "./styles.scss";

export class StaffSkillListClass extends React.Component {
  state = {
    data: [],
    header: [],
    skillList: [],
    jobOptions: [],
    selectedJobOption: "",
    skillSOptions: [],
    selectedSkillOption: "",
    isLoading: true,
  };

  componentWillMount() {
    this.getDatafromStore();
  }

  getDatafromStore = async () => {
    await this.props.getJobtitle();
    var skillListRes = await this.props.getCommonApi("SkillsItemTypeList");
    let { jobtitleList } = this.props;
    let { jobOptions, skillSOptions, selectedJobOption, selectedSkillOption } =
      this.state;
    for (let key of jobtitleList) {
      jobOptions.push({ value: key.id, label: key.level_desc });
    }
    for (let key of skillListRes.skillsTypes) {
      skillSOptions.push({ value: key.itm_id, label: key.itm_name });
    }
    selectedJobOption = jobOptions[0].value;
    selectedSkillOption = skillSOptions[0].value;
    this.setState({
      jobOptions,
      skillSOptions,
      selectedJobOption,
      selectedSkillOption,
    });

    this.loadData();
  };

  loadData = async () => {
    this.setState({ isLoading: true });
    let { data, selectedJobOption, selectedSkillOption, skillList } =
      this.state;
    if (selectedJobOption == "" || selectedSkillOption == "")
      return this.setState({ data: [], skillListRes: [], isLoading: false });
    let skillSetRes = await this.props.getCommonApi(
      `SkillsView?item_type=${selectedSkillOption}`
    );
    await this.props.getSkillList(
      `?emp_type=${selectedJobOption}&item_type=${selectedSkillOption}`
    );
    skillList = skillSetRes.data;
    data = this.props.empSkillList.data;
    let header = [{ label: "" }];
    for (let key of this.props.empSkillList.data) {
      header.push({ label: key.staffname });
    }
    this.setState({ header, skillList, data, isLoading: false });
  };

  handleChange = (e) => {
    this.state[e.target.name] = e.target.value;
    this.setState();
    this.loadData();
  };

  render() {
    let {
      data,
      header,
      jobOptions,
      selectedJobOption,
      skillSOptions,
      selectedSkillOption,
      skillList,
      isLoading,
    } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="staffList-container col-xl">
            <div className="row align-items-center">
              <div className="col-md-4">
                <h3>Staff Skill Listing</h3>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Employee Type
                </label>
                <div className="input-group">
                  <NormalSelect
                    options={jobOptions}
                    value={selectedJobOption}
                    name="selectedJobOption"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Skill Type
                </label>
                <div className="input-group">
                  <NormalSelect
                    options={skillSOptions}
                    value={selectedSkillOption}
                    name="selectedSkillOption"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-8 mb-4">
                <InputSearch
                  className=""
                  placeholder="Search Skill"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-4 col-sm-12">
                <NormalButton
                  mainbg={true}
                  className="col-12 fs-15 float-right"
                  label="Add Staff Skill"
                  onClick={() =>
                    this.props.history.push("/admin/staffplus/skills/add")
                  }
                />
              </div>
            </div>
            <div className="tab-table-content">
              <div className="py-4">
                {isLoading ? (
                  <div class="d-flex mt-5 align-items-center justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : data.length == 0 ? (
                  <div class="d-flex mt-5 align-items-center justify-content-center">
                    No Data
                  </div>
                ) : (
                  <div className="table-container">
                    <TableWrapper
                      className="tableFixHeads"
                      headerDetails={header}
                    >
                      {skillList
                        ? skillList.map(({ item_no, item_desc }) => {
                            return (
                              <tr key={item_no}>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    {item_desc}
                                  </div>
                                </td>
                                {data.map((key) => {
                                  return (
                                    <td>
                                      <div className="d-flex align-items-center justify-content-center">
                                        {key.skills.filter(
                                          (e) => e.item_no == item_no
                                        ).length > 0 ? (
                                          <div className="d-flex align-items-center justify-content-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="30"
                                              height="30"
                                              fill="currentColor"
                                              class="bi bi-check"
                                              viewBox="0 0 30 30"
                                            >
                                              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                            </svg>
                                          </div>
                                        ) : (
                                          <div className="d-flex align-items-center justify-content-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="30"
                                              height="30"
                                              fill="currentColor"
                                              class="bi bi-x"
                                              viewBox="0 0 30 30"
                                            >
                                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })
                        : ""}
                    </TableWrapper>
                  </div>
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
  jobtitleList: state.common.jobtitleList,
  empSkillList: state.staffPlus.staffPlusSkillList,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCommonApi,
      getJobtitle,
      getSkillList,
    },
    dispatch
  );
};

export const StaffSkillList = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffSkillListClass);
