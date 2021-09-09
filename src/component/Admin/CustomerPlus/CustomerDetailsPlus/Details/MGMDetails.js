import React, { Component } from "react";
import Tree from "react-animated-tree";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCustomerMGMDetails } from "redux/actions/customerPlus";

class MGMDetailsClass extends Component {
  state = {
    isLoading: true,
    isMounted: true,
    data: [],
  };
  componentWillUnmount() {
    this.state.isMounted = false;
  }

  updateState = (data) => {
    if (this.state.isMounted) this.setState(data);
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.updateState({ isLoading: true });
    await this.props.getCustomerMGMDetails(this.props.id);
    let { mgmData } = this.props;
    this.updateState({ data: mgmData, isLoading: false });
  };

  generateTree = (e) => {
    return e.map((e) => (
      <Tree key={e.cust_no} content={e.cust_name}>
        {e.reference.length == 0 ? null : this.generateTree(e.reference)}
      </Tree>
    ));
  };

  render() {
    const treeStyles = {
      top: 40,
      left: 40,
      color: "black",
      fill: "black",
      width: "100%",
    };

    let { isLoading, data } = this.state;

    return (
      <div className="container">
        <div className="row pb-5">
          {isLoading ? (
            <div class="d-flex w-100 mt-5 align-items-center justify-content-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <Tree content={data.cust_name} open style={treeStyles}>
              {this.generateTree(data.reference)}
            </Tree>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mgmData: state.customerPlus.customerMGMDetails,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCustomerMGMDetails }, dispatch);
};

export const MGMDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(MGMDetailsClass);
