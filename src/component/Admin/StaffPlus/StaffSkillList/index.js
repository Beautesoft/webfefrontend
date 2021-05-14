import React from "react";
import { NormalButton, Pagination } from "component/common";
import { InputSearch, TableWrapper } from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import "./styles.scss";

export class StaffSkillListClass extends React.Component {
  state = {
    empData: [
      {
        label: "Nick",
        data: [
          { id: "0", value: true },
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: false },
        ],
      },
      {
        label: "Vincent",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: false },
          { id: "3", value: false },
        ],
      },
      {
        label: "Din",
        data: [
          { id: "0", value: false },
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: true },
        ],
      },
      {
        label: "KK",
        data: [
          { id: "0", value: false },
          { id: "1", value: false },
          { id: "2", value: true },
          { id: "3", value: false },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
      {
        label: "Nambi",
        data: [
          { id: "0", value: true },
          { id: "1", value: true },
          { id: "2", value: true },
          { id: "3", value: true },
        ],
      },
    ],
    staffSkillList: [
      { id: "0", label: "Siatsu Massage" },
      { id: "1", label: "Foot Massage" },
      { id: "2", label: "Body Massage" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
      { id: "3", label: "Eyelash Touchup" },
    ],
    pageMeta: {},
    staffMeta: { current_page: 1, total_pages: 1 },
    skillsMeta: { current_page: 1, total_pages: 1 },
    currentIndex: -1,
    activeIndex: "0",
  };

  // popup open/close
  handleClick = (key) => {
    if (!this.state.active) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState((prevState) => ({
      active: !prevState.active,
      currentIndex: key,
    }));
  };

  // while clicking popup close at outside click
  handleOutsideClick = (e) => {
    if (this.node != null) {
      if (this.node.contains(e.target)) {
        return;
      }
    }
    this.handleClick();
  };

  // pagination
  handlePagination = (page) => {
    this.queryHandler(page);
  };

  // seach change with api call
  handlesearch = (event) => {
    event.persist();

    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        let searchString = event.target.value;
        let data = { search: searchString };
        this.queryHandler(data);
      }, 500);
    }
    this.debouncedFn();
  };

  render() {
    let {
      pageMeta,
      skillsMeta,
      staffMeta,
      empData,
      staffSkillList,
      activeIndex
    } = this.state;
    if (empData.length > 10) {
      staffMeta.total_pages = Math.ceil(empData.length / 10);
      empData = empData.slice(
        (staffMeta.current_page - 1) * 10,
        staffMeta.current_page * 10
      );
    }
    if(activeIndex == "1")
    if (staffSkillList.length > 10) {
      skillsMeta.total_pages = Math.ceil(staffSkillList.length / 10);
      staffSkillList = staffSkillList.slice(
        (skillsMeta.current_page - 1) * 10,
        skillsMeta.current_page * 10
      );
    }
    empData.unshift({
      label: "",
    });
    return (
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <input
              type="radio"
              className="mr-2"
              name="version"
              checked={this.state.activeIndex == "0"}
              onClick={(e) => this.setState({ activeIndex: "0" })}
            />
            version 1
          </div>
          <div className="col-12">
            <input
              type="radio"
              className="mr-2"
              name="version"
              checked={this.state.activeIndex == "1"}
              onClick={(e) => this.setState({ activeIndex: "1" })}
            />
            version 2
          </div>
        </div>
        <div className="row">
          <div className="staffList-container col-xl">
            <div className="row align-items-center">
              <div className="col-md-4">
                <h3>Staff Skill Listing</h3>
              </div>
              <div className="col-md-8">
                <div className="d-flex justify-content-between">
                  <div className="w-100 col-8">
                    <InputSearch
                      className=""
                      placeholder="Search Skill"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="w-100 col-4 ml-1 p-0">
                    <NormalButton
                      mainbg={true}
                      className="col-12 fs-15 float-right"
                      label="Add Staff Skill"
                      onClick={() =>
                        this.props.history.push("/admin/staffplus/skills/add")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4 ml-2 mt-2">
              EMP Pagination
              <Pagination
                pageMeta={staffMeta}
                handlePagination={(val) => {
                  staffMeta.current_page = val;
                  this.setState({});
                }}
              />
              {activeIndex == "1" ? <>
              SkillsPagination
              <Pagination
                pageMeta={skillsMeta}
                handlePagination={(val) => {
                  skillsMeta.current_page = val;
                  this.setState({});
                }}
              />
              </>:null}
            </div>
            <div className="tab-table-content">
              <div className="py-4">
                <div className="table-container">
                  <TableWrapper
                    className="tableFixHeads"
                    headerDetails={empData}
                    queryHandler={this.handlePagination}
                    pageMeta={pageMeta}
                  >
                    {staffSkillList
                      ? staffSkillList.map(({ id, label }, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="d-flex align-items-center justify-content-center">
                                  {label}
                                </div>
                              </td>
                              {empData
                                .filter((e) => e.label != "")
                                .map((e) => (
                                  <td>
                                    {e.data.find((e) => e.id == id).value ? (
                                      <div class="d-flex justify-content-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          fill="currentColor"
                                          class="bi bi-check"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                      </div>
                                    ) : (
                                      <div class="d-flex justify-content-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          fill="currentColor"
                                          class="bi bi-x"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                      </div>
                                    )}
                                  </td>
                                ))}
                            </tr>
                          );
                        })
                      : ""}
                  </TableWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export const StaffSkillList = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffSkillListClass);
