import React, { Component } from "react";
import {
  NormalInput,
  NormalButton,
  NormalModal,
  NormalCheckbox,
} from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCommonApi,
  commonCreateApi,
  commonDeleteApi,
} from "redux/actions/common";
import closeIcon from "assets/images/close.png";
import "./style.scss";
import { Toast } from "service/toast";
import { StaffList } from "./StaffList";
import { withTranslation } from "react-i18next";

class StaffSelectionPopupClass extends Component {
  state = {
    data_list: [
      // {
      //   id: 4397,
      //   type: "Deposit",
      //   div: "3",
      //   itemdesc: "SM-LYMPHATIC DETOX 60min",
      //   quantity: 5,
      //   price: "200.00",
      //   totl_disc: "0.00",
      //   discount_price: "200.00",
      //   trans_amt: "1000.00",
      //   deposit: "1000.00",
      //   is_foc: false,
      //   work_amount: "200.00",
      //   work_point: 0,
      //   sales_point: 0,
      //   sales_staffs: "JACKIE,JANICE,Manager",
      //   service_staff: "JANICE,ARIEL",
      //   data: [
      //     {
      //       work: true,
      //       sales: false,
      //       staff: "ARIEL",
      //       emp_id: 259,
      //       sales_percentage: null,
      //       sales_amount: null,
      //       sp: null,
      //       work_percentage: 50,
      //       work_amount: "100.00",
      //       wp: 50,
      //       tmp_workid: 128962,
      //       tmp_saleid: null,
      //     },
      //     {
      //       work: true,
      //       sales: true,
      //       staff: "JANICE",
      //       emp_id: 173,
      //       sales_percentage: 33,
      //       sales_amount: "333.00",
      //       sp: 33,
      //       work_percentage: 50,
      //       work_amount: "100.00",
      //       wp: 50,
      //       tmp_workid: 128965,
      //       tmp_saleid: 3789,
      //     },
      //     {
      //       work: false,
      //       sales: true,
      //       staff: "Manager",
      //       emp_id: 284,
      //       sales_percentage: 33,
      //       sales_amount: "333.00",
      //       sp: 33,
      //       work_percentage: null,
      //       work_amount: null,
      //       wp: null,
      //       tmp_workid: null,
      //       tmp_saleid: 3786,
      //     },
      //     {
      //       work: false,
      //       sales: true,
      //       staff: "JACKIE",
      //       emp_id: 81,
      //       sales_percentage: 33,
      //       sales_amount: "333.00",
      //       sp: 33,
      //       work_percentage: null,
      //       work_amount: null,
      //       wp: null,
      //       tmp_workid: null,
      //       tmp_saleid: 3787,
      //     },
      //   ],
      // },
      // {
      //   id: 4398,
      //   type: "Deposit",
      //   div: "3",
      //   itemdesc: "SM-LYMPHATIC DETOX 60min",
      //   quantity: 5,
      //   price: "200.00",
      //   totl_disc: "0.00",
      //   discount_price: "200.00",
      //   trans_amt: "1000.00",
      //   deposit: "1000.00",
      //   is_foc: false,
      //   work_amount: "200.00",
      //   work_point: 0,
      //   sales_point: 0,
      //   sales_staffs: "JACKIE,JANICE,Manager",
      //   service_staff: "JANICE,ARIEL",
      //   data: [
      //     {
      //       work: true,
      //       sales: false,
      //       staff: "ARIEL",
      //       emp_id: 259,
      //       sales_percentage: null,
      //       sales_amount: null,
      //       sp: null,
      //       work_percentage: 50,
      //       work_amount: "100.00",
      //       wp: 50,
      //       tmp_workid: 128962,
      //       tmp_saleid: null,
      //     },
      //     {
      //       work: true,
      //       sales: true,
      //       staff: "JANICE",
      //       emp_id: 173,
      //       sales_percentage: 33,
      //       sales_amount: "333.00",
      //       sp: 33,
      //       work_percentage: 50,
      //       work_amount: "100.00",
      //       wp: 50,
      //       tmp_workid: 128965,
      //       tmp_saleid: 3789,
      //     },
      //     {
      //       work: false,
      //       sales: true,
      //       staff: "Manager",
      //       emp_id: 284,
      //       sales_percentage: 33,
      //       sales_amount: "333.00",
      //       sp: 33,
      //       work_percentage: null,
      //       work_amount: null,
      //       wp: null,
      //       tmp_workid: null,
      //       tmp_saleid: 3786,
      //     },
      //     {
      //       work: false,
      //       sales: true,
      //       staff: "JACKIE",
      //       emp_id: 81,
      //       sales_percentage: 33,
      //       sales_amount: "333.00",
      //       sp: 33,
      //       work_percentage: null,
      //       work_amount: null,
      //       wp: null,
      //       tmp_workid: null,
      //       tmp_saleid: 3787,
      //     },
      //  ],
      //},
    ],
    item_status_options: [],
    staffListPopup: false,
    selectedAddStaffIndex: null,
    staffList: [],
    limit: 6,
    page: 1,
    meta: {},
    sourceList: [],
    selectedAddStaffType: 1,
    activeRow: 0,
  };

