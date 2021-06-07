import React from "react";
import { NormalButton, NormalModal, NormalSelect } from "component/common";
import { InputSearch, TableWrapper } from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import closeIcon from "assets/images/close.png";
import _ from "lodash";
import { AddPhotoPopup } from "./AddPhotoPopup";
import { Navigation } from "react-minimal-side-navigation";
import { ComparePhotoPopup } from "./ComparePhotoPopup";

export class DianosisClass extends React.Component {
  state = {
    photoTableHeader: [
      { label: "Date Taken", sortKey: "date" },
      { label: "Diagnosis Code", sortKey: "code", enabled: true },
      { label: "Remarks", sortKey: "remarks", enabled: true },
      { label: "Compare", sortKey: "compare" },
      { label: "View", sortKey: "view" },
    ],
    photoList: [
      {
        id: "1",
        date: "2020/04/02",
        code: "123",
        image: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
        remarks: "test ",
        isCompare: false,
      },
      {
        id: "2",
        date: "2020/04/02",
        code: "123",
        image:
          "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528",
        remarks: "test 2",
        isCompare: false,
      },
      {
        id: "3",
        date: "2020/04/02",
        code: "123",
        image:
          "https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png",
        remarks: "test 3",
        isCompare: false,
      },
    ],
    historyTableHeader: [
      { label: "Compare Date", sortKey: "date" },
      { label: "Compare Remarks", sortKey: "remarks", enabled: true },
      { label: "Diagnosis Reference", sortKey: "referance", enabled: true },
      { label: "Date", sortKey: "dDate" },
      { label: "View", sortKey: "view" },
    ],
    historyList: [
      {
        id: "1",
        date: "2020/04/02",
        remarks: "test 3",
        images: [
          {
            id: "2",
            date: "2020/04/02",
            code: "123",
            image:
              "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528",
            remarks: "test 2",
            isCompare: false,
          },
          {
            id: "3",
            date: "2020/04/02",
            code: "123",
            image:
              "https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png",
            remarks: "test 3",
            isCompare: false,
          },
        ],
      },
    ],
    visitTableHeader: [
      { label: "Date", sortKey: "date" },
      { label: "PDPA", sortKey: "pdpa", enabled: true },
      {
        label: "Questionairre / Consultation",
        sortKey: "consultation",
        enabled: true,
      },
      { label: "Diagnosis", sortKey: "diagnosis" },
      { label: "Consent Form", sortKey: "consent" },
      { label: "Treatment Done", sortKey: "treatments" },
      { label: "Sales", sortKey: "sales" },
    ],
    visitList: [],
    meta: {},
    active: false,
    currentIndex: -1,
    currentMenu: "/",
    compareList: [],
    selectedRemark: null,
    currentData: null,
    isAddPhotoOpen: false,
    isCompareOpen: false,
  };

  handleOutsideClick = (e) => {
    if (this.node != null) {
      if (this.node.contains(e.target)) {
        return;
      }
    }
    this.handleClick();
  };

  handlePagination = (page) => {
    console.log(page, "dsfsdfsdfsdf");
  };

  handlePhotosearch = (event) => {};
  handleHistorySearch = (event) => {};
  handleVisitSearch = (event) => {};

  handleMenuSelection = (value) => {
    this.setState({
      currentMenu: value,
      selectedRemark: null,
      compareList: [],
    });
  };

