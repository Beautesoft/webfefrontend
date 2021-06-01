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
import { Link } from "react-router-dom";
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

  getDatafromStore = async (type) => {
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
  };

  loadData = async () => {
    let { data, header, selectedJobOption, selectedSkillOption, skillList } =
      this.state;
  };

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

  // while clicking popup close at outside click
  handleOutsideClick = (e) => {
    if (this.node != null) {
      if (this.node.contains(e.target)) {
        return;
      }
    }
    this.handleClick();
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
                ) : (
                  <div className="table-container">
                    <TableWrapper
                      className="tableFixHeads"
                      headerDetails={header}
                    >
                      {skillList
                        ? skillList.map(({ id, label }, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    {label}
                                  </div>
                                </td>
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
  skillList: state.staffPlus.staffPlusSkillList,
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
