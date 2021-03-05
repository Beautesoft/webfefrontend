import React, { Component } from "react";
import { FormGroup, Label, Input } from 'reactstrap';

export class NormalRadio extends Component {
  render() {
    let {
      className = "form-control",
      label = "",
      onChange,
      value = "",
      name,
      disabled = false,
      type = "text",
      iconname = "",
      onClick
    } = this.props;

    return (
      <>
        {/* {iconname !== "" ? (
          <span className={`${iconname} input-icon`}></span>
        ) : (
            ""
          )} */}
        <FormGroup className={className} check={value}>
          <Label check={value}>
            <Input type="radio" name={name} />{' '}
           {label}
          </Label>
        </FormGroup>
      </>
    );
  }
}
