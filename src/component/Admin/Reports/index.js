import { Accordion } from "devextreme-react";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./style.scss";

class ReportsClass extends Component {
  accordionData = [
    {
      title: "Account",
      items: [
        {
          icon: require("assets/images/reports/liability.png"),
          title: "Unearned Revenue Report",
          url: "/admin/reports/urr",
        },
      ],
    },
    {
      title: "Sales Report",
      items: [
        {
          icon: require("assets/images/reports/product-sales.png"),
          title: "Product Sales",
          url: "/admin/reports/ps",
        },
        {
          icon: require("assets/images/reports/daily-collection.png"),
          title: "Daily Collection",
          url: "/admin/reports/dc",
        },
        {
          icon: require("assets/images/reports/sales-department.png"),
          title: "Sales By Department",
          url: "/admin/reports/sbd",
        },
        {
          icon: require("assets/images/reports/liability.png"),
          title: "Sales Collections(Retail Products and Services)",
          url: "/admin/reports/sc",
        },
        {
          icon: require("assets/images/reports/liability.png"),
          title: "Daily Invoice Report",
          url: "/admin/reports/dir",
        },
        {
          icon: require("assets/images/reports/liability.png"),
          title: "Special Transaction Type",
          url: "/admin/reports/stt",
        },
      ],
    },
    {
      title: "Inventory Report",
      items: [
        {
          icon: require("assets/images/reports/stock-movement-summary.png"),
          title: "Stock Movement - Summary",
          url: "/admin/reports/sms",
        },
        {
          icon: require("assets/images/reports/stock-movement-details.png"),
          title: "Stock Movement - Detail",
          url: "/admin/reports/smd",
        },
        {
          icon: require("assets/images/reports/stock-balance.png"),
          title: "Stock Balance",
          url: "/admin/reports/sb",
        },
      ],
    },
    {
      title: "HR Report",
      items: [
        {
          icon: require("assets/images/reports/liability.png"),
          title: "Staff Performance",
          url: "/admin/reports/sp",
        },
        {
          icon: require("assets/images/reports/treatment-done.png"),
          title: "Treament Done",
          url: "/admin/reports/td",
        },
        {
          icon: require("assets/images/reports/liability.png"),
          title: "Birthday Report",
          url: "/admin/reports/br",
        },
      ],
    },
    {
      title: "CRM Report",
      items: [
        {
          icon: require("assets/images/reports/liability.png"),
          title: "Customer New Join",
          url: "/admin/reports/cnj",
        },
        {
          icon: require("assets/images/reports/liability.png"),
          title: "Customer Last Visit",
          url: "/admin/reports/clv",
        },
      ],
    },
  ];

  render() {
    let { t } = this.props;
    function renderItem(itemData) {
      return (
        <div className="row">
          {itemData.items.map((e) => {
            return (
              <div className="col-md-4 col-lg-3 mb-2">
                <div class="card mb-2">
                  <div class="card-header">
                    <div className="d-flex align-items-center">
                      <img
                        style={{
                          height: "60px",
                          backgroundColor: "white",
                          padding: "5px",
                        }}
                        src={e.icon}
                      />
                      <div>
                        <strong>{t(e.title)}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center p-2">
                    <Link className="view" to={e.url}>
                      {t("VIEW REPORT")}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div className="container-fluid report-dashboard">
        <div className="row mb-4">
          <div className="col">
            <h3>{t("Reports")}</h3>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <Accordion
              defaultSelectedItems={[
                this.accordionData[0],
                this.accordionData[1],
                this.accordionData[2],
                this.accordionData[3],
                this.accordionData[4],
              ]}
              multiple="true"
              collapsible="true"
              dataSource={this.accordionData}
              itemTitleRender={(e) => t(e.title)}
              itemRender={renderItem}
            />
          </div>
        </div>
      </div>
    );
  }
}

export const Reports = withTranslation()(ReportsClass);
