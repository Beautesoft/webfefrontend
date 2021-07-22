import React, { Component } from "react";
import { TableWrapper, NormalSelect } from "component/common";
import { updateForm, getCommonApi } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { TreatmentUsagePopup } from "./TreatmentUsagePopup";
import { withTranslation } from "react-i18next";

export class ListTreatmentHistoryCartClass extends Component {
  state = {
    headerDetails: [
      { label: "Trans Date" },
      { label: "Purc Date" },
      { label: "Transac #" },
      { label: "Treatment ID" },
      { label: "Link Code" },
      { label: "Treatment" },
      { label: "Status" },
      { label: "Record Status" },
      { label: "Remarks" },
      { label: "Type" },
    ],
    TreatmentHistory: [],
    treatmentList: [],
    meta: {},
    customerNumber: 0,
    yearList: [],
    selectedYear: new Date().getFullYear(),
    isTreatmentUsagePopup: false,
    TreatmentHistoryId: 0,
  };

  componentDidMount = async () => {
    await this.setState({
      customerNumber: this.props.customerNumber,
    });
    this.props.getCommonApi("treatmentdone/Year/").then((key) => {
      let { status, data } = key;
      let { yearList } = this.state;
      for (let value of data) {
        yearList.push({ value: value, label: value });
      }
      this.setState({ yearList });
    });

    this.getTreatmentHistoryList({});
  };

  getTreatmentHistoryList = (data) => {
    let { customerNumber, selectedYear, TreatmentHistory } = this.state;
    if (customerNumber > 0) {
      let { page = 1, limit = 10, search = "" } = data;
      this.props
        .getCommonApi(
          `treatmenthistory/?year=${selectedYear}&cust_id=${customerNumber}&page=${page}&limit=${limit}`
        )
        .then(async (res) => {
          await this.setState({ treatmentList: [], meta: {} });
          let { data, status } = res;
          if (status === 200) {
            if (data.dataList) {
              this.setState({
                treatmentList: data.dataList,
                meta: data.meta.pagination,
              });
            }
          }
        });
    }
  };

  handlehistoryYearChange = async ({ target: { value, name } }) => {
    let { selectedYear } = this.state;
    selectedYear = value;
    await this.setState({
      selectedYear,
    });
    this.getTreatmentHistoryList({});
  };

  handlePagination = (page) => {
    this.getTreatmentHistoryList(page);
  };

  treatmentUsagePopupclose = () => {
    this.setState((prevState) => ({
      isTreatmentUsagePopup: !prevState.isTreatmentUsagePopup,
    }));
  };
  treatmentUsagePopup = (data) => {
    if (data.status == "Done") {
      this.setState((prevState) => ({
        TreatmentHistoryId: data.id,
        isTreatmentUsagePopup: !prevState.isTreatmentUsagePopup,
      }));
    }
  };

  render() {
    let {
      headerDetails,
      treatmentList,
      meta,
      yearList,
      selectedYear,
      isTreatmentUsagePopup,
      TreatmentHistoryId,
    } = this.state;
    let { t } = this.props;
    return (
      <>
        <div className="row treatment-done-new p-3">
          <div className="col-10 header">
            <div className="d-flex select-year">
              <div className="pl-0 mb-2 name fs-16 py-2">
                {t("Select Year")}
              </div>
              <div className="input-group">
                <NormalSelect
                  // placeholder="Enter here"
                  options={yearList}
                  value={selectedYear}
                  name="selectedYear"
                  onChange={this.handlehistoryYearChange}
                  className="selected-year mb-2 py-0"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-container">
          <TableWrapper
            headerDetails={headerDetails}
            queryHandler={this.handlePagination}
            pageMeta={meta}
          >
            {treatmentList && treatmentList.length > 0 ? (
              treatmentList.map((item, index) => {
                let {
                  trasac_date,
                  purchase_date,
                  transac,
                  treatment_code,
                  link_code,
                  course,
                  status,
                  record_status,
                  remarks,
                  type,
                } = item;
                return (
                  <tr
                    key={index}
                    onClick={() => this.treatmentUsagePopup(item)}
                  >
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        {trasac_date}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        {purchase_date}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        {transac}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        {treatment_code}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        {link_code}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        {course}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        {status}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        {record_status}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        {remarks}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        {type}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    {t("No data available")}
                  </div>
                </td>
              </tr>
            )}
          </TableWrapper>
        </div>
        {isTreatmentUsagePopup ? (
          <TreatmentUsagePopup
            isTreatmentUsagePopup={isTreatmentUsagePopup}
            treatmentUsagePopup={this.treatmentUsagePopup}
            treatmentUsagePopupclose={this.treatmentUsagePopupclose}
            TreatmentHistoryId={TreatmentHistoryId}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  // filter: state.dashboard
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateForm,
      getCommonApi,
    },
    dispatch
  );
};

export const TreatmentHistoryCart = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ListTreatmentHistoryCartClass)
);
