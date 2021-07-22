import React, { Component, useRef } from "react";
import { AppointmentForm } from "./AppointmentForm";
import { SelectTreatment } from "./selectTreatment";
import { withTranslation } from "react-i18next";

class CustomerAppointmentClass extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  state = {
    customerId: 0,
  };

  componentWillMount() {}

  showErrorMessage = () => {
    this.child.onFocus();
  };

  selectedCustomer = (data) => {
    this.setState({
      customerId: data,
    });
  };

  render() {
    let { t } = this.props;
    return (
      <div className="appointment-holder pt-4 px-3">
        <div className="">
          <p className="header fs-18 f-600 mb-3">{t("Appointments")}</p>
          <AppointmentForm
            onRef={(ref) => (this.child = ref)}
            selectedCustomer={this.selectedCustomer}
          ></AppointmentForm>
        </div>
        <div className="select-appointment">
          <p className="header fs-18 f-600">{t("Select Treatments")}</p>
          <SelectTreatment
            showErrorMessage={this.showErrorMessage}
            customerId={this.state.customerId}
          ></SelectTreatment>
        </div>
      </div>
    );
  }
}

export const CustomerAppointment = withTranslation()(CustomerAppointmentClass);
