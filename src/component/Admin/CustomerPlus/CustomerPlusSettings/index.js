import React from "react";
import { NormalButton } from "component/common";
import {
  getCustomerPlusSettings,
  updateCustomerPlusSettings,
} from "redux/actions/customerPlus";
import { InputSearch, TableWrapper } from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";

export class SettingsClass extends React.Component {
  state = {
    dataList: [],
    originalData: [],
    tableHeader: [
      { label: "Field Name", sortKey: "field" },
      { label: "Mandatory", sortKey: "mandatory" },
      { label: "Show in Register", sortKey: "register" },
      { label: "Show in Profile", sortKey: "profile" },
      { label: "Show in Listing", sortKey: "listing" },
    ],
    isLoading: true,
    isMounted: true,
  };

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  updateState = (data) => {
    if (this.state.isMounted) this.setState(data);
  };

  componentDidMount() {
    this.loadData();
  }

  handleSearch = (event) => {
    let { originalData, dataList } = this.state;
    dataList = originalData.filter(
      (e) =>
        e.display_field_name.includes(event.target.value) ||
        e.field_name.includes(event.target.value)
    );
    this.updateState({ dataList });
  };

  loadData = async () => {
    this.updateState({ isLoading: true });
    await this.props.getCustomerPlusSettings();
    let { dataList } = this.props;
    this.updateState({ dataList, originalData: dataList, isLoading: false });
  };

  handleSubmit = async () => {
    this.updateState({ isLoading: true });
    let { dataList } = this.state;
    if (dataList.length == 0) return;
    let reqData = { customerControlList: dataList };
    await this.props.updateCustomerPlusSettings(JSON.stringify(reqData));
    this.loadData();
  };

  render() {
    let { dataList, tableHeader, isLoading } = this.state;
    let { t } = this.props;
    return (
      <div className="container-fluid">
        <div className="col-md-12 mb-4 p-0">
          <h3 className="head-label">{t("Customer Plus Settings")}</h3>
        </div>
        <div className="row align-items-center mb-4">
          <div className="col">
            <div className="d-flex">
              <div className="w-100 mr-5">
                <InputSearch
                  className=""
                  placeholder="Search Field"
                  onChange={this.handleSearch}
                />
              </div>

              <div className="w-100 col-4 p-0">
                <NormalButton
                  mainbg={true}
                  className="col-12 fs-15 float-right"
                  label="Save"
                  onClick={this.handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <div className="table-container">
            <TableWrapper
              headerDetails={tableHeader}
              queryHandler={this.handlePagination}
              parentHeaderChange={(value) =>
                this.updateState(() => (tableHeader = value))
              }
            >
              {isLoading ? (
                <tr>
                  <td colSpan="7">
                    <div class="d-flex mt-5 align-items-center justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : dataList ? (
                dataList.map((item, index) => {
                  let {
                    display_field_name,
                    visible_in_profile,
                    visible_in_listing,
                    mandatory,
                    visible_in_registration,
                  } = item;
                  console.log(tableHeader[0]);
                  return (
                    <tr key={index}>
                      <td
                        className={
                          tableHeader[0].enabled ?? true ? "" : "d-none"
                        }
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          {display_field_name}
                        </div>
                      </td>
                      <td
                        className={
                          tableHeader[3].enabled ?? true ? "" : "d-none"
                        }
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <input
                            type="checkbox"
                            checked={mandatory}
                            onClick={() => {
                              dataList[index].mandatory = !mandatory;
                              this.updateState({ dataList });
                            }}
                          />
                        </div>
                      </td>
                      <td
                        className={
                          tableHeader[3].enabled ?? true ? "" : "d-none"
                        }
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <input
                            type="checkbox"
                            checked={visible_in_registration}
                            onClick={() => {
                              dataList[index].visible_in_registration =
                                !visible_in_registration;
                              this.updateState({ dataList });
                            }}
                          />
                        </div>
                      </td>
                      <td
                        className={
                          tableHeader[3].enabled ?? true ? "" : "d-none"
                        }
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <input
                            type="checkbox"
                            checked={visible_in_profile}
                            onClick={() => {
                              dataList[index].visible_in_profile =
                                !visible_in_profile;
                              this.updateState({ dataList });
                            }}
                          />
                        </div>
                      </td>
                      <td
                        className={
                          tableHeader[3].enabled ?? true ? "" : "d-none"
                        }
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <input
                            type="checkbox"
                            checked={visible_in_listing}
                            onClick={() => {
                              dataList[index].visible_in_listing =
                                !visible_in_listing;
                              this.updateState({ dataList });
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                ""
              )}
            </TableWrapper>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataList: state.customerPlus.customerPlusSettings,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCustomerPlusSettings,
      updateCustomerPlusSettings,
    },
    dispatch
  );
};

export const Settings = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(SettingsClass)
);
