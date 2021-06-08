import React, { Component } from "react";
import { NormalInput, NormalButton, NormalSelect } from "component/common";
import CanvasDraw from "react-canvas-draw";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Webcam from "react-webcam";

export class AddPhotoPopupClass extends Component {
  state = {
    image: null,
    isCameraAvailable: true,
    remarks: "",
    brushRadius: "2",
    brushColor: "yellow",
    brushColorOptions: [
      { label: "Yellow", value: "yellow" },
      { label: "Red", value: "red" },
      { label: "White", value: "white" },
      { label: "Black", value: "black" },
      { label: "Green", value: "green" },
      { label: "Blue", value: "blue" },
    ],
  };

  componentWillMount() {
    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getMedia(
      { video: true },
      () => {
        this.setState({ isCameraAvailable: true });
      },
      () => {
        this.setState({ isCameraAvailable: false });
      }
    );
  }

  componentDidMount() {
    let { image, remarks } = this.props;
    console.log(this.props);
    if (image && remarks) {
      this.setState({ image, remarks });
    }
    document.getElementById("get_file").onclick = function () {
      document.getElementById("my_file").click();
    };
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ image: imageSrc });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {};

  render() {
    let {
      image,
      isCameraAvailable,
      remarks,
      brushRadius,
      brushColor,
      brushColorOptions,
    } = this.state;
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user",
    };

    return (
      <>
        <div className="container-fluid mb-4 mt-2 product-details">
          <div className="row">
            <div className="col-6">
              <h4>Add Photo</h4>
            </div>
            {image == null ? null : (
              <div className="col-6">
                <NormalButton
                  mainbg={true}
                  className="col-12 fs-15 "
                  label="Done"
                  onClick={() => this.handleSubmit()}
                />
              </div>
            )}
          </div>
          {image == null ? (
            <div className="row pl-5 pr-5 mt-4">
              {isCameraAvailable ? (
                <>
                  <div className="col-12">
                    <Webcam
                      audio={false}
                      ref={this.setRef}
                      screenshotFormat="image/jpeg"
                      width={"100%"}
                      videoConstraints={videoConstraints}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <NormalButton
                      mainbg={true}
                      className="col-12 fs-15 "
                      label="Capture"
                      onClick={() => this.capture()}
                    />
                  </div>
                </>
              ) : null}
              <div className="col-12">
                <input
                  type="button"
                  id="get_file"
                  value="Browse"
                  className="btn cursor-pointer mainbg-btn"
                />
                <input
                  type="file"
                  id="my_file"
                  className="d-none"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.value || e.target.value != null) {
                      var reader = new FileReader();
                      reader.onload = (e) => {
                        this.setState({ image: e.target.result });
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="row pl-5 pr-5 mt-4">
              <div className="col-12 mb-4">
                <CanvasDraw
                  imgSrc={this.state.image}
                  canvasHeight={"60vw"}
                  ref={(ref) => (this.canvasDraw = ref)}
                  canvasWidth={"100%"}
                  brushRadius={brushRadius}
                  brushColor={brushColor}
                />
              </div>
              <div className="col-12 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Brush Radius
                </label>
                <input
                  className="col-12"
                  type="range"
                  min="1"
                  max="20"
                  value={brushRadius}
                  onChange={(e) =>
                    this.setState({ brushRadius: e.target.value })
                  }
                />
              </div>
              <div className="col-12 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Brush Color
                </label>
                <NormalSelect
                  options={brushColorOptions}
                  value={brushColor}
                  onChange={(e) =>
                    this.setState({ brushColor: e.target.value })
                  }
                />
              </div>
              <div className="col-12 mb-4">
                <NormalButton
                  mainbg={true}
                  className="col-12 fs-15 "
                  label="Clear"
                  onClick={() => {
                    this.canvasDraw.clear();
                  }}
                />
              </div>
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
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export const AddPhotoPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPhotoPopupClass);
