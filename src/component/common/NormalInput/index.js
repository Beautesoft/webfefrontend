import React, { Component } from "react";

export class NormalInput extends Component {
  render() {
    let {
      className = "form-control",
      placeholder = "",
      onChange,
      value = "",
      name,
      disabled = false,
      type = "text",
      iconname = "",
      onClick,
      onFocus = ()=>{}
    } = this.props;

    return (
      <>
        {iconname !== "" ? (
          <span className={`${iconname} input-icon`}></span>
        ) : (
            ""
          )}
        <input
          className={`${className} ${iconname !== "" ? "pl-5" : ""}`}
          name={name}
          type={type}
          disabled={disabled}
          value={value == null ? "" : value}
          min={0}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={onFocus}
          onClick={onClick ? onClick:()=>{}}
          onChange={e => {
            console.log(e)
            let body = {};

            body = {
              target: {
                name: e.target.name,
                value: e.target.value
              }
            };

            onChange(body);
          }}
        />
      </>
    );
  }
}
