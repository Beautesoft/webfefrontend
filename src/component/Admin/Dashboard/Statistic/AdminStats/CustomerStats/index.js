import React from "react";
import "./style.scss";
import BarChart from "./BarChart";
import { withTranslation } from "react-i18next";

class CustomerStatsClass extends React.Component {
  render() {
    let { t } = this.props;
    return (
      <div className="customer-stats">
        <h3 className="team-label mb-4">{t("Customer statistics")}</h3>
        <div className="card">
          <BarChart />
        </div>
      </div>
    );
  }
}

export const CustomerStats = withTranslation()(CustomerStatsClass);
