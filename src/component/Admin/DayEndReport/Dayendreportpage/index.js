import React from "react";
import { Toast } from "service/toast";
import "../style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCommonApi } from "redux/actions/common";
import { NormalButton, NormalDate, TableWrapper } from "component/common";
import { dateFormat } from "service/helperFunctions";
import { withTranslation } from "react-i18next";

export class DayendreportpageClass extends React.Component {
  state = {
    salesCollectionHeader: [
      { label: "Sales Collection" },
      { label: "Before Tax" },
      { label: "Amount" },
      { label: "Qty" },
    ],
    nonSalesCollectionHeader: [
      { label: "Non Sales Collection" },
      { label: "Amount" },
      { label: "Qty" },
    ],
    deptSalesHeader: [{ label: "Dept Sales" }, { label: "Amount" }],
    salesTransactionHeader: [
      { label: "Sales Transaction" },
      { label: "Amount" },
      { label: "Paid" },
      { label: "Outstanding" },
    ],
    ARTransactionHeader: [{ label: "AR Transaction" }, { label: "Amount" }],
    TreatmentDoneHeader: [
      { label: "Treatment Done" },
      { label: "Description" },
      { label: "Amount" },
    ],
    DayDate: new Date(),
    runDayEnd: false,
    reportDate: "",
    sales_collec: null,
    sales_trasac: null,
    ar_trasac: null,
    treatment_done: null,
    dept_sales: null,
  };

