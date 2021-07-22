import React, { Component } from "react";
import { TableWrapper } from "component/common";
export class CustomerList extends Component {
  state = {
    headerDetails: [
      {
        label: "Customer name",
        sortKey: true,
      },
      {
        label: "Address",
      },
      {
        label: "Contact number",
      },
      {
        label: "Last visit",
        sortKey: true,
      },
      {
        label: "Service",
        sortKey: true,
      },
      {
        label: "Contribution",
      },
    ],
    invoice: [
      {
        customerName: "Roger",
        address: "1/2, Jurong west, Singapore",
        lastVisit: "12/04/19",
        contact: "9988989898",
        services: "Haircut",
        cost: "$100",
      },
      {
        customerName: "Roger",
        address: "1/2, Jurong west, Singapore",
        lastVisit: "12/04/19",
        contact: "9988989898",
        services: "Haircut",
        cost: "$100",
      },
      {
        customerName: "Roger",
        address: "1/2, Jurong west, Singapore",
        lastVisit: "12/04/19",
        contact: "9988989898",
        services: "Haircut",
        cost: "$100",
      },
      {
        customerName: "Roger",
        address: "1/2, Jurong west, Singapore",
        lastVisit: "12/04/19",
        contact: "9988989898",
        services: "Haircut",
        cost: "$100",
      },
      {
        customerName: "Roger",
        address: "1/2, Jurong west, Singapore",
        lastVisit: "12/04/19",
        contact: "9988989898",
        services: "Haircut",
        cost: "$100",
      },
      {
        customerName: "Roger",
        address: "1/2, Jurong west, Singapore",
        lastVisit: "12/04/19",
        contact: "9988989898",
        services: "Haircut",
        cost: "$100",
      },
      {
        customerName: "Roger",
        address: "1/2, Jurong west, Singapore",
        lastVisit: "12/04/19",
        contact: "9988989898",
        services: "Haircut",
        cost: "$100",
      },
      {
        customerName: "Roger",
        address: "1/2, Jurong west, Singapore",
        lastVisit: "12/04/19",
        contact: "9988989898",
        services: "Haircut",
        cost: "$100",
      },
    ],
    pageMeta: {
      chunk: 10,
      page: 1,
      total: 10,
      totalPages: 2,
    },
    active: false,
    currentIndex: -1,
  };
  handleClick = (key) => {
    let currentIndex;
    if (this.state.active == true) {
      this.setState({
        active: false,
        currentIndex: "-1",
      });
    } else {
      this.setState({
        active: true,
        currentIndex: key,
      });
    }
  };
  render() {
    let { headerDetails, invoice, pageMeta, currentIndex } = this.state;
    return (
      <>
        <div className="">
          <TableWrapper
            headerDetails={headerDetails}
            //queryHandler={this.props.getAdminInvoiceList}
            pageMeta={pageMeta}
          >
            {invoice.map((item, index) => {
              let {
                customerName,
                address,
                contact,
                lastVisit,
                services,
                cost,
              } = item;
              return (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      {customerName}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      {address}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      {contact}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      {lastVisit}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      {services}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      {cost}
                    </div>
                  </td>
                </tr>
              );
            })}
          </TableWrapper>
        </div>
      </>
    );
  }
}
