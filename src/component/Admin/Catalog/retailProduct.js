import React, { Component } from "react";
import { NormalButton, NormalSelect } from "component/common";
import { InputSearch, TableWrapper } from "component/common";
import Brush from "../../../assets/images/make-up-brush.png";
import filter from "assets/images/filter.png";
import CartImg from "assets/images/shopping-cart.png";
import { withTranslation } from "react-i18next";
class RetailProductClass extends Component {
  render() {
    let { t } = this.props;
    return (
      <>
        <div className="product-detail">
          <div className="row">
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-view">
                    <img src={Brush} />
                    {t("")}
                  </div>
                  <div className="thumbnail-view">
                    <img src={Brush} />
                    <img src={Brush} />
                    <img src={Brush} />
                    {t("")}
                  </div>
                  {t("")}
                </div>
                <div className="col-md-5">
                  <div className="product-left">
                    <p className="product-name">
                      {t("L'Oreal Paris Makeup Brush")}
                    </p>
                    <div className="rating">
                      <div className="star-rate">
                        <i className="icon-star-fill">{t("")}</i>
                        <i className="icon-star-fill">{t("")}</i>
                        <i className="icon-star-fill">{t("")}</i>
                        <i className="icon-star-fill">{t("")}</i>
                        <i className="icon-star-fill">{t("")}</i>
                        {t("")}
                      </div>
                      <div>
                        <p className="rate-count">{t("5 ratings")}</p>
                        {t("")}
                      </div>
                      {t("")}
                    </div>
                    <div>
                      <p className="list-price">
                        Price:<span> $10.95</span>
                        {t("")}
                      </p>
                      {t("")}
                    </div>
                    <div>
                      <p className="detail-label">{t("Select color")}</p>
                      <div className="color-palette">
                        <p
                          style={{
                            width: "31px",
                            height: "31px",
                            background: "#000",
                            borderRadius: "50%",
                          }}
                        >
                          {t("")}
                        </p>
                        <p
                          style={{
                            width: "31px",
                            height: "31px",
                            background: "#850",
                            borderRadius: "50%",
                          }}
                        >
                          {t("")}
                        </p>
                        <p
                          style={{
                            width: "31px",
                            height: "31px",
                            background: "#200",
                            borderRadius: "50%",
                          }}
                        >
                          {t("")}
                        </p>
                        <p
                          style={{
                            width: "31px",
                            height: "31px",
                            background: "#498",
                            borderRadius: "50%",
                          }}
                        >
                          {t("")}
                        </p>
                        {t("")}
                      </div>
                      {t("")}
                    </div>
                    <div>
                      <p className="detail-label">{t("Select Brush Size")}</p>
                      <div className="select-size">
                        <p>{t("2")}</p>
                        <p>{t("3")}</p>
                        <p>{t("5")}</p>
                        <p>{t("7")}</p>
                        {t("")}
                      </div>
                      {t("")}
                    </div>
                    <div>
                      <NormalButton
                        mainbg={true}
                        className="col-12 fs-15 mt-5"
                        label="Add to Cart"
                        onClick={() =>
                          this.props.history.push("/admin/appointment/create")
                        }
                      />
                      {t("")}
                    </div>
                    {t("")}
                  </div>
                  {t("")}
                </div>
                {t("")}
              </div>
              {t("")}
            </div>
            <div className="col-md-5">
              <span className="fs-18">{t("Combo available")}</span>
              <div className="row m-0">
                <div className="col-5 bg-white text-center">
                  <img src={Brush} alt="">
                    {t("")}
                  </img>
                  <p>{t("Brush")}</p>
                  <p className="text-orenge">$7.97</p>
                  {t("")}
                </div>
                <div className="col-1 p-0 pt-5 bg-white text-center">
                  <span>+</span>
                  {t("")}
                </div>
                <div className="col-5 bg-white text-center">
                  <img src={Brush} alt="">
                    {t("")}
                  </img>
                  <p>{t("Compact")}</p>
                  <p className="text-orenge">$6.97</p>
                  {t("")}
                </div>
                <div className="col-11 bg-white text-center">
                  <span>
                    {t("Combo Offr")} <span className="text-orenge"> $13</span>
                    {t("")}
                  </span>
                  {t("")}
                </div>
                {t("")}
              </div>
              {t("")}
            </div>
            {t("")}
          </div>
          {t("")}
        </div>
        {t("")}
      </>
    );
  }
}

export const RetailProduct = withTranslation()(RetailProductClass);
