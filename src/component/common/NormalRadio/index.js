import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";

export class NormalRadio extends Component {
  render() {
    let {
      className = "form-control",
      label = "",
      onChange,
      value = "",
      name,
      selected,
      disabled = false,
      type = "text",
      iconname = "",
      onClick,
    } = this.props;

    return (
      <>
        {/* {iconname !== "" ? (
          <span className={`${iconname} input-icon`}></span>
        ) : (
            ""
          )} */}
        <FormGroup className={className} check={selected}>
          <Label check={selected}>
            <Input
              checked={selected}
              onChange={(e) => {
                let data = e.target.value;
                onChange(data);
              }}
              value={value}
              type="radio"
              name={name}
            />{" "}
            {label}
          </Label>
        </FormGroup>
      </>
    );
  }
}
