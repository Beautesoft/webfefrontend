import React from 'react';
import { InputSearch } from '../../../component/common';
import PropTypes from 'prop-types';

export const SearchFilter = ({
  queryHandler,
  value = '',
  handleChange = '',
  placeHolder = 'Search',
  inputClassName = '',
  className = '',
}) => {
  const handleSearch = e => {
    let {
      target: { value },
    } = e;

    handleChange && handleChange(e);

    queryHandler && queryHandler({ search: value, page: 1 });
  };

  return (
    <div className="d-flex align-items-center">
      {value ? (
        <InputSearch
          className={className}
          inputClassName={inputClassName}
          onChange={handleSearch}
          value={value}
          placeholder={placeHolder}
        />
      ) : (
          <InputSearch
            className={className}
            inputClassName={inputClassName}
            onChange={handleSearch}
            placeholder={placeHolder}
          />
        )}
    </div>
  );
};

SearchFilter.propTypes = {
  queryHandler: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
};
