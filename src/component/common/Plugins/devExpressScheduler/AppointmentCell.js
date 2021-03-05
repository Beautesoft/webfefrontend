import dxPivotGridFieldChooser from "devextreme/ui/pivot_grid_field_chooser";
import React from "react";
import calander from "assets/images/app-icons/00.png";
import outstanding from "assets/images/app-icons/0.png";
import req_therapist from "assets/images/app-icons/1.png";
import treatmentbal from "assets/images/app-icons/2.png";
import birthday from "assets/images/app-icons/3.png";
import new_remark from "assets/images/app-icons/4.png";
import storecard from "assets/images/app-icons/5.png";
import walkin from "assets/images/app-icons/6.png";

import "./Styles.scss";

const getTime = date => {
  var now = new Date(date);
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var ap = "AM";
  if (hour > 11) {
    ap = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour == 0) {
    hour = 12;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  var timeString = hour + ":" + minute + " " + ap;
  return timeString;
};

export default function Appointment(model) {
  const { appointmentData } = model.data;
  let fromTime = getTime(appointmentData.startDate);
  let toTime = getTime(appointmentData.endDate);
  console.log(appointmentData, "Appointment data cell value");
  //   balance: false
  // birthday: false
  // border_color: "#ec40e1"
  // color: "#f0b5ec"
  // current_time: "19:04:51"
  // cust_name: "customer_jan13_01"
  // cust_phone: "8890276000"
  // cust_refer: null
  // endDate: "2021-02-23T10:30:00"
  // id: 280
  // inital: true
  // outstanding: false
  // remark: false
  // remark_val: ""
  // req_therapist: true
  // startDate: "2021-02-23T10:00:00"
  // status: "Booking"
  // text: "BODY SCRUB 30 MIN"
  // walkin: false
  return (
    <div
      className="display-box p-0"
      style={{
        background: appointmentData.color,
        border: appointmentData.border_color,
      }}
    >
      <div className="d-flex">
        <div className="col-1 col-sm-1 col-md-1">
          {appointmentData.inital ? (
            <div className="d-flex justify-content-center pt-1">
              <span className="tooltip-img">
                <img src={calander} />
                <div className="tooltiptext-img text-left">
                  <p>
                    [{fromTime}
                    {" - "}
                    {toTime}]
                  </p>
                  <p>{appointmentData.cust_name}</p>
                  <p>{appointmentData.cust_phone}</p>
                  <p>{appointmentData.status}</p>
                </div>
              </span>
            </div>
          ) : (
            ""
          )}

          {/* <div className="d-flex justify-content-center pt-1">
            <span className="tooltip-img">
              <img src={outstanding}  />
              <span className="tooltiptext-img">
                <p >{appointmentData.text}</p>
              </span>
            </span>
          </div>
           */}
          {appointmentData.req_therapist ? (
            <div className="d-flex justify-content-center pt-1">
              <span className="tooltip-img">
                <img src={req_therapist} />
                <span className="tooltiptext-img">
                  <p>{`Request Therapist`}</p>
                </span>
              </span>
            </div>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-center pt-1">
            <span className="tooltip-img">
              <img src={treatmentbal} />
              <span className="tooltiptext-img">
                {!appointmentData.balance ? (
                  <p>{`No balance for Treatment or product`}</p>
                ) : (
                  ""
                )}
              </span>
            </span>
          </div>

          {appointmentData.birthday ? (
            <div className="d-flex justify-content-center pt-1">
              <span className="tooltip-img">
                <img src={birthday} />
                <span className="tooltiptext-img">
                  <p>{`Birthday Month`}</p>
                </span>
              </span>
            </div>
          ) : (
            ""
          )}
          {appointmentData.remark ? (
            <div className="d-flex justify-content-center pt-1">
              <span className="tooltip-img">
                <img src={new_remark} />
                <span className="tooltiptext-img">
                  <p>{appointmentData.remark_val}</p>
                </span>
              </span>
            </div>
          ) : (
            ""
          )}
          {/* <div className="d-flex justify-content-center pt-1">
            <span className="tooltip-img">
              <img src={storecard}  />
              <span className="tooltiptext-img">
                <p >{appointmentData.text}</p>
              </span>
            </span>
          </div>
          <div className="d-flex justify-content-center pt-1">
            <span className="tooltip-img">
              <img src={walkin}  />
              <span className="tooltiptext-img">
                <p >{appointmentData.text}</p>
              </span>
            </span>
          </div> */}
        </div>
        <div className="col-11 col-sm-11 col-md-11">
          <div className="app-detail">
            <p>
              {fromTime}
              {" - "}
              {toTime}
            </p>
            <p>{appointmentData.cust_name}</p>
            <p>{appointmentData.cust_phone}</p>
            <p>{appointmentData.cust_refer}</p>
            <p>{appointmentData.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
