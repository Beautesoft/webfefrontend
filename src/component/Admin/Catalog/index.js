import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NormalButton, NormalSelect } from "component/common";
import { InputSearch, TableWrapper } from "component/common";
import { Cart } from "../Cart";
import "./style.scss";
import { SalonProduct } from "./salonProduct";
import { Favorite } from "./favorite";
import { Services } from "./services";
import { Retail } from "./retail";
import { Package } from "./package";
import { Voucher } from "./voucher";
import { Prepaid } from "./prepaid";
import { All } from "./all";
import { Courses } from "./courses";
import { CatalogCart } from "./catalogCart";
import { RetailProduct } from "./retailProduct";
import _ from "lodash";
import { getCommonApi, commonCreateApi } from "redux/actions/common";
// import { history } from 'helpers';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export class CatalogClass extends Component {
  state = {
    active: false,
    currentValue: 0,
    navLinks: [
      { to: "/admin/catalog", label: "Favorites", id: "Favorites" },
      { to: "/admin/catalog", label: "SERVICE", id: "SERVICE" },
      { to: "/admin/catalog", label: "PACKAGE", id: "PACKAGE" },
      { to: "/admin/catalog", label: "PREPAID", id: "PREPAID" },
      { to: "/admin/catalog", label: "VOUCHER", id: "VOUCHER" },
      { to: "/admin/catalog", label: "RETAIL", id: "RETAIL" },
    ],
    selectedMenu: "Favorites",
    rangeId: "",
    rangeName: "",
    rangeOption: [],
    formFields: {
      search: "",
    },
  };

  componentDidMount() {
    let { navLinks } = this.state;
    // this.props.getCommonApi('catalogitemdept/').then(async (res) => {
    //     // navLinks = res.data;
    //     for (let key of res.data) {
    //         navLinks.push(
    //             {
    //                 to: '/admin/catalog',
    //                 label: key.itm_desc,
    //                 id: key.id
    //             }
    //         )
    //     }
    //     await this.setState({ navLinks })
    // })
    //    this.getRange();
  }

  // getRange = () => {
  //     let { rangeOption, selectedMenu } = this.state;
  //     rangeOption = []
  //     this.props.getCommonApi(`catalogitemrange?Item_Deptid=${selectedMenu}`).then((res) => {
  //         // activeMenu = []
  //         for (let key of res.data) {
  //             rangeOption.push({ value: key.id, label: key.itm_desc })
  //         }
  //         this.setState({ rangeOption })
  //     })
  // }

  handleRangeChange = async ({ target: { value, name } }) => {
    let rangeId = Object.assign({}, this.state.rangeId);
    let rangeName = Object.assign({}, this.state.rangeName);
    let { rangeOption } = this.state;
    rangeId = value;
    // rangeName = name;

    for (let key of rangeOption) {
      if (key.value == value) {
        rangeName = key.label;
      }
    }

    await this.setState({
      rangeId,
      rangeName,
    });
    this.getItemList({});
  };

  handleClick = async (key) => {
    let { active, currentValue } = this.state;
    await this.setState({
      selectedMenu: key.id,
    });
    this.setState({
      active: true,
      currentValue: key.key,
      selected: key.id,
    });
  };

  handleSearch = async (event) => {
    event.persist();
    let { formFields } = this.state;
    formFields["search"] = event.target.value;
    this.setState({ formFields });
    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(async () => {
        let searchString = event.target.value;
        let data = { search: searchString };
        let { selectedMenu, rangeId, rangeName, active, currentValue } =
          this.state;

        rangeId = "";
        rangeName = "";
        selectedMenu = 8;
        active = true;
        currentValue = 6;
        // this.getServices(data)

        await this.setState({
          selectedMenu,
          rangeId,
          rangeName,
          currentValue,
          active,
        });
        this.handleFilter();
      }, 500);
    }
    this.debouncedFn();
  };

  handleFilter = () => {
    this.child.handleFilterSearch({});
  };

  render() {
    let {
      navLinks,
      active,
      currentValue,
      selectedMenu,
      rangeId,
      rangeOption,
      formFields,
    } = this.state;
    return (
      <>
        <div className="catalog-section">
          <div className="row">
            <div className="col-md-12 catalog-content">
              <div className="input-group">
                {/* {
                        selectedMenu ?
                            <div className="input-group range-filter">
                                <NormalSelect
                                    // placeholder="Enter here"
                                    options={rangeOption}
                                    value={rangeId}
                                    name={rangeOption}
                                    onChange={this.handleRangeChange}
                                    className="py-0"
                                />
                            </div> : ""
                    } */}

                <div className="mb-3">
                  <InputSearch
                    className=""
                    value={formFields.search}
                    placeholder="Search here.."
                    onChange={this.handleSearch}
                  />
                </div>
              </div>
              <div className="tab-menus">
                <ul>
                  {navLinks.map(({ to, label, id }, index) => (
                    <li key={index}>
                      <NavLink to={to} className="nav-link">
                        <div
                          className={`sidebar-menu ${
                            currentValue === index ? "active" : ""
                          }`}
                          onClick={() =>
                            this.handleClick({ key: index, id: id })
                          }
                        >
                          <span className="sidebar-menu-desc">{label}</span>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              {selectedMenu === "Favorites" && (
                <Favorite id={selectedMenu} api={"catalogfavorites"} />
              )}
              {selectedMenu === "SERVICE" && (
                <Services id={selectedMenu} api={"servicestock"} />
              )}
              {selectedMenu === "RETAIL" && (
                <Retail id={selectedMenu} api={"retailstock"} />
              )}
              {selectedMenu === "PACKAGE" && (
                <Package id={selectedMenu} api={"packagestock"} />
              )}
              {selectedMenu === "VOUCHER" && (
                <Voucher id={selectedMenu} api={"voucherstock"} />
              )}
              {selectedMenu === "PREPAID" && (
                <Prepaid id={selectedMenu} api={"prepaidstock"} />
              )}
              {/* {selectedMenu == '8' &&
                                <All id={selectedMenu} onRef={ref => (this.child = ref)} search={formFields.search} api={"catalogsearch"} />
                            } */}
            </div>

            {/* <div className=" col-4 ">
                            <div className="ml-2 cart-bar">
                                <CatalogCart id={selectedMenu} ></CatalogCart>
                            </div>
                        </div> */}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  // selected_cstomer: state.common.selected_cstomer,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCommonApi,
      commonCreateApi,
    },
    dispatch
  );
};

export const Catalog = connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogClass);
