

import React from 'react';

import Select from 'react-select';

export const NormalMultiSelect = ({options, handleMultiSelect, className, name, value=[], ismulti=true}) => (
  <div className={`position-relative w-100 multi-select ${className}`}>
    {console.log("dsfafsdfdfgdf, kuyiusdfsd", value, options)}
    <Select
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