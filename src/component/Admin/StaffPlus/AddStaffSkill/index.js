import React from "react";
import { Link } from "react-router-dom";
import { getJobtitle } from "redux/actions/common";
import { getStaffPlus } from "redux/actions/staffPlus";
import {
  NormalSelect,
  NormalButton,
  NormalMultiSelect,
} from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AddStaffSkillClass extends React.Component {
  state = {
    staffOptions: [],
    selectedStaff: "",
    staffData: {
      skills: [
        { id: "0", value: "Foot Massage" },
        { id: "1", value: "Body Massage" },
      ],
    },
    jobOptions: [],
    selectedJobOption: "",
    skillList: [],
    selectedSkills: [],
    isLoading: true,
  };
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    await this.props.getJobtitle();
    let { jobtitleList } = this.props;
    let { jobOptions } = this.state;
    for (let key of jobtitleList) {
      jobOptions.push({ value: key.id, label: key.level_desc });
    }
    this.setState({ jobOptions });
  };
  getStaff = async () => {
    let { selectedJobOption, staffOptions } = this.state;
    await this.props.getStaffPlus(`?limit=100&EMP_TYPEid=${selectedJobOption}`);
    let { staffDetails } = this.props;
    for (let key of staffDetails.dataList) {
      staffOptions.push({ value: key.id, label: key.display_name });
    }
    this.setState({ staffOptions });
  };
  getStaffDetails = async () => {};
  handleJobChange = (e) => {
    if (e.target.value == this.state.selectedJobOption) return;
    this.state.selectedJobOption = e.target.value;
    this.setState({
      isLoading: true,
      selectedStaff: "",
      staffOptions: [],
    });
    this.getStaff();
  };
  handleStaffChange = (e) =>{
    if (e.target.value == this.state.selectedStaff) return;
    this.state.selectedStaff = e.target.value;
    this.setState({
      isLoading: true,
    });
    this.getStaffDetails();
  }
  render() {
    let { isLoading, jobOptions, selectedJobOption, staffOptions, selectedStaff } = this.state;
    return (
      <div className="container-fuild">
        <div className="head-label-nav">
          <p className="category">StaffPlus</p>
          <i className="icon-right mx-md-3"></i>
          <p className="sub-category">Staff Skill</p>
          <i className="icon-right mx-md-3"></i>
          <p className="sub-category">Add/Edit Skill</p>
        </div>
        <div className="container-lg mt-5">
          <div className="row align-items-center">
            <div className="col-md-12 mb-4">
              <h3>Add/Edit Skill</h3>
            </div>
          </div>
          <div className="form-group pb-2 mb-4">
            <div className="row">
              <div className="col-md-12 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Select Employee Type
                </label>
                <NormalSelect
                  options={jobOptions}
                  value={selectedJobOption}
                  onChange={this.handleJobChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group pb-2 mb-4">
            <div className="row">
              <div className="col-md-12 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Select Staff
                </label>
                <NormalSelect 
                options={staffOptions}
                value={selectedStaff}
                onChange={this.handleStaffChange}
                />
              </div>
            </div>
          </div>
          {isLoading ? null : (
            <>
              <div className="form-group pb-2 mb-4">
                <div className="row">
                  <div className="col-md-8 ">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      Add Skills
                    </label>
                    <NormalMultiSelect />
                  </div>
                  <div className="col-md-4 mb-4 pt-5">
                    <NormalButton mainbg={true} label="Add Selected Skills" />
                  </div>
                </div>
              </div>

              <div className="form-group pb-2 mb-4">
                <div className="row">
                  <div className="col-md-8 ">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      Skills Assigned
                    </label>
                    {this.state.staffData.skills.map((item, index) => (
                      <div className="col-12">
                        <label className="text-left text-black common-label-text fs-17 pb-3">
                          {index + 1}. {item.value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group mb-4 pb-2">
                <div className="pt-5 d-flex justify-content-center">
                  <div className="col-2">
                    <Link to="/admin/customerplus/lpmanagement">
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
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  jobtitleList: state.common.jobtitleList,
  staffDetails: state.staffPlus.staffPlusDetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getJobtitle,
      getStaffPlus,
    },
    dispatch
  );
};

export const AddStaffSkill = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStaffSkillClass);
