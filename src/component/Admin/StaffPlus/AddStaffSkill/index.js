import React from "react";
import { Link } from "react-router-dom";
import {
  NormalInput,
  NormalSelect,
  NormalButton,
  NormalMultiSelect,
} from "component/common";

export class AddStaffSkill extends React.Component {
  state = {
    staffOption: [],
    selectedStaff: [],
    staffData: {
      skills: [
        { id: "0", value: "Foot Massage" },
        { id: "1", value: "Body Massage" },
      ],
    },
    skillList: [],
    selectedSkills: [],
  };
  render() {
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
                  Select Staff
                </label>
                <NormalSelect />
              </div>
            </div>
          </div>

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
        </div>
      </div>
    );
  }
}
