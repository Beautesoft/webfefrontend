import React, { Component } from "react";
import { NormalButton, NormalSelect } from "component/common";
import { InputSearch, TableWrapper } from "component/common";
import Brush from "../../../assets/images/make-up-brush.png";
import filter from "assets/images/filter.png";
import CartImg from "assets/images/shopping-cart.png";
import { withTranslation } from "react-i18next";
class SalonProductClass extends Component {
  state = {
    productCard: [
      {
        stock: true,
        label: "Makeup brush",
        img: Brush,
        cost: "$ 4",
        combo: true,
      },
      {
        stock: true,
        label: "Makeup brush",
        img: Brush,
        cost: "$ 4",
        combo: true,
      },
      {
        stock: true,
        label: "Makeup brush",
        img: Brush,
        cost: "$ 4",
        combo: false,
      },
      {
        stock: false,
        label: "Makeup brush",
        img: Brush,
        cost: "$ 4",
        combo: true,
      },
      {
        stock: true,
        label: "Makeup brush",
        img: Brush,
        cost: "$ 4",
        combo: true,
      },
      {
        stock: true,
        label: "Makeup brush",
        img: Brush,
        cost: "$ 4",
        combo: true,
      },
      {
        stock: true,
        label: "Makeup brush",
        img: Brush,
        cost: "$ 4",
        combo: true,
      },
      {
        stock: true,
        label: "Makeup brush",
        img: Brush,
        cost: "$ 4",
        combo: true,
      },
    ],
  };
  render() {
    let { productCard } = this.state;
    let { t } = this.props;
    return (
      <>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="">
              <InputSearch
                className=""
                placeholder="Search here.."
                onChange={this.handleChange}
              />
              {t("")}
            </div>
            <div className="d-flex align-items-center nav-icon">
              <div className="mr-3">
                <i className="icon-barcode">{t("")}</i>
                {t("")}
              </div>
              {/* <div><i className="icon-">{t("")}</i>{t("")}</div> */}
              <div className="ml-3 filter-icon">
                <img src={filter} alt="" />
                {t("")}
              </div>
              {t("")}
            </div>
            {t("")}
          </div>
          <div className="d-flex flex-wrap justify-content-between position-relative">
            {productCard &&
              productCard.map((data, index) => (
                <div
                  className={`product-card card ${
                    !data.stock ? "stock-nill" : ""
                  }`}
                  key={index}
                >
                  <div className="d-flex justify-content-between px-3">
                    <p className="label">{data.label}</p>
                    {/* <i className="icon-shopping-cart">{t("")}</i> */}
                    <div className="cart-img">
                      {" "}
                      <img src={CartImg} alt="" />
                      {t("")}
                    </div>
                    {t("")}
                  </div>
                  <p className="cost px-3">{data.cost}</p>
                  <div className="product-img px-1">
                    <img src={Brush} alt="" />

                    {data.combo ? (
                      <p className="px-2 combo">{t("Combo available")}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <NormalButton
                      className="col-12 fs-15 "
                      label="View details"
                    />
                    {t("")}
                  </div>
                  {t("")}
                </div>
              ))}
          </div>
          {t("")}
        </div>
        {t("")}
      </>
    );
  }
}

export const SalonProduct = withTranslation()(SalonProductClass);
