import React, { Component } from "react";
import Tree from "react-animated-tree";

export class MGMDetails extends Component {
  componentDidMount() {
    var toggler = document.getElementsByClassName("caret");
    var i;

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function () {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      });
    }
  }

  render() {
    const treeStyles = {
      top: 40,
      left: 40,
      color: "black",
      fill: "black",
      width: "100%",
    };
    let {} = this.props;
    return (
      <div className="container">
        <div className="row pb-5">
          <Tree content="Customer 1" open style={treeStyles}>
            <Tree content="Customer 2" />
            <Tree content="Customer 3">
              <Tree content="Customer 4" />
              <Tree content="Customer 5">
                <Tree content="Customer 6" />
                <Tree content="Customer 7" />
                <Tree content="Customer 8" />
              </Tree>
              <Tree content="Customer 9" />
            </Tree>
            <Tree content="Customer 10" />
            <Tree content="Customer 11" />
          </Tree>
        </div>
      </div>
    );
  }
}
