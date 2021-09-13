import React, { Component } from "react";
import { Pagination } from "../index";
import PropTypes from "prop-types";
import { scrollTop, appendQuery } from "service/helperFunctions";
import { withTranslation } from "react-i18next";
import "assets/scss/components/table.scss";

class TableWrapperClass extends Component {
  state = {
    currentSortKeyDetails: null,
  };

  componentDidMount() {
    let { field, orderBy } = this.props;
    if (field && orderBy) {
      this.setState({
        currentSortKeyDetails: { sortKey: field, orderBy },
      });
    }
  }

  getPlaceHolder = () => {
    let { placeHolder = "No data found" } = this.props;
    if (typeof placeHolder === "function") {
      return placeHolder();
    }

    return <p className="text-center">{placeHolder}</p>;
  };

  handlePagination = (page) => {
    let { queryHandler, scrollProps = "" } = this.props;
    queryHandler({ page: page });
    // .then(() => {
    //   scrollTop(...scrollProps);
    // })
    // .catch(err => {
    //   console.log('Error:::' + err);
    // });
  };

  handleFilter = (sortKey) => {
    let { queryAppend = true, sortData, onSort } = this.props;
    if (!sortKey) {
      return "";
    }
    let currentSortKeyDetails = Object.assign(
      {},
      this.state.currentSortKeyDetails
    );
    if (!currentSortKeyDetails || currentSortKeyDetails.sortKey !== sortKey) {
      currentSortKeyDetails = {
        sortKey,
        orderBy: "asc",
      };
    } else {
      if (currentSortKeyDetails.orderBy !== "desc") {
        currentSortKeyDetails.orderBy = "desc";
      } else {
        currentSortKeyDetails = null;
      }
    }

    let { sortKey: key = "", orderBy = "" } = currentSortKeyDetails || {};
    if (queryAppend) {
      appendQuery([
        { label: "field", value: key },
        { label: "orderBy", value: orderBy },
      ]);
    }
    this.setState(
      {
        currentSortKeyDetails,
      },
      () => !queryAppend && this.handleFilterAPI()
    );
    let sort = {
      field: sortKey,
      orderBy,
    };
    if (sortData) {
      if (currentSortKeyDetails === null) {
        if (onSort) onSort(sortData);
        return;
      }
      const compareFunction = (a, b) => {
        if (sort.orderBy === "asc") {
          return ("" + a[sort.field]).localeCompare(b[sort.field]);
        } else {
          return ("" + b[sort.field]).localeCompare(a[sort.field]);
        }
      };
      if (onSort) {
        let sortedData = [...sortData].sort(compareFunction);
        return onSort(sortedData);
      }
    }
  };

  handleFilterAPI = () => {
    let { sortKey = null, orderBy = null } =
      this.state.currentSortKeyDetails || {};
    let { queryHandler } = this.props;
    let sort = {
      field: sortKey,
      orderBy,
    };
    if (queryHandler) {
      queryHandler({ sort });
    }
  };

  render() {
    let {
      headerDetails,
      children,
      pageMeta,
      isEmpty = false,
      className = "",
      overFlow = true,
      clickFunc,
      t,
    } = this.props;
    let { sortKey: currentSortKey, orderBy = "" } =
      this.state.currentSortKeyDetails || {};

    return (
      <div className="maintable table-container">
        <div
          className={`maintable-content ${
            overFlow ? "table-responsive" : ""
          } ${className}`}
        >
          <table className="table rounded">
            <thead>
              <tr>
                {headerDetails.map(
                  (
                    {
                      label,
                      className,
                      divClass = "",
                      sortKey = "",
                      element,
                      width = "",
                      dblclickFunc,
                    },
                    index
                  ) => {
                    return (
                      <th
                        className={className}
                        key={index}
                        style={{
                          minWidth: width
                            ? width
                            : label.length * 10 + 50 + "px",
                        }}
                      >
                        <div
                          className={`d-flex align-items-center justify-content-center text-center ${
                            sortKey && "cursor-pointer"
                          } ${divClass}`}
                          onClick={(e) => this.handleFilter(sortKey)}
                          onDoubleClick={dblclickFunc}
                        >
                          {t(label)}
                          {element && element()}
                          {sortKey ? (
                            <div
                              className={`d-flex table-filter ml-2 mb-1 ${
                                currentSortKey === sortKey && "active-filter"
                              }`}
                            >
                              <span
                                className={`icon-sort-up fs-14 ${
                                  currentSortKey === sortKey &&
                                  orderBy === "asc" &&
                                  "active"
                                }`}
                              />
                              <span
                                className={`icon-sort-down fs-14 ${
                                  currentSortKey === sortKey &&
                                  orderBy === "desc" &&
                                  "active"
                                }`}
                              />
                            </div>
                          ) : null}
                        </div>
                      </th>
                    );
                  }
                )}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
          {/* {!isEmpty ? <div className="no-data">{this.getPlaceHolder()}</div> : ''} */}
        </div>
        {pageMeta && (
          <Pagination
            handlePagination={this.handlePagination}
            pageMeta={pageMeta}
          />
        )}
      </div>
    );
  }
}

TableWrapperClass.propTypes = {
  placeHolder: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  isEmpty: PropTypes.bool,
  headerDetails: PropTypes.array.isRequired,
  pageMeta: PropTypes.object,
};

export const TableWrapper = withTranslation()(TableWrapperClass);
