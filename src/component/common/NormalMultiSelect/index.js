import React from "react";
import MenuPortal from "./model"
import Select from "react-select";

export const NormalMultiSelect = ({
  options,
  handleMultiSelect,
  className,
  name,
  value = [],
  ismulti = true,
  target,
}) => (
  <div className={`position-relative w-100 multi-select ${className}`}>
    {console.log("dsfafsdfdfgdf, kuyiusdfsd", value, options)}
    <Select
      menuPortalTarget={target}
      components={{ MenuPortal }}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      defaultValue={value}
      isMulti={ismulti}
      name={`${name}`}
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleMultiSelect}
    />
  </div>
);
