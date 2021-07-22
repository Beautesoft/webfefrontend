import React, { Component } from "react";
import hotel1 from "../../../../../assets/images/hotel1.png";
import hotel2 from "../../../../../assets/images/hotel2.png";
import { withTranslation } from "react-i18next";

class DetailsClass extends Component {
  render() {
    let { t } = this.props;
    return (
      <div className="product-details">
        <div className="pt-5 d-flex">
          <div className="col-3">
            <p className="product-detail-desc pb-4">{t("Brand")}</p>
            <p className="product-detail-desc pb-4">{t("Product Size")}</p>
            <p className="product-detail-desc pb-4">{t("Product Price")}</p>
            <p className="product-detail-desc pb-4">{t("Tax")}</p>
            <p className="product-detail-desc pb-4">{t("Discount")}</p>
            <p className="product-detail-desc pb-4">{t("Description")}</p>
            <p className="product-detail-desc py-2">{t("Product Images")}</p>
          </div>
          <div className="col-9">
            <p className="product-detail-text pb-4">{t("Emami")}</p>
            <p className="product-detail-text pb-4">{t("8")}</p>
            <p className="product-detail-text pb-4">$25</p>
            <p className="product-detail-text pb-4">$0.50</p>
            <p className="product-detail-text pb-4">10%</p>
            <p className="product-detail-text pb-4">
              {t(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididuntut labore et dolore magna aliqua
              consectetur adipiscing elit.`)}
            </p>
          </div>
        </div>
        <div className="d-flex product-detail-image pb-4">
          <img src={hotel1} />
          <img src={hotel2} />
          <img src={hotel1} />
        </div>
      </div>
    );
  }
}

export const Details = withTranslation()(DetailsClass);
