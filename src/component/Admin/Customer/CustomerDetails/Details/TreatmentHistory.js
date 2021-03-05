import React, { Component } from 'react';
import { TableWrapper } from 'component/common';
export class TreatmentHistory extends Component {
    state = {
        headerDetails: [
            {
                label: 'S.No',
            }, {
                label: 'Date',
            }, {
                label: 'Time',
            },
            {
                label: 'Treatment Name',
            }, {
                label: 'Cost of Treatment',
            },
            {
                label: 'Salon Name',
            }, {
                label: 'Branch / Location',
            }, {
                label: 'Staff Name',
            }
        ],
        invoice: [
            { no: '1', date: '12/04/19', time: '4.30 PM', treatment: 'Haircut', cost: '$100', salon: 'ABC', branch: 'Kuala Lumpur, Malaysia', staffName: 'John' },
            { no: '2', date: '12/04/19', time: '4.30 PM', treatment: 'Haircut', cost: '$100', salon: 'ABC', branch: 'Kuala Lumpur, Malaysia', staffName: 'John' },
            { no: '3', date: '12/04/19', time: '4.30 PM', treatment: 'Haircut', cost: '$100', salon: 'ABC', branch: 'Kuala Lumpur, Malaysia', staffName: 'John' },
            { no: '4', date: '12/04/19', time: '4.30 PM', treatment: 'Haircut', cost: '$100', salon: 'ABC', branch: 'Kuala Lumpur, Malaysia', staffName: 'John' },
            { no: '5', date: '12/04/19', time: '4.30 PM', treatment: 'Haircut', cost: '$100', salon: 'ABC', branch: 'Kuala Lumpur, Malaysia', staffName: 'John' },
            { no: '6', date: '12/04/19', time: '4.30 PM', treatment: 'Haircut', cost: '$100', salon: 'ABC', branch: 'Kuala Lumpur, Malaysia', staffName: 'John' },
            { no: '7', date: '12/04/19', time: '4.30 PM', treatment: 'Haircut', cost: '$100', salon: 'ABC', branch: 'Kuala Lumpur, Malaysia', staffName: 'John' },
            { no: '8', date: '12/04/19', time: '4.30 PM', treatment: 'Haircut', cost: '$100', salon: 'ABC', branch: 'Kuala Lumpur, Malaysia', staffName: 'John' },
        ],
        pageMeta: {
            chunk: 10,
            page: 1,
            total: 10,
            totalPages: 2,

        },
        active: false,
        currentIndex: -1,
    }
    handleClick = (key) => {
        let currentIndex;
        if (this.state.active == true) {
            this.setState({
                active: false,
                currentIndex: '-1'
            })
        }
        else {
            this.setState({
                active: true,
                currentIndex: key
            })
        }
    }
    render() {
        let { headerDetails, invoice, pageMeta, currentIndex } = this.state
        return (
            <>

                <div className="">
                    <div className="py-4">
                        <div className="normal-table">
                            <TableWrapper
                                headerDetails={headerDetails}
                                //queryHandler={this.props.getAdminInvoiceList}
                                pageMeta={pageMeta}
                            >

                                {invoice.map((item, index) => {

                                    let {
                                        no,
                                        date,
                                        time,
                                        treatment,
                                        cost,
                                        salon,
                                        branch,
                                        staffName
                                    } = item
                                    return (
                                        <tr key={index}>
                                            <td><div className="d-flex align-items-center justify-content-center">{no}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{date}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{time}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{treatment}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{cost}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{salon}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{branch}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{staffName}</div></td>
                                           
                                        </tr>
                                    )
                                })}

                            </TableWrapper>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}