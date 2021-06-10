import React, { Component } from 'react';
import './style.scss';
import { NormalButton, NormalInput, NormalSelect, InputSearch, NormalModal, TableWrapper } from 'component/common';
import { dateFormat } from 'service/helperFunctions';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getCommonApi, updateForm, commonCreateApi, commonDeleteApi, commonPatchApi } from "redux/actions/common"
import { TopupProduct } from './product';
import { TopupTreatment } from './treatment';
import { TopupPrepaid } from './prepaid';


export class TopupClass extends Component {
    state = {
       
        activeMenu: "",
    }

    componentWillMount = () => {
    }

    handleMenu = (data) => {
        let { activeMenu } = this.state;
        activeMenu = data;
        this.setState({
            activeMenu
        })
    }



    render() {
        let {  activeMenu } = this.state;
        return (
            <div className="row treatment-done-new p-3">
                <p className="fs-18 font-700 mb-3 title">{activeMenu} Top Up</p>
                
                {activeMenu==="" ? <div className="col-12 header">
                    <div className="d-flex select-year">
                        <NormalButton
                            buttonClass={"mx-2"}
                            mainbg={true}
                            className="fs-15 clear-line"
                            label="Treatment"
                            outline={false}
                            onClick={() => this.handleMenu('Treatment')}
                        />
                        <NormalButton
                            buttonClass={"mx-2"}
                            mainbg={true}
                            className="fs-15 clear-line"
                            label="Product"
                            outline={false}
                            onClick={() => this.handleMenu('Product')}
                        />
                        <NormalButton
                            buttonClass={"mx-2"}
                            mainbg={true}
                            className=" fs-15 clear-line"
                            label="Prepaid"
                            outline={false}
                            onClick={() => this.handleMenu('Prepaid')}
                        />
                    </div>
                </div>:""}



                {
                activeMenu==="Treatment" ? <div className="col-12 pt-4 action-bar">
                    <TopupTreatment id={this.props.basicApptDetail.custId} handleModal={this.props.handleModal}></TopupTreatment>
                </div>:""
                }
                {
                activeMenu==="Product" ? <div className="col-12 pt-4 action-bar">
                    <TopupProduct id={this.props.basicApptDetail.custId} handleModal={this.props.handleModal}></TopupProduct>
                </div>:""
                }
                {
                activeMenu==="Prepaid" ? <div className="col-12 pt-4 action-bar">
                    <TopupPrepaid id={this.props.basicApptDetail.custId} handleModal={this.props.handleModal}></TopupPrepaid>
                </div>:""
                }

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

export const Topup = connect(mapStateToProps, mapDispatchToProps)(TopupClass)