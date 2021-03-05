import React, { Component } from 'react';
import './style.scss';
import { NormalButton, NormalInput, NormalSelect, InputSearch, NormalModal, TableWrapper } from 'component/common';
import { dateFormat } from 'service/helperFunctions';
import _ from 'lodash';
import { history } from 'helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getCommonApi, updateForm, commonCreateApi, commonDeleteApi, commonPatchApi } from "redux/actions/common"
import SimpleReactValidator from 'simple-react-validator';
// import { Treatment, Payment, EditCart } from './cart/index';
import service from 'assets/images/make-up-brush.png';
// import Discount from './cart/discount';


export class SelectStaffClass extends Component {
    state = {
        isOpen: false,
        currentIndex: -1,
        tstaffList: [],
        cartData: {},
        postFields: {
            work_point: ""
        },
        Room: null,
        Source: null,
        new_remark: null,
        updateFields: {
            Room_Codeid: "",
            Source_Codeid: "",
            new_remark: ""
        },
        outletList: [],
        headerDetails: [
            { label: 'Employee name', sortKey: false, width: "130px" },
            { label: 'WP1', width: "42px" },
            { label: 'St. time', sortKey: false, width: "55px" },
            { label: 'End time', sortKey: false, width: "55px" },
            { label: 'Duration', sortKey: false, width: "55px" },
        ],
        customerOption: [],
        // cartData: {},
        roomList: [],
        sourceList: [],
        staffList: [],
        duration: [],
        showPostError: false,
        showUpdateError: false,
        staffData:{},
        page:1,
    }

    componentWillMount = () => {
        // this.getCart();
        this.validator = new SimpleReactValidator({
            element: message => <span className="error-message text-danger validNo fs14">{message}</span>,
            autoForceUpdate: this,
        });
        // let { basicApptDetail } = this.props;
        // if (basicApptDetail.custId) {
        //     let { formFields } = this.state;
        //     formFields["custId"] = basicApptDetail.custId;
        //     formFields["custName"] = basicApptDetail.custName;
        //     this.setState({ formFields });
        // }
        let { roomList, sourceList, staffList, cartData, duration, tstaffList } = this.state;
        this.props.getCommonApi('room/').then((key) => {
            let { status, data } = key;
            for (let value of data) {
                roomList.push({ value: value.id, label: value.displayname })
            }
            this.setState({ roomList })
        })
        this.props.getCommonApi(`source/`).then((key) => {
            let { status, data } = key;
            if (status === 200) {
                for (let value of data) {
                    sourceList.push({ value: value.id, label: value.source_desc })
                }
                this.setState({ sourceList })
            }
        })
        this.getStaffList();
        this.getCart();
        this.props.getCommonApi(`treatment/Duration/`).then((key) => {
            let { status, data } = key;
            if (status === 200) {
                for (let value of data) {
                    duration.push({ value: value, label: value })
                }
                this.setState({ duration })
            }
        })
    }

    getCart = () => {
        let { roomList, sourceList, staffList, cartData, duration, tstaffList } = this.state;
        this.props.getCommonApi(`trmttmpitemhelper/?treatmentid=${this.props.id}`).then(async(key) => {
           
            cartData = key;
            await this.setState({tstaffList: []})
            tstaffList = key.data;
            this.setState({ cartData, tstaffList })
            this.getDataFromRes(key)
            
        })
    }

    getDataFromRes = async(key) => {
        let { postFields, updateFields } = this.state;
        postFields['work_point'] = key.value.work_point ? key.value.work_point:"";
        updateFields['Room_Codeid'] = key.value.room_id ? key.value.room_id:"";
        updateFields['Source_Codeid'] = key.value.source_id ? key.value.source_id:"";
        updateFields['new_remark'] = key.value.new_remark ? key.value.new_remark:"";
        await this.setState({
            postFields,
            updateFields
        })
    }

    handleSubmit = (id) => {
        this.props.getCommonApi(`trmttmpitemhelper/confirm/?treatmentid=${this.props.id}`).then(async(key) => {
            if(key.status === 200){
                this.props.handleModal();
            }
        })
    }

    handleDialog = () => {

    }


    handleAddstaff = (item) => {
        let { tstaffList, formFields, cartData, postFields } = this.state;
        let data = {
            helper_id: item.id
        }
        if (postFields.work_point && postFields.times) {
            this.props.commonCreateApi(`trmttmpitemhelper/?cartid=${this.props.cartId}&workcommpoints=${postFields.work_point}&times=${postFields.times}`, data).then(() => {
                this.getCart();
            })
        } else {
            this.setState({ showPostError: true })
        }
    }

    handleuUpdateWp = async (event, item, index) => {
        // event.persist();
        console.log(event, item, index, "sfdgfdgsgf fro")
        let { tstaffList } = this.state;
        tstaffList[index][event.target.name] = event.target.value;
        await this.setState({
            tstaffList
        })
        console.log(event, item, index, "sfdgfdgsgf too")
        if (!this.debouncedFn) {
            this.debouncedFn = _.debounce(async (event, item, index) => {
                console.log(event, item, index, "sfdgfdgsgf inside")
                this.handleUpdatestaff(event, item, index)
            }, 1000);
        }
        this.debouncedFn(event, item, index);
    }

