import React, { Component } from 'react';
import './style.scss';
import { NormalButton, NormalInput, NormalSelect, InputSearch, NormalModal, TableWrapper } from 'component/common';
import { dateFormat } from 'service/helperFunctions';
import _ from 'lodash';
import { history } from 'helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getCommonApi, updateForm, commonDeleteApi, commonPatchApi } from "redux/actions/common"
import SimpleReactValidator from 'simple-react-validator';
import { Treatment, Payment, EditCart, TreatmentDone } from './cart/index';
import closeIcon from 'assets/images/close.png';
import add from 'assets/images/add.png';
import minus from 'assets/images/minus.png';
// import Discount from './cart/discount';
import { EditDiscount } from './cart/editDiscount'
import { Topup } from './topup/topup'


export class CartNewClass extends Component {
    state = {
        isOpen: false,
        currentIndex: -1,
        cartList: [],
        cartData: {},
        formFields: {
            custName: "",

        },
        outletList: [
            { label: "name", value: "id" }
        ],
        isOpenPayment: false,
        isOpenEditcart: false,
        isOpenCustomer: false,
        isOpenEditDisc: false,
        isOpenTreatmentDone: false,
        headerDetails: [
            { label: 'Item', sortKey: false, width: "180px" },
            { label: 'Qty', width: "32px" },
            { label: 'Unit Price', sortKey: false, width: "75px" },
            { label: 'Disc $', sortKey: false, width: "55px" },
            { label: 'D/Price', sortKey: false, width: "70px" },
            { label: 'Amt', sortKey: false, width: "72px" },
            { label: 'Deposit', sortKey: false, width: "72px" },
            { label: 'Item Status', sortKey: false, width: "90px" },
            { label: 'S.Staff', sortKey: false, width: "90px" },
            { label: 'T.Staff', sortKey: false, width: "90px" },
            { label: '', width: "100px" }
        ],
        customerOption: [],
        discountFields: {
            discount_per: "",
            discount_amt: "",
            reason: ""
        },
        editCart: {},
        search: "",
        cartId: "",
        isOpenTopup: false
    }

    componentWillMount = () => {
        // this.getCart();
        this.validator = new SimpleReactValidator({
            element: message => <span className="error-message text-danger validNo fs14">{message}</span>,
            autoForceUpdate: this,
        });
        let { basicApptDetail, selectedCart } = this.props;
        if (basicApptDetail.custId) {
            let { formFields } = this.state;
            formFields["custId"] = basicApptDetail.custId;
            formFields["custName"] = basicApptDetail.custName;
            this.setState({ formFields });
            this.getCart();
        }
        if (selectedCart) {

        }
    }

    getCart = () => {
        let { productCard, cartList, cartId } = this.state;
        let { basicApptDetail } = this.props;
        this.setState({ cartList: {}, cartData: [] })
        // this.props.getCommonApi(`itemcart/Check/?sitecodeid=${selected_cstomer.branchId}&cart_date=${"2020-12-11"}&cust_noid=${selected_cstomer.cust_noid}`).then((key) => {
        this.props.getCommonApi(`itemcart/Check/?cart_date=${dateFormat(new Date(), "yyyy-mm-dd")}&cust_noid=${basicApptDetail.custId}`).then((key) => {
            let { status, data, cart_id } = key;
            cartId = cart_id;
            this.setState({ cartId })
            if (data.length !== 0) {

                this.props.getCommonApi(`itemcart/?cart_date=${dateFormat(new Date(), "yyyy-mm-dd")}&cust_noid=${basicApptDetail.custId}&cart_id=${cart_id}`).then((res) => {
                    // this.props.getCommonApi(`itemcart/?sitecodeid=${selected_cstomer.branchId}&cart_date=${"2020-09-17"}&cust_noid=${selected_cstomer.cust_noid}&cart_id=${data[0].cart_id}`).then((res) => {
                    let { status, data } = res;
                    if (status === 200) {

                        this.setState({ cartList: data, cartData: res, cartId })
                    }
                })
            }
        })
    }

