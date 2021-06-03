import React, { Component } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCustomerPlusSettings,
  updateCustomerPlus,
  CreateCustomerPlus,
  getCustomerPlus,
} from "redux/actions/customerPlus";
import {
  NormalInput,
  NormalDate,
  NormalDateTime,
  NormalSelect,
  NormalMultiSelect,
  NormalButton,
} from "component/common";

export class AddCustomerPlusClass extends Component {
  state = {
    formFields: {},
    fields: [
      {
        id: 1,
        field_name: "cust_dob",
        display_field_name: "Customer DOB",
        visible_in_registration: true,
        visible_in_listing: true,
        visible_in_profile: true,
        mandatory: true,
        data_type: "Dat",
        selection: null,
      },
    ],
    isLoading: true,
  };

  componentWillMount() {
    this.validator = new SimpleReactValidator({
      validators: {},
      element: (message) => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
    });
    this.loadData();
  }

  loadData = async () => {
    await this.props.getCustomerPlusSettings("details");
    this.state.fields = this.props.customerPlusSettings.filter(
      (e) => e.visible_in_registration
    );
    this.state.formFields = this.state.fields.reduce((map, obj) => {
      map[obj.field_name] = "";
      return map;
    }, {});
    if (this.props.match.params.id) {
      await this.props.getCustomerPlus(this.props.match.params.id);
      this.state.formFields = this.props.customerPlusDetail;
    }
    this.setState({ isLoading: false });
  };

  handleSubmit = async (type) => {
    if (!this.validator.allValid()) return this.validator.showMessages();
    this.setState({ isLoading: true });
    console.log(this.state.formFields);
    try {
      this.state.fields
        .filter((e) => e.data_type == "date" || e.data_type == "datetime")
        .forEach((e) => {
          if (this.state.formFields[e.field_name]) {
            let date = new Date(this.state.formFields[e.field_name]);
            let d = date.getDate();
            let day = d < 10 ? "0" + d : d;
            let a = date.getMonth() + 1;
            let month = a < 10 ? "0" + a : a;
            let year = date.getFullYear();
            this.state.formFields[e.field_name] = `${year}-${month}-${day}`;
          }
        });
      if (this.props.match.params.id) {
        await this.props.updateCustomerPlus(
          this.props.match.params.id + "/",
          JSON.stringify(this.state.formFields)
        );
        if (type === "catalog") {
          this.props.history.push(`/admin/cart`);
        } else
          this.props.history.push(
            `/admin/customer/${this.props.match.params.id}/details`
          );
      } else {
        await this.props.CreateCustomerPlus(
          JSON.stringify(this.state.formFields)
        );
        if (type === "catalog") {
          this.props.history.push(`/admin/cart`);
        } else this.props.history.push(`/admin/customerPlus`);
      }
    } catch (e) {}
    this.setState({ isLoading: false });
  };

  handleCancel = () => {
    if (this.props.match.params.id) {
      this.props.history.push(
        `/admin/customerplus/${this.props.match.params.id}/details`
      );
    } else {
      this.props.history.push(`/admin/customerplus`);
    }
  };

  handleChange = ({ target: { value, name } }) => {
    let formFields = Object.assign({}, this.state.formFields);

    formFields[name] = value;

    this.setState({
      formFields,
    });
  };

  handleMultiSelect = (field, e) => {
    let formFields = Object.assign({}, this.state.formFields);

    formFields[field] = e;

    this.setState({
      formFields,
    });
  };

  handleChangeBox = (event) => {
    let formFields = Object.assign({}, this.state.formFields);

    formFields[event.target.name] = event.target.checked;

    this.setState({
      formFields,
    });
  };

  handleDatePick = async (name, value) => {
    let { formFields } = this.state;
    formFields[name] = value;
    await this.setState({
      formFields,
    });
  };

  renderFields = () => {
    return this.state.fields.map((e) => (
      <div className="pb-md-4">
        <label className="text-left text-black common-label-text fs-17 pb-2">
          {e.display_field_name}
        </label>
        <div className="input-group py-3">
          {e.data_type == "text" ? (
            <NormalInput
              placeholder="Enter here"
              value={this.state.formFields[e.field_name]}
              name={e.field_name}
              onChange={this.handleChange}
            />
          ) : e.data_type == "date" ? (
            <NormalDate
              onChange={this.handleDatePick}
              value={
                this.state.formFields[e.field_name]
                  ? new Date(this.state.formFields[e.field_name])
                  : new Date()
              }
              name={e.field_name}
              showYearDropdown={true}
            />
          ) : e.data_type == "datetime" ? (
            <NormalDateTime
              onChange={this.handleDatePick}
              value={
                this.state.formFields[e.field_name]
                  ? new Date(this.state.formFields[e.field_name])
                  : new Date()
              }
              name={e.field_name}
              showYearDropdown={true}
            />
          ) : e.data_type == "selection" ? (
            <NormalSelect
              options={e.selection}
              value={this.state.formFields[e.field_name]}
              name={e.field_name}
              onChange={this.handleChange}
            />
          ) : e.data_type == "multiSelect" ? (
            <NormalMultiSelect
              options={e.selection}
              defaultValue={this.state.formFields[e.field_name]}
              name={e.field_name}
              handleMultiSelect={(e) => this.handleMultiSelect(e.field_name, e)}
            />
          ) : e.data_type == "boolean" ? (
            <input
              type="checkbox"
              checked={this.state.formFields[e.field_name]}
              name={e.field_name}
              onClick={this.handleChangeBox}
            />
          ) : e.data_type == "number" ? (
            <NormalInput
              type="number"
              placeholder="Enter here"
              value={this.state.formFields[e.field_name]}
              name={e.field_name}
              onChange={this.handleChange}
            />
          ) : (
            "NO FILED RENDER DATA FOUND"
          )}
        </div>
        {e.mandatory
          ? this.validator.message(
              e.display_field_name,
              e.field_name,
              "required"
            )
          : null}
      </div>
    ));
  };

  render() {
    let { isLoading } = this.state;
    return (
      <div className="create-customer-section container">
        {/* <p className="list-heading pb-4"> {id ? "Edit" : "Add"} Customer</p> */}
        <div className="create-customer">
          <div className="head-label-nav">
            <p className="category">Customer Plus</p>
            <i className="icon-right mx-md-3"></i>
            <p className="sub-category">
              {this.props.match.params.id ? "Edit" : "Add"} New Customer
            </p>
          </div>
          <div className="customer-detail">
            {isLoading ? (
              <div class="d-flex mt-5 align-items-center justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="form-group mb-4 pb-2">
                  {this.renderFields()}
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-4 col-sm-12 mb-4">
                    <NormalButton
                      onClick={this.handleCancel}
                      label="CANCEL"
                      danger={true}
                      className="mr-2 col-12"
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-4">
                    <NormalButton
                      onClick={() => this.handleSubmit()}
                      label="SAVE"
                      success={true}
                      className="mr-2 col-12"
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-4">
                    <NormalButton
                      onClick={() => this.handleSubmit("catalog")}
                      label="SAVE & CATALOG"
                      success={true}
                      className="mr-2 col-12"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customerPlusDetail: state.customerPlus.customerPlusDetail,
  customerPlusSettings: state.customerPlus.customerPlusSettings,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCustomerPlusSettings,
      updateCustomerPlus,
      CreateCustomerPlus,
      getCustomerPlus,
    },
    dispatch
  );
};

export const AddCustomerPlus = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomerPlusClass);