    handleUpdatestaff = async(event, item, index) => {
        let { tstaffList, cartData, updateFields } = this.state;
        let { Room_Codeid, Source_Codeid, new_remark } = updateFields;
        if(event.target.name!=="wp1"){
            tstaffList[index][event.target.name] = event.target.value;
            this.setState({
                tstaffList
            })
        }
        console.log(event, item, index, "sfdgfdgsgf")
        let data = {}
        if(event.target.name==="appt_fr_time"){
            data = {
                appt_fr_time: event.target.value,
                add_duration: cartData.value.add_duration,
                wp1: item.wp1
            }
        }
        if(event.target.name==="add_duration"){
            data = {
                appt_fr_time: item.appt_fr_time,
                add_duration: event.target.value,
                wp1: item.wp1
            }
        }
        if(event.target.name==="wp1"){
            data = {
                appt_fr_time: item.appt_fr_time,
                add_duration: cartData.value.add_duration,
                wp1: item.wp1,
            }
        }
        
        // if (updateFields.Source && updateFields.Room) {
            this.props.commonPatchApi(`trmttmpitemhelper/${item.id}/?Room_Codeid=${Room_Codeid}&Source_Codeid=${Source_Codeid}&new_remark=${new_remark}`, data).then(() => {
                this.getCart();
            })
        // } else {
        //     this.setState({ showUpdateError: true })
        // }
    }

    handleClearLine = () => {
        this.props.commonDeleteApi(`trmttmpitemhelper/delete/?clear_all=0&treatmentid=${this.props.id}`).then(()=>{
            this.getCart();
        });
    }

    handleClearAll = () => {
        this.props.commonDeleteApi(`trmttmpitemhelper/delete/?clear_all=1&treatmentid=${this.props.id}`).then(()=>{ 
            this.getCart();
        });
    }

    getStaffList = () => {
        this.props.getCommonApi(`empcartlist/?sales_staff=0&page=${this.state.page}`).then((key) => {
            let { status, data } = key;
            if (status === 200) {
                this.setState({ staffList:data.dataList })
            }
            console.log(data);
        })
    }

    handleNext = async () => {
        let { page } = this.state;
        page = page + 1;
        await this.setState({
            page
        })
        if (page > 0) {
            this.getStaffList();
        }
    }

    handleBack = async () => {
        let { page } = this.state;
        page = page - 1;
        await this.setState({
            page
        })
        if (page > 0) {
            this.getStaffList();
        }
    }

    handleSelect_Staff = async(staff) => {
        let { tstaffList, postFields, cartData, updateFields } = this.state;
        let { Room_Codeid, Source_Codeid, new_remark } = updateFields;
        let { work_point } = postFields;
        console.log("workpoint",this.props.workPoint);
        let data = {
            helper_id:staff.id
        }
        await this.props.commonCreateApi(`trmttmpitemhelper/?treatmentid=${this.props.id}&workcommpoints=${work_point}`, data).then((key) => {
            
        this.getCart();
            
        });
       
    }

    handleUpdatChanges =  async({ target: { value, name } }) => {
        let { updateFields } = this.state;
        updateFields[name] = value;
        this.setState({
            updateFields
        })
    }

    handlePostChanges =  async({ target: { value, name } }) => {
        let { postFields } = this.state;
        postFields[name] = value;
        this.setState({
            postFields
        })
    }

