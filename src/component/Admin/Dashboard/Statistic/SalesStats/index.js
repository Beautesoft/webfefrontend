import React from "react";
import { QuickStats } from "../index";
import { Statistics } from "./Statistics";
import { IncomeStats } from "./IncomeStats";
import { SalesByCategory, SalesByProduct, SalesBySalon } from "./SalesReport";
import "./style.scss";
import { withTranslation } from "react-i18next";

class SalesStatsClass extends React.Component {
  render() {
    let { t } = this.props;
    return (
      <div className="sales-stats">
        <QuickStats />
        <Statistics />
        <div>
          <h3 className="team-label my-4">
            {t("Service and Product Income Stats")}
          </h3>
          <IncomeStats />
        </div>
        <div className="row">
          <div className="col-4">
            <SalesByCategory />
          </div>
          <div className="col-4">
            <SalesByProduct />
          </div>
          <div className="col-4">
            <SalesBySalon />
          </div>
        </div>
      </div>
    );
  }
}

export const SalesStats = withTranslation()(SalesStatsClass);
