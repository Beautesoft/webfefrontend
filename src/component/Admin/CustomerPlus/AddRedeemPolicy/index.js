import React from "react";
import { Link } from "react-router-dom";
import {
  NormalInput,
  NormalSelect,
  NormalButton,
} from "component/common";

export class AddRedeemPolicy extends React.Component {
  state = {};
  render() {
    return (
      <div className="container-fuild">
        <div className="head-label-nav">
          <p className="category">CustomerPlus</p>
          <i className="icon-right mx-md-3"></i>
          <p className="sub-category">Loyalty Points Management</p>
          <i className="icon-right mx-md-3"></i>
          <p className="sub-category">
            {this.props.match.params.id ? "Edit" : "New"} Redeem Policy
          </p>
        </div>
        <div className="container-lg mt-5">
          <div className="row align-items-center">
            <div className="col-md-12 mb-4">
              <h3>
                {this.props.match.params.id ? "Edit" : "New"} Redeem Policy
              </h3>
            </div>
          </div>
          <div className="form-group pb-2 mb-4">
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Code
                </label>
                <NormalInput />
              </div>{" "}
              <div className="col-md-6 ">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Currency Value
                </label>
                <NormalInput />
              </div>
            </div>
          </div>

          <div className="form-group pb-2 mb-4">
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Custoemr Class
                </label>
                <NormalSelect />
              </div>
              <div className="col-md-6 ">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Point Value
                </label>
                <NormalInput />
              </div>
            </div>
          </div>

          <div className="form-group mb-4 pb-2">
            <div className="row">
              <div className="col-md-6">
                <input type="checkbox" name="active" />
                <label
                  for="name"
                  className="text-left text-black common-label-text fs-17 pb-3 ml-2"
                >
                  Is Currently Active
                </label>
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
