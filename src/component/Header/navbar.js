import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/scss/components/navbar.scss';
import { logout } from '../../service/utilities';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ProfileMenu } from './ProfileMenu'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTokenDetails } from '../../redux/actions/auth';
import UserImage from "../../assets/images/user-image.png"


import headerLogo from "../../assets/images/headerLogo.svg"

export class NavbarClass extends Component {

  componentDidMount() {
    // this.props.getTokenDetails();
  }

  render() {
    const { active } = this.props;
    // let { navLinks } = this.state;
    let { menuOpen, handleSidenav, changeProfileState } = this.props;
    let { tokenDetails } = this.props

    return (

      <header className="header">
        <div className="site-header">
          <div className="d-flex flex-row h-100 align-items-center px-4">
            <div className="navbar-brand pl-2">
              <Link to="/admin/dashboard" className="navbar-logo d-flex align-items-center h-100">
                <img src={headerLogo} alt="" />
              </Link>
            </div>
          </div>
          <div id="navbar-menu">
          
                
              
            <ul className="navbar-nav w-100">
            <li className="nav-item d-flex align-items-right ml-auto position-relative">
            {tokenDetails.branch}{" User : " + tokenDetails.username}
            </li>
              <li className="nav-item d-flex align-items-center position-relative">
                <div className="bell-icon">
                  <i className="icon-bell-o"></i>
                </div>
                <div className="bell-notify"></div>
              </li>
              <li className="nav-item d-flex align-items-center profile-icon" onClick={e => changeProfileState(e, !active)}>
                <img className="border-radius-circle userProfile"
                  src={UserImage} alt=""
                />
                {/* <img src={Down} className="px-3" /> */}
                <i className="icon-down-arrow"></i>

              </li>
              {/* <div className="profile-icon" onClick={e => changeProfileState(e, !active)}>
                  <span className="icon-edit" />
                </div> */}
              <ProfileMenu active={active} data={tokenDetails} />
              {/* <li className="nav-item d-flex align-items-center">
              <div className="profile-icon">
                <div className="px-2" onClick={logout}>
                  <i className="icon-logout pr-3" /><span className="fs-14 text-white pr-4">Logout</span>
                </div>
              </div>
            </li> */}
            </ul>
          </div>
        </div>

      </header>

    );
  }
}

const mapStateToProps = state => ({
  tokenDetails: state.authStore.tokenDetails,
});


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getTokenDetails,
    },
    dispatch,
  );
};

let component = NavbarClass;

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(component);