  render() {
    let {
      photoTableHeader,
      photoList,
      meta,
      currentData,
      currentMenu,
      isAddPhotoOpen,
      isCompareOpen,
      compareList,
      historyList,
      historyTableHeader,
      selectedRemark,
      visitList,
      visitTableHeader,
    } = this.state;
    return (
      <>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-12 col-lg-2 mb-4">
              <div className="col-md-12 mb-4">
                <h3 className="head-label">Dianosis</h3>
              </div>
              <Navigation
                activeItemId={currentMenu}
                onSelect={({ itemId }) => this.handleMenuSelection(itemId)}
                items={[
                  {
                    title: "Photos",
                    itemId: "/",
                  },
                  {
                    title: "History",
                    itemId: "/history",
                  },
                  {
                    title: "Visits",
                    itemId: "/visits",
                  },
                ]}
              />
            </div>
            {currentMenu == "/" ? (
              <div className="col-md-12 col-lg-10">
                <div className="col-md-12 mb-4">
                  <div className="row">
                    <div className="col-sm-12 col-md-6 mb-4 p-0">
                      <InputSearch
                        className=""
                        placeholder="Search Photo"
                        onChange={this.handlePhotosearch}
                      />
                    </div>
                    <div className="col-sm-12 col-md-6 p-0">
                        <NormalButton
                          mainbg={true}
                          className="col-md-10 fs-15 float-right"
                          label="Add Photo"
                          onClick={() =>
                            this.setState({ isAddPhotoOpen: true })
                          }
                        />
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <div className="table-container">
                    <TableWrapper
                      headerDetails={photoTableHeader}
                      queryHandler={this.handlePagination}
                      pageMeta={meta}
                      showFilterColumn={true}
                      parentHeaderChange={(value) =>
                        this.setState(() => (photoTableHeader = value))
                      }
                    >
                      {photoList
                        ? photoList.map((item, index) => {
                            let { isCompare, image, date, code, remarks } =
                              item;
                            console.log(photoTableHeader[0]);
                            return (
                              <tr key={index}>
                                <td
                                  className={
                                    photoTableHeader[0].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {date}
                                  </div>
                                </td>
                                <td
                                  className={
                                    photoTableHeader[1].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {code}
                                  </div>
                                </td>
                                <td
                                  className={
                                    photoTableHeader[2].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {remarks}
                                  </div>
                                </td>
                                <td
                                  className={
                                    photoTableHeader[3].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    <input
                                      type="checkbox"
                                      checked={isCompare}
                                      onClick={() => {
                                        if (isCompare) {
                                          if (compareList.indexOf(index) != -1)
                                            compareList.pop(index);
                                        } else compareList.push(index);
                                        photoList[index].isCompare = !isCompare;
                                        this.setState({ compareList });
                                        console.log(this.state.compareList);
                                      }}
                                    />
                                  </div>
                                </td>
                                <td
                                  className={
                                    photoTableHeader[4].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    <div
                                      className="d-flex align-items-center fs-20"
                                      onClick={() =>
                                        this.setState({
                                          currentData: { image, remarks },
                                          isAddPhotoOpen: true,
                                        })
                                      }
                                    >
                                      <span className="icon-eye-grey"></span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        : ""}
                    </TableWrapper>
                  </div>
                </div>
                {compareList.length > 0 ? (
                  <div className="w-100 col-4 p-0">
                    <NormalButton
                      mainbg={true}
                      className="col-12 fs-15 float-right"
                      label="Compare"
                      onClick={() => {
                        this.setState({ isCompareOpen: true });
                      }}
                    />
                  </div>
                ) : null}
              </div>
            ) : currentMenu == "/history" ? (
              <div className="col-md-12 col-lg-10">
                <div className="col-md-12 mb-4">
                  <div className="row">
                    <div className="col-12 p-0">
                      <InputSearch
                        className=""
                        placeholder="Search History"
                        onChange={this.handleHistorySearch}
                      />
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <div className="table-container">
                    <TableWrapper
                      headerDetails={historyTableHeader}
                      queryHandler={this.handlePagination}
                      pageMeta={meta}
                      showFilterColumn={true}
                      parentHeaderChange={(value) =>
                        this.setState(() => (historyTableHeader = value))
                      }
                    >
                      {historyList
                        ? historyList.map((item, index) => {
                            let { images, date, remarks } = item;
                            console.log(historyTableHeader[0]);
                            return (
                              <tr key={index}>
                                <td
                                  className={
                                    historyTableHeader[0].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {date}
                                  </div>
                                </td>
                                <td
                                  className={
                                    historyTableHeader[1].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {remarks}
                                  </div>
                                </td>
                                <td
                                  className={
                                    historyTableHeader[2].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {images.map((image) => (
                                      <>
                                        {image.id} <br />
                                      </>
                                    ))}
                                  </div>
                                </td>
                                <td
                                  className={
                                    historyTableHeader[3].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {images.map((image) => (
                                      <>
                                        {image.date} <br />
                                      </>
                                    ))}
                                  </div>
                                </td>
                                <td
                                  className={
                                    historyTableHeader[4].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    <div
                                      className="d-flex align-items-center fs-20"
                                      onClick={() =>
                                        this.setState({
                                          selectedRemark: remarks,
                                          compareList: images,
                                          isCompareOpen: true,
                                        })
                                      }
                                    >
                                      <span className="icon-eye-grey"></span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        : ""}
                    </TableWrapper>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-md-12 col-lg-10">
                <div className="col-md-12 mb-4">
                  <div className="row">
                    <div className="col-12 p-0">
                      <InputSearch
                        className=""
                        placeholder="Search Visit"
                        onChange={this.handleVisitSearch}
                      />
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <div className="table-container">
                    <TableWrapper
                      headerDetails={visitTableHeader}
                      queryHandler={this.handlePagination}
                      pageMeta={meta}
                      showFilterColumn={true}
                      parentHeaderChange={(value) =>
                        this.setState(() => (visitTableHeader = value))
                      }
                    >
                      {visitList
                        ? visitList.map((item, index) => {
                            let { images, date, remarks } = item;
                            console.log(visitTableHeader[0]);
                            return (
                              <tr key={index}>
                                <td
                                  className={
                                    visitTableHeader[0].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {date}
                                  </div>
                                </td>
                                <td
                                  className={
                                    visitTableHeader[1].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {remarks}
                                  </div>
                                </td>
                                <td
                                  className={
                                    visitTableHeader[2].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {images.map((image) => (
                                      <>
                                        {image.id} <br />
                                      </>
                                    ))}
                                  </div>
                                </td>
                                <td
                                  className={
                                    visitTableHeader[3].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {images.map((image) => (
                                      <>
                                        {image.date} <br />
                                      </>
                                    ))}
                                  </div>
                                </td>
                                <td
                                  className={
                                    visitTableHeader[4].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    <div
                                      className="d-flex align-items-center fs-20"
                                      onClick={() =>
                                        this.setState({
                                          selectedRemark: remarks,
                                          compareList: images,
                                          isCompareOpen: true,
                                        })
                                      }
                                    >
                                      <span className="icon-eye-grey"></span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        : ""}
                    </TableWrapper>
                  </div>
                </div>
              </div>
            )}
          </div>

          <NormalModal
            style={{ minWidth: "80%" }}
            modal={isAddPhotoOpen}
            handleModal={() => this.setState({ isAddPhotoOpen: false })}
          >
            <img
              onClick={() => this.setState({ isAddPhotoOpen: false })}
              className="close cursor-pointer"
              src={closeIcon}
              alt=""
            />
            <AddPhotoPopup
              image={currentData?.image}
              remarks={currentData?.remarks}
            />
          </NormalModal>
          <NormalModal
            style={{ minWidth: "80%" }}
            modal={isCompareOpen}
            handleModal={() => this.setState({ isCompareOpen: false })}
          >
            <img
              onClick={() => this.setState({ isCompareOpen: false })}
              className="close cursor-pointer"
              src={closeIcon}
              alt=""
            />
            <ComparePhotoPopup
              dataList={
                currentMenu == "/"
                  ? compareList.map((id) => photoList[id])
                  : compareList
              }
              remarks={currentMenu == "/" ? null : selectedRemark}
            />
          </NormalModal>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export const Dianosis = connect(
  mapStateToProps,
  mapDispatchToProps
)(DianosisClass);
