import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "./style.scss";

class IndividualAuthorizationTableClass extends Component {
  render() {
    let {
      onFEChange,
      onBEChange,
      disabled = false,
      FEData = [],
      BEData = [],
    } = this.props;

    const FEHandleOnChange = (index1, index2) => {
      FEData[index1].values[index2].value =
        !FEData[index1].values[index2].value;
      if (onFEChange) onFEChange(FEData);
    };
    const BEHandleOnChange = (index1, index2) => {
      BEData[index1].values[index2].value =
        !BEData[index1].values[index2].value;
      if (onBEChange) onBEChange(BEData);
    };

    let { t } = this.props;

    return (
      <div className="maintable table-container">
        <div className="maintable-content table-responsive">
          <table className="table table-bordered rounded">
            <thead>
              <tr>
                <th className="table-header-80">
                  <div className="d-flex ml-3">{t("FE Authorizaion")}</div>
                </th>
                <th>
                  <div className="d-flex align-items-center justify-content-center">
                    {t("Yes")}
                  </div>
                </th>
                <th>
                  <div className="d-flex align-items-center justify-content-center">
                    {t("No")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {FEData.map((e, index1) => (
                <>
                  <tr>
                    <td className={e.className} colspan="3">
                      {t(e.label)}
                    </td>
                  </tr>
                  {e.values.map((e, index2) => (
                    <tr>
                      <td>
                        <div className="ml-5">{t(e.label)}</div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center">
                          <input
                            className="w-100"
                            type="radio"
                            name={e.label}
                            checked={e.value}
                            onChange={() => FEHandleOnChange(index1, index2)}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center">
                          <input
                            className="w-100"
                            type="radio"
                            name={e.label}
                            checked={!e.value}
                            onChange={() => FEHandleOnChange(index1, index2)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        <div className="maintable-content table-responsive mt-5">
          <table className="table table-bordered rounded">
            <thead>
              <tr>
                <th className="table-header-80">
                  <div className="d-flex ml-3">BE Authorizaion</div>
                </th>
                <th>
                  <div className="d-flex align-items-center justify-content-center">
                    Yes
                  </div>
                </th>
                <th>
                  <div className="d-flex align-items-center justify-content-center">
                    No
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {BEData.map((e, index1) => (
                <>
                  <tr>
                    <td className={e.className} colspan="3">
                      {e.label}
                    </td>
                  </tr>
                  {e.values.map((e, index2) => (
                    <tr>
                      <td>
                        <div className="ml-5">{e.label}</div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center">
                          <input
                            className="w-100"
                            type="radio"
                            name={e.label}
                            value={true}
                            checked={e.value}
                            onChange={() => BEHandleOnChange(index1, index2)}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center">
                          <input
                            className="w-100"
                            type="radio"
                            name={e.label}
                            value={false}
                            checked={!e.value}
                            onChange={() => BEHandleOnChange(index1, index2)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export const IndividualAuthorizationTable = withTranslation()(
  IndividualAuthorizationTableClass
);