  componentDidMount() {
    this.getStaffSelectionList();
  }
  getStafflist = (data) => {
    let { page, limit, selectedAddStaffType } = this.state;
    this.props
      .getCommonApi(
        `empcartlist/?sales_staff=${selectedAddStaffType}&page=${page}&limit=${limit}`
      )
      .then(async (key) => {
        let { status, data } = key;
        console.log(key, "sdfgsdfgsdfgdfg sdfgsdfgsdfg");
        let { staffList } = this.state;
        let { meta } = this.state;
        staffList = [];
        meta = {};
        staffList = data;
        meta = data.meta.pagination;
        console.log(meta, "metalist");
        this.setState({
          staffList,
          meta,
        });
      });
  };

  handleNext = async () => {
    let { page } = this.state;
    page = page + 1;
    await this.setState({
      page,
    });
    if (page > 0) {
      this.getStafflist();
    }
  };

  handleBack = async () => {
    let { page } = this.state;
    page = page - 1;
    await this.setState({
      page,
    });
    if (page > 0) {
      this.getStafflist();
    }
  };

  getStaffSelectionList = () => {
    let { data_list } = this.state;
    let { basicApptDetail } = this.props;
    this.props
      .getCommonApi(
        `cartpopup/?cust_noid=${basicApptDetail.custId}&cart_id=${this.props.id}&is_staffs=1`
      )
      .then(async (key) => {
        let { status, data } = key;
        if (status == "200") {
          console.log(key, "cartstaffselectionpopuplist");
          data_list = data;
          await this.setState({
            data_list,
          });

          if (this.state.data_list.length > 0) {
            this.setState({
              activeRow: this.state.data_list[0].id,
            });
            document
              .getElementById(this.state.data_list[0].id)
              .classList.toggle("d-none");
          }
        }
      });
  };

