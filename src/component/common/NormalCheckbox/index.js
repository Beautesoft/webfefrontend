import React, { Component } from 'react';

export class NormalCheckbox extends Component {
  render() {
    let {
      className = 'custom-checkbox d-flex align-items-center',
      label = '',
      value = '',
      name = '',
      onChange,
      checked,
      inputClass = '',
      disabled = false,
    } = this.props;

    return (
      <label className={className}>
        <input
          disabled={disabled}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          className={inputClass}
          onChange={({ target: { name, checked: Checked } }) => {
            onChange && onChange({ target: { name, value: Checked } });
          }}
        />
        <span className="checkbox-tick d-flex justify-content-center align-items-center">
          <i className="icon-tick fs-10"></i>
        </span>
        {label ? <span className="label-txt fs-14 pl-1">{label}</span> : ''}
      </label>
    );
  }
}