  componentDidMount = () => {
    this.setState({
      reportDate: this.state.DayDate,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  dayRunClick = async () => {
    await this.setState({
      runDayEnd: true,
      reportDate: this.state.DayDate,
    });
    this.runDayEndClick();
  };
  runDayEndClick = () => {
    this.props
      .getCommonApi(
        `dayendlist/?date=${dateFormat(
          this.state.reportDate,
          "yyyy-mm-dd"
        )}&type=list`
      )
      .then(async (key) => {
        let {
          status,
          sales_collec,
          nonsales_collec,
          sales_trasac,
          ar_trasac,
          treatment_done,
          dept_sales,
        } = key;
        console.log(key, "listdayendresponse");
        if (status === 200) {
          await this.setState({
            sales_collec,
            nonsales_collec,
            sales_trasac,
            ar_trasac,
            treatment_done,
            dept_sales,
          });
        }
      });
  };

  dayEndPrintClick = () => {
    this.props
      .getCommonApi(
        `dayendlist/?date=${dateFormat(
          this.state.reportDate,
          "yyyy-mm-dd"
        )}&type=pdf`
      )
      .then((key) => {
        let { status, data } = key;
        if (status === 200) {
          window.open(data);
        }
      });
  };
  dayEndEmailRunClick = () => {
    this.props
      .getCommonApi(
        `dayendlist/?date=${dateFormat(
          this.state.reportDate,
          "yyyy-mm-dd"
        )}&type=email`
      )
      .then((key) => {
        if (key.status === 200) {
          Toast({ type: "success", message: key.message });
        } else {
          Toast({ type: "error", message: key.message });
        }
      });
  };

  render() {
    let {
      salesCollectionHeader,
      nonSalesCollectionHeader,
      deptSalesHeader,
      salesTransactionHeader,
      ARTransactionHeader,
      TreatmentDoneHeader,
      runDayEnd,
      DayDate,
      reportDate,

      sales_collec,
      nonsales_collec,
      sales_trasac,
      ar_trasac,
      treatment_done,
      dept_sales,
    } = this.state;

    let { t } = this.props;

    return (
      <div className="dayendreportpage">
        <div className="row mb-3">
          <div className="col-sm-1 text-right">{t("Date")}</div>
          <div className="col-sm-2">
            <NormalDate
              value={new Date(DayDate)}
              name="DayDate"
              type="date"
              onChange={this.handleChange}
              //minDate={new Date()}
              showDisabledMonthNavigation
            />
          </div>
          <NormalButton
            className="fs-15 col-12 ml-2 float-right"
            label="Run Day End Report"
            mainbg={true}
            onClick={this.dayRunClick}
          />
        </div>

        {runDayEnd ? (
          <div className="col-12 mt-4">
            <div className="w-100">
              <div className="d-flex justify-content-center align-items-center fw-500 h5 mb-2 day-end-title">
                {t("Day End Report for")}&nbsp;
                {reportDate !== "" ? dateFormat(reportDate, "dd-mm-yyyy") : ""}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-7">
                <TableWrapper
                  className="table table-responsive mb-3"
                  headerDetails={salesCollectionHeader}
                >
                  {sales_collec && sales_collec.sales.length > 0 ? (
                    sales_collec.sales.map((item, index) => {
                      let { desc, amount, qty, before_tax } = item;
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {desc}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-end">
                              {before_tax}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-end">
                              {amount}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {qty}
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
                  {sales_collec && sales_collec.sales.length > 0 ? (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center justify-content-end fw-500">
                          {`Total`}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end">
                          {sales_collec.total_tax}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end">
                          {sales_collec.total}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center">
                          {sales_collec.qty}
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </TableWrapper>

                <TableWrapper
                  className="mb-3"
                  headerDetails={nonSalesCollectionHeader}
                >
                  {nonsales_collec && nonsales_collec.nonsales.length > 0 ? (
                    nonsales_collec.nonsales.map((item, index) => {
                      let { desc, qty, amount } = item;
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {desc}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-end">
                              {amount}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {qty}
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
                  {nonsales_collec && nonsales_collec.nonsales.length > 0 ? (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center justify-content-end fw-500">
                          {t("Total")}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end">
                          {nonsales_collec.total}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center">
                          {nonsales_collec.qty}
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </TableWrapper>
              </div>

              <div className="col-sm-5">
                <TableWrapper className="mb-3" headerDetails={deptSalesHeader}>
                  {dept_sales && dept_sales.dept_sales.length > 0 ? (
                    dept_sales.dept_sales.map((item, index) => {
                      let { dept_sales, amount } = item;
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {dept_sales}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-end">
                              {amount}
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
                  {dept_sales && dept_sales.dept_sales.length > 0 ? (
                    <tr className="day-end-footer fw-500">
                      <td>
                        <div className="d-flex align-items-center justify-content-end">
                          {t("Total")}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end">
                          {dept_sales.total_amount}
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </TableWrapper>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-sm-7 col-12">
                <TableWrapper headerDetails={salesTransactionHeader}>
                  {sales_trasac && sales_trasac.sales_trasac.length > 0 ? (
                    sales_trasac.sales_trasac.map((item, index) => {
                      let { satransac_ref, amount, paid, outstanding } = item;
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {satransac_ref}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-end">
                              {amount}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-end">
                              {paid}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-end">
                              {outstanding}
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
                  {sales_trasac && sales_trasac.sales_trasac.length > 0 ? (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center justify-content-end fw-500">
                          {t("Total")}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end">
                          {sales_trasac.total_amount}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end">
                          {sales_trasac.total_paid}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end">
                          {sales_trasac.total_outstanding}
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </TableWrapper>
              </div>
              <div className="col-sm-5 col-12">
                <TableWrapper headerDetails={ARTransactionHeader}>
                  {ar_trasac && ar_trasac.ar_trasac.length > 0 ? (
                    ar_trasac.ar_trasac.map((item, index) => {
                      let { satransac_ref, amount } = item;
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {satransac_ref}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-end">
                              {amount}
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
                  {ar_trasac && ar_trasac.ar_trasac.length > 0 ? (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center justify-content-end fw-500">
                          {t("Total")}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end">
                          {ar_trasac.total_amount}
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </TableWrapper>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <TableWrapper headerDetails={TreatmentDoneHeader}>
                  {treatment_done &&
                  treatment_done.treatment_done.length > 0 ? (
                    treatment_done.treatment_done.map((item, index) => {
                      let { treatment_done, desc, amount } = item;
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {treatment_done}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {desc}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-end">
                              {amount}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center justify-content-center w-100">
                          {t("No data available")}
                        </div>
                      </td>
                    </tr>
                  )}
                  {treatment_done &&
                  treatment_done.treatment_done.length > 0 ? (
                    <tr>
                      <td></td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end fw-500">
                          {t("Total")}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end">
                          {treatment_done.total_amount}
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </TableWrapper>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <NormalButton
                success={true}
                className="col-12"
                label="Download As Pdf"
                onClick={this.dayEndPrintClick}
              />
              <NormalButton
                onClick={this.dayEndEmailRunClick}
                label="Send As Email"
                success={true}
                className="ml-2 col-12"
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCommonApi,
    },
    dispatch
  );
};

export const Dayendreportpage = withTranslation()(
  connect(null, mapDispatchToProps)(DayendreportpageClass)
);