    // handleOpen = async () => {
    //     let { isOpen } = this.state
    //     await this.setState({
    //         isOpen: !isOpen,
    //     })
    //     if (isOpen === false) {

    //         this.getCart()
    //     }
    // }

    handleClick = (key) => {
        if (!this.state.active) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            active: !prevState.active,
            currentIndex: key
        }));
    }

    getDateTime = (data) => {
        let date = new Date(data)
        date = String(date).split(" ")
        let date1 = date[2] + "th " + date[1] + ", " + date[3]
        let time = date[4].split(":")
        let time1 = String(Number(time[0]) > 12 ? (Number(time[0]) - 12) : time[0]) + ":" + time[1] + (Number(time[0]) > 12 ? "PM" : "AM")
        return time1 + ", " + date1
    }

    handleSubmit = (id) => {
        history.push(`/admin/payment/${id}`)
    }

    handleDialog = async () => {
        let { isOpenPayment, isOpenEditcart, isOpenCustomer, isOpenEditDisc, isOpenTreatmentDone, isOpenTopup } = this.state;
        isOpenPayment = false;
        isOpenEditcart = false;
        isOpenCustomer = false;
        isOpenEditDisc = false;
        isOpenTreatmentDone = false;
        isOpenTopup = false;
        await this.setState({
            isOpenPayment,
            isOpenEditcart,
            isOpenCustomer,
            isOpenEditDisc,
            isOpenTreatmentDone,
            editCart: {},
            isOpenTopup
        })
        this.getCart();
    }

    handleSearch = async (event) => {
        // event.persist();
        await this.setState({ search: event.target.value })
        if (!this.debouncedFn) {
            this.debouncedFn = _.debounce(async () => {
                this.search()
            }, 500);
        }
        this.debouncedFn();
    }

    search = (searchString) => {
        let { search } = this.state;
        this.props.getCommonApi(`custappt/?search=${search}`).then((key) => {

            let { status, data } = key;
            if (status === 200) {
                // for (let value of data) {
                //     customerList.push({ value: value.id, label: value.emp_name })
                // }
                this.setState({ customerOption: data })
            }
        })
    }

    handleSelectCustomer = async (data) => {
        let { formFields } = this.state;
        formFields["custId"] = data.id;
        formFields["custName"] = data.cust_name;
        await this.setState({ formFields, isOpenCustomer: false, search:"", customerOption: [] });
        await this.props.updateForm('basicApptDetail', formFields)
        console.log(this.props.basicApptDetail, "sdfsadfasdf")
        this.getCart();
    }

    handleCartCreated = () => {
        this.getCart();
    }

    handleCheckout = () => {
        let { isOpenPayment } = this.state;
        isOpenPayment = true;
        this.setState({ isOpenPayment });
    }

    handleDeleteCart = async (data) => {
        this.props.commonDeleteApi(`itemcart/${data.id}/`).then(() => {
            this.getCart();
        })
    }

    handleEditCart = async (data) => {
        let { isOpenEditcart, editCart } = this.state;
        isOpenEditcart = true;
        editCart = data;
        this.setState({
            isOpenEditcart,
            editCart
        })
    }

    handleTreatmentDone = async (item) => {
        let { isOpenTreatmentDone, editCart } = this.state;
        editCart = item;
        await this.setState({ editCart });
        this.setState({ isOpenTreatmentDone: true })
    }

    handleReduceQuantity = (data) => {
        let body = { quantity: 1 }
        this.props.commonPatchApi(`itemcart/${data.id}/qtyupdate/?check=0`, body).then(() => {
            this.getCart();
        })
    }

    handleAddQuantity = (data) => {
        let body = { quantity: 1 }
        this.props.commonPatchApi(`itemcart/${data.id}/qtyupdate/?check=1`, body).then(() => {
            this.getCart();
        })
    }

    // topup flow
    handleTopup = () => {
        let { isOpenTopup } = this.state; 
        isOpenTopup = true;
        this.setState({
            isOpenTopup
        })
    }

    render() {
        let { cartList, customerOption, cartData = {}, editCart = {}, isOpenTreatmentDone, formFields, isOpenPayment, isOpenEditDisc, isOpenEditcart, headerDetails, isOpenCustomer, cartId, isOpenTopup, search } = this.state;
        let { basicApptDetail } = this.props;
        return (
            <div className="row new-cart">
                <div className={`col-7 cart-item`}>

                    <div className={`item-list`}>

                        {/* <div className="row item-list-detail">
                            <div className="col-9 list"> */}
                        {/* <div className="justify-content-between d-flex">
                            <div className="text-orenge fs-16">invoice: 23456</div>
                            <div className="text-orenge fs-16">Billed By: 23456</div>
                            <div className="text-orenge fs-16">2020/09/09</div>
                        </div> */}
                        <div className="row">
                            {/* <div className="col-4"> */}
                            <div className="col-3 my-3">
                                <label className="text-left text-black common-label-text ">
                                    Customer Name
                                    </label>
                            </div>
                            <div className="input-group col-5 my-3">
                                <NormalInput
                                    // placeholder="Enter here"
                                    // options={siteList}
                                    value={formFields.custName}
                                    name="custName"
                                    onClick={() => this.setState({ isOpenCustomer: true })}
                                    onChange={() => { }}
                                    className="custome-name px-3 p-0"
                                />
                            </div>
                            {this.validator.message('customerName', formFields.custName, 'required')}
                            <div className="col-4"></div>
                            <div className="input-group text-right col-3 my-3">
                                <NormalButton
                                    buttonClass={"share w-100"}
                                    mainbg={true}
                                    className="col-12 fs-15 "
                                    label="Service Redeem"
                                    onClick={() => history.push('/admin/cart/treatment-done')}
                                    disabled={!basicApptDetail.custId}
                                />
                            </div>
                            <div className="input-group text-right col-3 my-3">
                                <NormalButton
                                    buttonClass={"share w-100"}
                                    mainbg={true}
                                    className="col-12 fs-15 "
                                    label="Top Up"
                                    onClick={() => this.handleTopup()}
                                    disabled={!basicApptDetail.custId}
                                />
                            </div>
                            <div className="input-group text-right col-3 my-3">
                                <NormalButton
                                    buttonClass={"share w-100"}
                                    mainbg={true}
                                    className="col-12 fs-15 "
                                    label="Bill Ops"
                                    onClick={() => history.push('/admin/cart/bill-ops')}
                                    disabled={!basicApptDetail.custId}
                                />
                            </div>
                        </div>

                        <div className="table">
                            <TableWrapper
                                headerDetails={headerDetails}
                                queryHandler={this.handlePagination}
                            // pageMeta={pageMeta}
                            // isEmpty={cartList.length === 0 ? true:false}
                            >
                                {cartList.length > 0 ? cartList.map((item, index) => {

                                    return (
                                        <tr key={index}>

                                            <td className="position-relative status-type"><span className={``}></span><div className="d-flex align-items-center justify-content-center">{item.itemdesc}</div></td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <img className="cursor-pointer mr-2" onClick={() => this.handleReduceQuantity(item)} src={minus} width="16" alt="" />
                                                    {item.quantity}
                                                    <img className="cursor-pointer ml-2" onClick={() => this.handleAddQuantity(item)} width="16" src={add} alt="" />
                                                </div>
                                            </td>
                                            <td><div className="d-flex align-items-center justify-content-center">{item.price}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{item.discount}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{item.discount_price}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{item.trans_amt}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{item.deposit}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{item.itemstatus_name ? item.itemstatus_name : ""}</div></td>
                                            <td><div className="d-flex align-items-center justify-content-center">{item.sales_staff}</div></td>
                                            <td className="cursor-pointer" onClick={() => this.handleTreatmentDone(item)}><div className="d-flex align-items-center justify-content-center">{item.service_staff}</div></td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div className=" col-5 p-0 pr-2 cursor-pointer" onClick={() => this.handleEditCart(item)}>
                                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V12" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M17.5 1.49998C17.8978 1.10216 18.4374 0.878662 19 0.878662C19.5626 0.878662 20.1022 1.10216 20.5 1.49998C20.8978 1.89781 21.1213 2.43737 21.1213 2.99998C21.1213 3.56259 20.8978 4.10216 20.5 4.49998L11 14L7 15L8 11L17.5 1.49998Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>

                                                    </div>
                                                    <div className="col-5 p-0 cursor-pointer" onClick={() => this.handleDeleteCart(item)}>
                                                        <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4 5V3C4 2.46957 4.21071 1.96086 4.58579 1.58579C4.96086 1.21071 5.46957 1 6 1H10C10.5304 1 11.0391 1.21071 11.4142 1.58579C11.7893 1.96086 12 2.46957 12 3V5M15 5V19C15 19.5304 14.7893 20.0391 14.4142 20.4142C14.0391 20.7893 13.5304 21 13 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V5H15Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M6 10V16" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M10 10V16" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>

                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }) : ""
                                }

                            </TableWrapper>
                        </div>
                        <div className="row payment-section py-2 fs-12">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-6">
                                        Subtotal
                                    </div>
                                    <div className="col-6">
                                        $ {cartData.subtotal ? cartData.subtotal : "0"}
                                    </div>
                                    <div className="col-6">
                                        Discount ($)
                                    </div>
                                    <div className="col-6">
                                        $ {cartData.discount ? cartData.discount : "0"}
                                    </div>
                                    <div className="col-6">
                                        Transac amount
                                    </div>
                                    <div className="col-6">
                                        $ {cartData.trans_amt ? cartData.trans_amt : "0"}
                                    </div>
                                    <div className="col-6">
                                        Deposit
                                    </div>
                                    <div className="col-6">
                                        $ {cartData.deposit_amt ? cartData.deposit_amt : "0"}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="col-12">
                                    <NormalButton
                                        buttonClass={"detail-button"}
                                        // mainbg={true}
                                        className="col-12 fs-15 "
                                        label="Trac/Disc"
                                        outline={true}
                                        onClick={() => this.setState({ isOpenEditDisc: true })}
                                    />
                                </div>
                                <div className="col-12 text-center fs-24 font-700">Total Billing amount</div>
                                <div className="col-12 text-center text-orenge fs-24 font-700">$ {cartData.billable_amount ? cartData.billable_amount : "0"}</div>
                            </div>
                        </div>

                        <div className="row print-share py-3">
                            <div className="col-12">
                                <NormalButton
                                    buttonClass={"share"}
                                    mainbg={true}
                                    className="col-12 fs-15 "
                                    label="Checkout"
                                    onClick={() => this.handleCheckout()}
                                />
                            </div>
                            {/* <div class="col-6">
                                <NormalButton
                                    buttonClass={"share"}
                                    // mainbg={true}
                                    className="col-12 fs-15 "
                                    label="Share"
                                    outline={true}
                                    onClick={cartList.length > 0 ? () => this.handleSubmit(cartList[0].cart_id) : ""}
                                />
                            </div> */}
                        </div>
                    </div>

                    {/* <div className="confirm-booking">
                    <NormalButton
                        buttonClass={"treatment"}
                        mainbg={true}
                        className="col-12 fs-15 "
                        label="Checkout to payment"
                        onClick={cartList.length>0 ? ()=>this.handleSubmit(cartList[0].cart_id):""}
                    />
                    </div> */}
                </div>
                <div className="col-5 pl-2 pr-0">
                    <Treatment handleCartCreated={this.handleCartCreated}></Treatment>
                </div>
                <NormalModal className={"payment-modal"} style={{ minWidth: "1000px" }} modal={isOpenPayment} handleModal={this.handleDialog}>
                    <img onClick={this.handleDialog} className="close cursor-pointer" src={closeIcon} alt="" />
                    {console.log("sfgdfjhfghjfjgkjk", cartData)}
                    <Payment id={basicApptDetail.custId} cartId={cartList.length > 0 ? cartList[0].cart_id : ""} handleModal={this.handleDialog}></Payment>
                </NormalModal>

                <NormalModal className={"edit-cart-modal"} style={{ minWidth: "1000px" }} modal={isOpenEditcart} handleModal={this.handleDialog}>
                    <img onClick={this.handleDialog} className="close cursor-pointer" src={closeIcon} alt="" />
                    <EditCart id={editCart.id} handleModal={this.handleDialog}></EditCart>
                </NormalModal>
                <NormalModal className={"transaction-discount-update"} style={{ minWidth: "1000px" }} modal={isOpenEditDisc} handleModal={this.handleDialog}>
                    <img onClick={this.handleDialog} className="close cursor-pointer" src={closeIcon} alt="" />
                    {/* <Discount discountFields={()=>{}} handleChange={()=>{}} handleSubmit={()=>{}}></Discount> */}
                    {
                        isOpenEditDisc ? <EditDiscount id={cartId} handleModal={this.handleDialog}></EditDiscount> : ""
                    }
                </NormalModal>
                <NormalModal className={"transaction-done-modal"} style={{ minWidth: "760px" }} modal={isOpenTreatmentDone} handleModal={this.handleDialog}>
                    <img onClick={this.handleDialog} className="close cursor-pointer" src={closeIcon} alt="" />
                    <TreatmentDone id={cartId} cartId={editCart.id} handleModal={this.handleDialog}></TreatmentDone>
                </NormalModal>
                <NormalModal className={"select-category customer-select"} style={{ minWidth: "1000px" }} modal={isOpenCustomer} handleModal={this.handleDialog}>
                    <img onClick={this.handleDialog} className="close" src={closeIcon} alt="" />
                    <div className="row mt-2 mb-5 mx-3">
                        <div className="col-12 pl-0 mb-3 fs-18 py-2">
                            Select Customer
                        </div>
                        <div className="col-2 pl-0">Search</div>
                        <div className="col-5">
                            <input
                                name="treatment"
                                value={search}
                                onChange={this.handleSearch}
                                className="search m-0 p-0 px-3"
                            />
                        </div>
                        <div className="col-3">
                            <NormalButton
                                buttonClass={"mx-2 p-0"}
                                mainbg={true}
                                className=" fs-15 confirm"
                                label="Search"
                                outline={false}
                                onClick={() => this.search(this.state.search)}
                            />
                        </div>



                        <div className="row mt-4 table-header w-100 m-0">
                            <div className="col-3">Name</div>
                            <div className="col-2">Phone</div>
                            <div className="col-3">Cust Code</div>
                            <div className="col-4">Email</div>
                        </div>
                        <div className="response-table w-100">
                            {customerOption && customerOption.length > 0 ? customerOption.map((item, index) => {
                                return (
                                    <div className="row m-0 table-body w-100" onClick={() => this.handleSelectCustomer(item)} key={index}>
                                        <div className="col-3">{item.cust_name}</div>
                                        <div className="col-2">{item.cust_phone1}</div>
                                        <div className="col-3">{item.cust_code}</div>
                                        <div className="col-4">{item.cust_email}</div>
                                    </div>
                                )
                            }) : <div className="text-center w-100">
                                    No Data are available
                        </div>}
                        </div>
                    </div>
                </NormalModal>
                <NormalModal className={"transaction-done-modal top-up-modal"} style={{ minWidth: "1160px" }} modal={isOpenTopup} handleModal={this.handleDialog}>
                    <img onClick={this.handleDialog} className="close cursor-pointer" src={closeIcon} alt="" />
                    <Topup id={cartId} cartId={editCart.id} handleModal={this.handleDialog}></Topup>
                </NormalModal>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    selected_cstomer: state.common.selected_cstomer,
    basicApptDetail: state.appointment.basicApptDetail,
    selectedCart: state.common.selectedCart,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        // getCustomer,
        getCommonApi,
        updateForm,
        commonDeleteApi,
        commonPatchApi
    }, dispatch)
}

export const CartNew = connect(mapStateToProps, mapDispatchToProps)(CartNewClass)