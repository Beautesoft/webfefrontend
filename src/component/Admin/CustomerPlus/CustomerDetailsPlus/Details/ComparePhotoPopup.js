import React, { Component } from "react";
import { NormalInput, NormalButton, NormalSelect } from "component/common";
import CanvasDraw from "react-canvas-draw";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Webcam from "react-webcam";

export class ComparePhotoPopupClass extends Component {
  state = {
    remarks: "",
    isMounted: true,
  };

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  updateState = (data) => {
    if (this.state.isMounted) this.setState(data);
  };

  componentDidMount() {
    if (this.props.remarks) this.setState({ remarks: this.props.remarks });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {};

  render() {
    let { remarks } = this.state;
    let { dataList } = this.props;
    return (
      <>
        <div className="container-fluid mb-4 mt-2 product-details">
          <div className="row">
            <div className="col-6">
              <h4>Compare Photo</h4>
            </div>
            <div className="col-6">
              <NormalButton
                mainbg={true}
                className="col-12 fs-15 "
                label="Done"
                onClick={() => this.handleSubmit()}
              />
            </div>
          </div>
          <div className="row pl-5 pr-5 mt-4">
            {dataList
              ? dataList.map((data) => (
                  <div className="col-md-6 mb-4">
                    <div className="col-12 mb-4">
                      <img src={data.image} height="100%" width={"100%"} />
                    </div>
                    <div className="col-12">
                      <label className="text-left text-black common-label-text fs-17 pb-2">
                        Remarks
                      </label>
                      <NormalInput
                        placeholder="Enter remarks"
                        value={data.remarks}
                        name="remarks"
                        disabled
                      />
                    </div>
                  </div>
                ))
              : null}
            <div className="col-12 mb-4">
              <label className="text-left text-black common-label-text fs-17 pb-2">
                Remarks
              </label>
              <div className="input-group">
                <NormalInput
                  placeholder="Enter remarks"
                  value={remarks}
                  name="remarks"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export const ComparePhotoPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparePhotoPopupClass);
