import React from 'react';
import { QuickStats, CustomerStats, StaffServices, IncomeStats, SalesBySalon, SalesByProduct, SalesByCategory, CustomerByCountry, InvoicesStats, Logs } from '../index'
export class AdminStats extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <QuickStats />
                {/* <CustomerStats /> */}
                {/* <div>
                    <h3 className="team-label my-4">Staffs And Customers</h3>
                    <StaffServices />
                </div> */}
                {/* <div>
                    <h3 className="team-label my-4">Service and Product Income Stats</h3>
                    <IncomeStats />
                </div> */}
                {/* <div className="row">
                    <div className="col-4">
                        <SalesByCategory />
                    </div>
                    <div className="col-4">
                        <SalesByProduct />
                    </div>
                    <div className="col-4">
                        <SalesBySalon />
                    </div>
                </div> */}
                {/* <div className="row">
                    <div className="col-4">
                        <CustomerByCountry />
                    </div>
                    <div className="col-4">
                        <InvoicesStats />
                    </div>
                    <div className="col-4">
                        <Logs />
                    </div>
                </div> */}
            </div>
        );
    }
}