  handleStaffChange = async (e, index1, index2) => {
    let data = this.state.data_list[index1].data[index2];
    if ([e.target.name] == "work") {
      if (
        (this.state.data_list[index1]["type"].toUpperCase() == "SALES" &&
          this.state.data_list[index1]["div"] == "3") ||
        (this.state.data_list[index1]["type"].toUpperCase() == "DEPOSIT" &&
          this.state.data_list[index1]["div"] == "3")
      ) {
        data[[e.target.name]] = e.target.value;
        await this.setState({ data });
      } else {
        Toast({
          type: "error",
          message: "Work staff not allowed for Product",
        });
      }
    } else {
      data[[e.target.name]] = e.target.value;
      await this.setState({ data });
    }
  };
  handleAccordion = async (id) => {
    await this.setState({
      activeRow: id,
    });
    let elements = document.getElementsByClassName("accordion");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("d-none");
    }
    document.getElementById(id).classList.toggle("d-none");
    console.log(elements);
  };

  handleSelectedStaff = async (item) => {
    this.handleEmployeePopup();
    let { selectedAddStaffIndex, selectedAddStaffType, data_list } = this.state;
    let data = this.state.data_list[selectedAddStaffIndex].data;

    let filter = data.find((acc) => acc.emp_id === item.id);
    if (filter) {
      Toast({
        type: "error",
        message: "This staff already found in this list",
      });
      return false;
    } else {
      data.push({
        work: selectedAddStaffType == 0 ? true : false,
        sales: selectedAddStaffType == 1 ? true : false,
        staff: item.emp_name,
        emp_id: item.id,
        sales_percentage: 0,
        sales_amount: 0,
        sp: 0,
        work_percentage: 0,
        work_amount: 0,
        wp: 0,
        tmp_workid: null,
        tmp_saleid: null,
      });
      await this.setState({ data });
      this.setState({
        selectedAddStaffIndex: null,
        selectedAddStaffType: null,
      });
    }
  };
  handleEmployeePopup = () => {
    this.setState((prevState) => ({
      staffListPopup: !prevState.staffListPopup,
    }));
  };
  handleAddNewStaff = async (index, type, item) => {
    if (type == 0) {
      if (
        (item["type"].toUpperCase() == "SALES" && item["div"] == "3") ||
        (item["type"].toUpperCase() == "DEPOSIT" && item["div"] == "3")
      ) {
        await this.setState({
          selectedAddStaffIndex: index,
          selectedAddStaffType: type,
          staffList: [],
          meta: {},
          page: 1,
        });
        this.getStafflist();
        this.setState({
          staffListPopup: true,
        });
      } else {
        Toast({
          type: "error",
          message: "Work Staff not allowed for Product",
        });
      }
    } else {
      await this.setState({
        selectedAddStaffIndex: index,
        selectedAddStaffType: type,
        staffList: [],
        meta: {},
        page: 1,
      });
      this.getStafflist();
      this.setState({
        staffListPopup: true,
      });
    }
  };

  handlePostAction = () => {
    let { data_list } = this.state;

    for (let value of data_list) {
      let type = value.type;
      let div = value.div;
      let transamt = Number(value.trans_amt).toFixed(2);
      let work_amount = Number(value.work_amount).toFixed(2);
      let sales_point = Number(value.sales_point);
      let work_point = Number(value.work_point);
      let salesPercent = 0;
      let salesAmount = Number(0);
      let salesPoint = Number(0);
      let workPercent = Number(0);
      let workAmount = Number(0);
      let workPoint = Number(0);
      for (let line of value.data) {
        salesPercent += Number(line.sales_percentage);
        salesAmount += Number(line.sales_amount);
        salesPoint += Number(line.sp);
        workPercent += Number(line.work_percentage);
        workAmount += Number(line.work_amount);
        workPoint += Number(line.wp);

        if (line.work) {
          if (
            Number(line.work_amount) <= 0 ||
            line.work_amount == null ||
            line.work_percentage == null ||
            Number(line.work_percentage) <= 0
          ) {
            Toast({
              type: "error",
              message:
                "Please check Work Staff Amount or Percentage should not be empty or Zero",
            });
            return false;
          }
        }
        if (line.sales) {
          if (
            Number(line.sales_amount) <= 0 ||
            line.sales_amount == null ||
            line.sales_percentage == null ||
            Number(line.sales_percentage) <= 0
          ) {
            Toast({
              type: "error",
              message:
                "Please check Sales Staff Amount or Percentage should not be empty or Zero",
            });
            return false;
          }
        }
      }
      if (workPercent > 100 || workAmount > transamt) {
        Toast({
          type: "error",
          message:
            "Please check Work Staff Amount or Percentage should be less than Maximum",
        });
        return false;
      } else if (
        div == "3" &&
        type.toUpperCase() == "DEPOSIT" &&
        workAmount > work_amount
      ) {
        Toast({
          type: "error",
          message:
            "Please check Work amount is should be equal to Max Work Amount",
        });
        return false;
      } else if (salesPercent > 100 || salesAmount > transamt) {
        Toast({
          type: "error",
          message:
            "Please check Sales Amount or percentage should be less than max Amount",
        });
        return false;
      }
    }
    return true;
  };

  handleSubmit = () => {
    let { data_list } = this.state;
    let result = this.handlePostAction();
    if (result) {
      console.log(data_list, "savedataforstaffselection");
      this.props.commonCreateApi(`cartpopup/staffs/`, data_list).then((key) => {
        console.log(key, "resultset of staffselection");
        let { status, data } = key;
        if (status == 200) {
          this.props.handleModal();
        }
      });
    }
  };

  handleSalesStaffCalc = async (index) => {
    let { data_list } = this.state;
    let salesStaffCount = 0;
    for (let line of data_list[index].data) {
      if (line.sales) {
        salesStaffCount += 1;
      }
    }
    let sales_percent = Number(100 / salesStaffCount).toFixed(2);
    let totalsale = sales_percent * salesStaffCount;
    let diff_sales_percent = Number(100 - totalsale).toFixed(2);
    let sales_amount = Number(
      data_list[index]["trans_amt"] / salesStaffCount
    ).toFixed(2);
    let diff_sales_amount = Number(
      data_list[index]["trans_amt"] - sales_amount * salesStaffCount
    ).toFixed(2);
    // let salespoints = Number(
    //   data_list[index]["sales_point"] / salesStaffCount
    // ).toFixed(2);

    let data = data_list[index].data;
    let salesLength = data.filter((acc) => acc.sales === true).length;
    let i = 0;
    let j = 1;
    for (let dataLine of data_list[index].data) {
      if (dataLine.sales) {
        if (j == salesLength) {
          let percent = Number(sales_percent) + Number(diff_sales_percent);
          let amt = Number(sales_amount) + Number(diff_sales_amount);
          data[i]["sales_percentage"] = Number(percent).toFixed(2);

          data[i]["sales_amount"] = Number(amt).toFixed(2);

          //data[i]["sp"] = salespoints;
          await this.setState({ data });
        } else {
          data[i]["sales_percentage"] = sales_percent;
          data[i]["sales_amount"] = sales_amount;
          //data[i]["sp"] = salespoints;
          await this.setState({ data });
        }
        j++;
      }
      i++;
    }
  };
  handleWorkStaffCalc = async (index) => {
    let { data_list } = this.state;

    let workStaffCount = 0;
    for (let line of data_list[index].data) {
      if (line.work) {
        workStaffCount += 1;
      }
    }
    let work_percent = Number(100 / workStaffCount).toFixed(2);
    let totalwork = work_percent * workStaffCount;
    let diff_work_percent = Number(100 - totalwork).toFixed(2);
    let work_amount = "";
    let diff_work_amount = "";
    if (
      data_list[index].div == "3" &&
      data_list[index].type.toUpperCase() == "DEPOSIT"
    ) {
      work_amount = Number(
        data_list[index]["work_amount"] / workStaffCount
      ).toFixed(2);
      diff_work_amount = Number(
        data_list[index]["work_amount"] - work_amount * workStaffCount
      ).toFixed(2);
    } else {
      work_amount = Number(
        data_list[index]["trans_amt"] / workStaffCount
      ).toFixed(2);
      diff_work_amount = Number(
        data_list[index]["trans_amt"] - work_amount * workStaffCount
      ).toFixed(2);
    }
    // let workpoints = Number(
    //   data_list[index]["sales_point"] / workStaffCount
    // ).toFixed(2);
    let data = data_list[index].data;
    let i = 0;
    let j = 1;
    let workLength = data.filter((acc) => acc.work === true).length;
    for (let line of data_list[index].data) {
      if (line.work) {
        if (j == workLength) {
          let percent = Number(work_percent) + Number(diff_work_percent);
          let amt = Number(work_amount) + Number(diff_work_amount);
          data[i]["work_percentage"] = Number(percent).toFixed(2);

          data[i]["work_amount"] = Number(amt).toFixed(2);

          //data[i]["sp"] = salespoints;
          await this.setState({ data });
        } else {
          data[i]["work_percentage"] = work_percent;
          data[i]["work_amount"] = work_amount;
          //data[i]["sp"] = salespoints;
          await this.setState({ data });
        }
        j++;
      }
      i++;
    }
  };

  handleDeleteStaff = async (e, index1, index2) => {
    let data = this.state.data_list[index1].data[index2];
    let cartId = this.state.data_list[index1].id;
    let Workid = 0;
    let Saleid = 0;
    if (data.tmp_workid == null) {
      Workid = 0;
    } else {
      Workid = data.tmp_workid;
    }
    if (data.tmp_saleid == null) {
      Saleid = 0;
    } else {
      Saleid = data.tmp_saleid;
    }

    let body = {
      sales: data.sales,
      work: data.work,
      cart_id: Number(cartId),
      tmp_workid: Number(Workid),
      tmp_saleid: Number(Saleid),
    };
    console.log(body, "selected row Item for delete");
    if (Number(Saleid) > 0 || Number(Workid) > 0) {
      await this.props
        .commonCreateApi(`cartpopup/staffsdelete/`, body)
        .then((res) => {
          let { status } = res;
          if (status == "200") {
            console.log(res, "staffselectionpoppupdeleteresponse");
            let { data_list } = this.state;
            data_list[index1].data.splice(index2, 1);
            this.setState({ data_list });
            this.getStaffSelectionList();
          }
        });
      // this.props
      //   .commonDeleteApi(`cartpopup/staffsdelete/`, body)
      //   .then(async key => {
      //     let { status, data } = key;
      //     console.log(key, "staffselectionpoppupdeleteresponse");
      //     if (status == "200" || status == "201") {
      //       let { data_list } = this.state;
      //       data_list[index1].data.splice(index2, 1);
      //       this.setState({ data_list });
      //       this.getStaffSelectionList();
      //     }
      //   });
    } else {
      let { data_list } = this.state;
      data_list[index1].data.splice(index2, 1);
      this.setState({ data_list });
    }
  };
  render() {
    let { data_list, staffListPopup, staffList, meta, activeRow } = this.state;
    let { t } = this.props;
    return (
      <>
        <div className="container-fluid mb-4 mt-2 product-details">
          <div className="row">
            <div className="col-10">
              <h4>{t("Staff Selection")}</h4>
            </div>
            {data_list && data_list.length > 0 ? (
              <div className="col-2">
                <NormalButton
                  mainbg={false}
                  className="col-12 fs-15 submit-btn"
                  label="Done"
                  onClick={() => this.handleSubmit()}
                />
              </div>
            ) : null}
          </div>
          <div className="row pl-3 pr-5 mt-2 fw-500 h6">
            <div className="col">{t(`Item`)}</div>
            <div className="col">{t(`Qty`)}</div>
            <div className="col">{t(`Unit Price`)}</div>
            <div className="col">{t(`Disc $`)}</div>
            <div className="col">{t(`D/Price`)}</div>
            <div className="col">{t(`Amount`)}</div>
            <div className="col">{t(`Deposit`)}</div>
          </div>
          <div className="row pl-5 pr-5 mt-4">
            {data_list &&
              data_list.length > 0 &&
              data_list.map((item, index) => {
                return (
                  <div className="row w-100 mb-2" key={index}>
                    <div
                      className={`row w-100 rounded p-2 accordion-menu border ${
                        activeRow == item.id ? "border-primary" : ""
                      }`}
                      onClick={() => this.handleAccordion(item.id)}
                    >
                      <div className="col">{item.itemdesc}</div>
                      <div className="col">
                        {item.quantity}
                        {/* <NormalInput
                          name="quantity"
                          type="number"
                          value={item.quantity}
                          onChange={e => this.handleChange(e, index)}
                        /> */}
                      </div>
                      <div className="col">{item.price}</div>
                      <div className="col">{item.totl_disc}</div>
                      <div className="col">{item.discount_price}</div>
                      <div className="col">{item.trans_amt}</div>
                      <div className="col">{item.deposit}</div>
                    </div>
                    <div
                      className="row w-100 rounded bg-light p-1 d-none accordion"
                      id={item.id}
                    >
                      <div className="row w-100 pl-3 mb-3">
                        <table className="table">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="border-top-0 border-bottom-0"
                                colSpan="3"
                              >
                                <div className="row">
                                  <div className="col">
                                    <NormalButton
                                      mainbg={true}
                                      className="col-12 fs-15 fw-500"
                                      label="Sales +"
                                      onClick={() =>
                                        this.handleAddNewStaff(index, 1, item)
                                      }
                                    />
                                  </div>
                                  <div className="col">
                                    <NormalButton
                                      mainbg={true}
                                      className="col-12 fs-15 fw-500"
                                      label="Work +"
                                      onClick={() =>
                                        this.handleAddNewStaff(index, 0, item)
                                      }
                                    />
                                  </div>
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="text-center border-right border-left border-top-0 border-bottom-0"
                                colSpan="3"
                              >
                                <div className="d-flex">
                                  <div className="col">{t("Sales staff")}</div>

                                  <div className="col">
                                    <NormalButton
                                      mainbg={true}
                                      className="col-12 top-0 fs-15"
                                      label="Auto Calc"
                                      onClick={() =>
                                        this.handleSalesStaffCalc(index)
                                      }
                                    />
                                  </div>
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="text-center border-top-0 border-bottom-0"
                                colSpan="3"
                              >
                                <div className="d-flex">
                                  <div className="col">{t("Work staff")}</div>

                                  <div className="col">
                                    <NormalButton
                                      mainbg={true}
                                      className="col-12 fs-15"
                                      label="Auto Calc"
                                      onClick={() =>
                                        this.handleWorkStaffCalc(index)
                                      }
                                    />
                                  </div>
                                </div>
                              </th>
                            </tr>
                            <tr>
                              <th
                                scope="col"
                                className="text-center border-top-0 border-bottom-0"
                              >
                                {t("Sales")}
                              </th>
                              <th
                                scope="col"
                                className="text-center border-top-0 border-bottom-0"
                              >
                                {t("Work")}
                              </th>
                              <th
                                scope="col"
                                className="text-center border-right border-top-0 border-bottom-0"
                              >
                                {t("Staff")}
                              </th>
                              <th
                                scope="col"
                                className="text-center border-right border-top-0 border-bottom-0"
                              >
                                % ({`100`})
                              </th>
                              <th
                                scope="col"
                                className="text-center border-right border-top-0 border-bottom-0"
                              >
                                $ ({item.trans_amt})
                              </th>
                              <th
                                scope="col"
                                className="text-center border-right border-top-0 border-bottom-0"
                              >
                                {t("SP")} ({item.sales_point})
                              </th>
                              <th
                                scope="col"
                                className="text-center border-right border-top-0 border-bottom-0"
                              >
                                % ({`100`})
                              </th>
                              <th
                                scope="col"
                                className="text-center border-right border-top-0 border-bottom-0"
                              >
                                $ (
                                {item.type.toUpperCase() == "DEPOSIT" &&
                                item.div == "3"
                                  ? item.work_amount
                                  : item.trans_amt}
                                )
                              </th>
                              <th
                                scope="col"
                                className="text-center border-top-0 border-bottom-0"
                              >
                                {t("WP")} ({item.work_point})
                              </th>
                              <th>{t("Action")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data_list[index].data.length <= 0 ? (
                              <tr>
                                <div className="d-flex justify-content-center">
                                  {t("No record found")}
                                </div>
                              </tr>
                            ) : null}
                            {data_list[index].data.map((data, index2) => {
                              return (
                                <tr key={index2}>
                                  <th scope="col" className="text-center">
                                    <NormalCheckbox
                                      type="checkbox"
                                      checked={data.sales}
                                      name="sales"
                                      onChange={(e) =>
                                        this.handleStaffChange(e, index, index2)
                                      }
                                    />
                                  </th>
                                  <th scope="col" className="text-center">
                                    <NormalCheckbox
                                      type="checkbox"
                                      checked={data.work}
                                      name="work"
                                      onChange={(e) =>
                                        this.handleStaffChange(e, index, index2)
                                      }
                                    />
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-center border-right"
                                  >
                                    <label className="text-left text-black common-label-text fs-17 pb-2">
                                      {data.staff}
                                    </label>
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-center border-right"
                                  >
                                    <NormalInput
                                      name="sales_percentage"
                                      type="number"
                                      value={
                                        data.sales && data.sales_percentage
                                          ? data.sales_percentage
                                          : ""
                                      }
                                      onChange={(e) =>
                                        this.handleStaffChange(e, index, index2)
                                      }
                                      disabled={data.sales ? false : true}
                                    />
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-center border-right"
                                  >
                                    <NormalInput
                                      name="sales_amount"
                                      type="number"
                                      value={
                                        data.sales && data.sales_amount
                                          ? data.sales_amount
                                          : ""
                                      }
                                      onChange={(e) =>
                                        this.handleStaffChange(e, index, index2)
                                      }
                                      disabled={data.sales ? false : true}
                                    />
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-center border-right"
                                  >
                                    <NormalInput
                                      name="sp"
                                      type="number"
                                      value={data.sp}
                                      onChange={(e) =>
                                        this.handleStaffChange(e, index, index2)
                                      }
                                      disabled={data.sales ? false : true}
                                    />
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-center border-right"
                                  >
                                    <NormalInput
                                      name="work_percentage"
                                      type="number"
                                      value={
                                        data.work && data.work_percentage
                                          ? data.work_percentage
                                          : ""
                                      }
                                      onChange={(e) =>
                                        this.handleStaffChange(e, index, index2)
                                      }
                                      disabled={data.work ? false : true}
                                    />
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-center border-right"
                                  >
                                    <NormalInput
                                      name="work_amount"
                                      type="number"
                                      value={
                                        data.work && data.work_amount
                                          ? data.work_amount
                                          : ""
                                      }
                                      onChange={(e) =>
                                        this.handleStaffChange(e, index, index2)
                                      }
                                      disabled={data.work ? false : true}
                                    />
                                  </th>
                                  <th scope="col" className="text-center">
                                    <NormalInput
                                      name="wp"
                                      type="number"
                                      value={data.wp}
                                      onChange={(e) =>
                                        this.handleStaffChange(e, index, index2)
                                      }
                                      disabled={data.work ? false : true}
                                    />
                                  </th>
                                  <th>
                                    <div
                                      className="col-12 p-0 fs-18 text-center cursor-pointer"
                                      onClick={(e) =>
                                        this.handleDeleteStaff(e, index, index2)
                                      }
                                    >
                                      <span className="icon-delete"></span>
                                    </div>
                                  </th>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {data_list && data_list.length <= 0 ? (
            <div className="row pl-5 pr-5 mt-4">{t("No Record Found")}</div>
          ) : null}
          <NormalModal
            className={"stock-memo-staff-listing"}
            style={{ minWidth: "820px" }}
            modal={staffListPopup}
            handleModal={this.handleEmployeePopup}
          >
            <img
              onClick={this.handleEmployeePopup}
              className="close"
              src={closeIcon}
              alt=""
            />
            <StaffList
              staffList={staffList}
              meta={meta}
              handleNext={() => this.handleNext()}
              handleBack={() => this.handleBack()}
              handleSelectedStaff={(item) => this.handleSelectedStaff(item)}
            />
          </NormalModal>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  basicApptDetail: state.appointment.basicApptDetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCommonApi,
      commonCreateApi,
      commonDeleteApi,
    },
    dispatch
  );
};

export const StaffSelectionPopup = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(StaffSelectionPopupClass)
);
