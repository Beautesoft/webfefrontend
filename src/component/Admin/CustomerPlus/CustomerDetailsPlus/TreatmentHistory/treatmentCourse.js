import React, { Component } from "react";
import "./style.scss";
import { history } from "helpers";
import { Course } from "./course";
import { TreatmentCourseDetailsPlus } from "./treatmentCourseDetails";

export class TreatmentCoursePlus extends Component {
  state = {
    active: "list",
  };

  componentDidMount() {
    this.setState({
      active: "list",
    });
  }

  handleShowDetail = (tab) => {
    let { active } = this.state;
    if (tab) {
      active = tab;
    } else {
      active = "detail";
    }
    this.setState({
      active,
    });
  };

  render() {
    let { active } = this.state;
    return (
      <>
        {active === "list" ? (
          <Course
            id={this.props.id}
            handleShowDetail={this.handleShowDetail}
          ></Course>
        ) : (
          ""
        )}
        {active === "detail" ? (
          <TreatmentCourseDetailsPlus
            id={this.props.id}
          ></TreatmentCourseDetailsPlus>
        ) : (
          ""
        )}
      </>
    );
  }
}