    render() {
        let { staffList = [], tstaffList = [], roomList,Room,Source,duration,sourceList, updateFields, headerDetails, cartData={}, postFields } = this.state;
        let { value = {} } = cartData;
        let { work_point } = postFields;
        let { Room_Codeid, Source_Codeid, new_remark } = updateFields;
        let { Item, Price, add_duration,room_id,room_name, source_id,source_name,times } = value
        let { tsStaff={} } = this.props;
        let { course, unit_amount, workpoint } = tsStaff;
        return (
            <div className="row new-cart treatment-done">
                <div className="col-12">
                    <p className="fs-18 font-700 mb-3 title">Treatment Done</p>
                </div>
                <div className="col-6 mb-2">
                    <label className="text-left text-black common-label-text ">
                        Item
                    </label>
                    <div className="input-group mb-2">
                        {Item}
                    </div>
                    <label className="text-left text-black common-label-text ">
                        Price
                    </label>
                    <div className="input-group mb-2">
                        {Price}
                    </div>
                    <label className="text-left text-black common-label-text ">
                        Work Point
                    </label>
                    <div className="input-group">
                        <NormalInput
                            value={work_point ? work_point:""}
                            name="work_point"
                            onChange={this.handlePostChanges}
                            className={`customer-name`}
                        />
                    </div>
                </div>
                <div className="col-6 mb-2">

                    <div>
                        <label className="text-left text-black common-label-text ">
                            Room
                        </label>
                    </div>
                    <div className="input-group mb-2">
                        <NormalSelect
                            // placeholder="Enter here"
                            options={roomList}
                            value={Room_Codeid}
                            name="Room_Codeid"
                            onChange={this.handleUpdatChanges}
                            className="customer-name py-0"
                            // disabled={Room_Codeid}
                        />

                    </div>
                    <div>
                        <label className="text-left text-black common-label-text ">
                            Source
                        </label>
                    </div>
                    <div className="input-group mb-2">
                        <NormalSelect
                            // placeholder="Enter here"
                            options={sourceList}
                            value={Source_Codeid}
                            name="Source_Codeid"
                            onChange={this.handleUpdatChanges}
                            className="customer-name py-0"
                            // disabled={Source_Codeid}
                        />
                    </div>
                    <div>
                        <label className="text-left text-black common-label-text ">
                            New Remark
                        </label>
                    </div>
                    <div className="input-group">
                        <NormalInput
                            // placeholder="Enter here"
                            // options={siteList}
                            value={new_remark}
                            name="new_remark"
                            onChange={this.handleUpdatChanges}
                            className="customer-name"
                        />
                    </div>
                </div>
                <div className={`col-12 cart-item emp-image`}>
                        <div className={`staff-listing d-flex emp-list`}>
                            <div className="forward-button cursor-pointer" onClick={this.handleBack}>
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 0.5L1 5L5 9.5" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            {
                                staffList.length>0 ? staffList.map((staff) => {
                                    return (
                                    <div className="mx-1 staff-list cursor-pointer emp" key={staff.id} onClick={() => this.handleSelect_Staff(staff)}>
                                        <img className="img" src={staff.emp_pic} alt=''/>
                                        <p>{staff.emp_name}</p>
                                    </div>
                                    )
                                }):""
                            }
                            <div className="back-button cursor-pointer" onClick={this.handleNext}>
                            <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.5L4.5 5L0.5 0.5" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        </div>
                </div>
                <div className={`col-12 cart-item`}>
                    <div className={`item-list`}>

                        <div className="table">
                            <TableWrapper
                                headerDetails={headerDetails}
                                queryHandler={this.handlePagination}
                            // pageMeta={pageMeta}
                            // isEmpty={tstaffList.length === 0 ? true:false}
                            >
                                {tstaffList && tstaffList.length > 0 ? tstaffList.map((item, index) => {
                                    return (
                                        <tr key={index}>

                                            <td className="position-relative status-type"><div className="d-flex align-items-center justify-content-center">{item.helper_name}</div></td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center">
                    
                                                 <NormalInput
                                                    // placeholder="Enter here"
                                                    // options={siteList}
                                                    value= {item.wp1}
                                                    name="wp1"
                                                    onChange={(e)=>this.handleuUpdateWp(e, item, index)}
                                                    className="wpr"
                                                />
                                                   
                                                </div>
                                            </td> 
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div className="input-group">
                                                        <NormalSelect
                                                            // placeholder="Enter here"
                                                            options={duration}
                                                            value={item.appt_fr_time}
                                                            name="appt_fr_time"
                                                            onChange={(e)=>this.handleUpdatestaff(e, item, index)}
                                                            className="customer-name py-0"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td><div className="d-flex align-items-center justify-content-center">{item.appt_to_time}</div></td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div className="input-group">
                                                        <NormalSelect
                                                            // placeholder="Enter here"this.setState({add_duration:e.target.value})
                                                            options={duration}
                                                            value={item.add_duration}
                                                            name="add_duration"
                                                            onChange={(e)=>this.handleUpdatestaff(e, item, index)}
                                                            className="customer-name p-0"
                                                        />
                                                    </div>
                                                </div>
                                            </td>                                    
                                        </tr>
                                    )
                                }) : ""
                                }

                            </TableWrapper>
                        </div>
                    </div>
                </div>
                <div className="col-12 pt-4 action-bar">
                    <div className="row">
                        <div className="col-6 d-flex">
                            <NormalButton
                                buttonClass={"mx-2"}
                                mainbg={true}
                                className="fs-15 clear-line"
                                label="Clear Line"
                                outline={false}
                                onClick={this.handleClearLine}
                            />
                            <NormalButton
                                buttonClass={"mx-2"}
                                mainbg={true}
                                className="fs-15 clear-all"
                                label="Clear All"
                                outline={false}
                                onClick={this.handleClearAll}
                            />
                        </div>
                        <div className="col-4 text-right">
                            {/* <NormalButton
                                buttonClass={"mx-2"}
                                danger={true}
                                className=" fs-15 close"
                                label="Close"
                                outline={false}
                                onClick={this.props.handleModal}
                            /> */}
                        </div>
                        <div className="col-2 text-right">
                            <NormalButton
                                buttonClass={"mx-2"}
                                mainbg={true}
                                className=" fs-15 confirm"
                                label="Confirm"
                                outline={false}
                                onClick={this.handleSubmit}
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    selected_cstomer: state.common.selected_cstomer,
    basicApptDetail: state.appointment.basicApptDetail,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        // getCustomer,
        getCommonApi,
        updateForm,
        commonCreateApi,
        commonPatchApi,
        commonDeleteApi
    }, dispatch)
}

export const SelectStaff = connect(mapStateToProps, mapDispatchToProps)(SelectStaffClass)