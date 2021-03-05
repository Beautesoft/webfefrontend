import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "assets/scss/components/sidebar.scss";
import { getTokenDetails } from "redux/actions/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export class SidebarClass extends Component {
  state = {
    navLinks: [
      {
        to: "/admin/dashboard",
        label: "Dashboard",
        role: ["MANAGER", "ADMINISTRATOR", "THERAPIST"],
      },

      {
        to: "/admin/salons",
        label: "Saloon",
        role: ["ADMINISTRATOR"],
      },
      {
        to: "/admin/staff",
        label: "Staff",
        role: ["ADMINISTRATOR"],
      },
      {
        to: "/admin/customer",
        label: "Customer",
        role: ["MANAGER", "ADMINISTRATOR", "THERAPIST"],
      },
      {
        to: "/admin/appointment",
        label: "Appointments",
        role: ["MANAGER", "ADMINISTRATOR", "THERAPIST"],
      },
      {
        to: "/admin/catalog",
        label: "Catalog",
        role: ["MANAGER", "THERAPIST"],
      },
      {
        to: "/admin/cart",
        label: "Cart",
        role: ["MANAGER", "THERAPIST"],
      },
      // {
      //   to: '/admin/payment',
      //   label: 'Payment',
      //   role: ['MANAGER','THERAPIST']
      // },
      {
        to: "/admin/billing",
        label: "Billing",
        role: ["MANAGER", "THERAPIST"],
      },
      {
        to: "/admin/staff",
        label: "Staff",
        role: ["MANAGER", "THERAPIST"],
      },
      {
        to: "/admin/newappointment",
        label: "Appointment+",
        role: ["MANAGER", "ADMINISTRATOR", "THERAPIST"],
      },
      {
        to: "/admin/service",
        label: "Services",
        role: ["ADMINISTRATOR"],
      },
      {
        to: "/admin/Product",
        label: "Product",
        role: ["ADMINISTRATOR"],
      },
      {
        to: "/admin/reviews",
        label: "Reviews",
        role: ["ADMINISTRATOR"],
      },
    ],
  };

  componentDidMount() {
    this.getToken();
    // console.log(['Manager','ADMINISTRATOR','Staffs'].includes('staffs'), "sidebare ===")
  }

  getToken = async () => {
    await this.props.getTokenDetails().then(res => {
      console.log(res, "sidebare");
    });
    // console.log(this.props, "sidebare");
  };

  handleMenu = () => {
    this.getToken();
  };

  render() {
    let { navLinks } = this.state;
    let { menuOpen, handleSidenav, tokenDetail } = this.props;
    // console.log(this.props, "sidebare");
    return (
      <>
        <div
          className={`container left-menu bg-site-primary  ${
            menuOpen ? "open" : ""
          }`}
        >
          <PerfectScrollbar>
            <ul>
              {navLinks.map(({ to, label, role }, index) =>
                role.includes("THERAPIST") ? (
                  // role.includes(tokenDetail.role) ? (
                  <li key={index}>
                    <NavLink
                      to={to}
                      onClick={this.handleMenu}
                      className="nav-link"
                    >
                      <div className="sidebar-menu">
                        <span className="sidebar-menu-desc">{label}</span>
                      </div>
                    </NavLink>
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>
          </PerfectScrollbar>
        </div>
        <div
          className={`sidemenu-overlay ${menuOpen ? "open" : ""}`}
          onClick={() => handleSidenav()}
        ></div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  tokenDetail: state.authStore.tokenDetails,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getTokenDetails,
    },
    dispatch
  );
};

export const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarClass);
