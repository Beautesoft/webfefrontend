import React, { Component } from 'react';
import './style.scss';
import { NormalButton, NormalInput, NormalSelect, InputSearch, NormalModal, TableWrapper, NormalCheckbox } from 'component/common';
import { dateFormat } from 'service/helperFunctions';
import _ from 'lodash';
import { history } from 'helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getCommonApi, updateForm, commonCreateApi, commonDeleteApi, commonPatchApi } from "redux/actions/common"
import SimpleReactValidator from 'simple-react-validator';
import { SelectStaff } from './treatmentDone';
import { Reversal } from './reversal';
import service from 'assets/images/make-up-brush.png';
// import Discount from './cart/discount';
import closeIcon from "assets/images/close.png";
import { FormGroup, Label, Input } from "reactstrap";
import { TreatmentHistoryCart } from "./TreatmentHistoryCart";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";


export class TreatmentDoneClass extends Component {
    state = {
        tstaffList: [],
        headerDetails: [
            { label: 'Date', sortKey: false, width: "110px" },
            { label: 'Treatment', width: "120px" },
            { label: 'Trans Ref', sortKey: false, width: "50px" },
           
            //{ label: 'Type', sortKey: false, width: "55px" },
           // { label: 'Exp-Date', sortKey: false, width: "80px" },
            { label: 'Amount', sortKey: false, width: "50px" },
            
           
            { label: 'Treat-Code', sortKey: false, width: "105px" },
            { label: 'TD', sortKey: false, width: "55px" },
            { label: 'Rev', sortKey: false, width: "55px" },
            { label: 'Open', sortKey: false, width: "55px" },
            { label: 'AR', sortKey: false, width: "35px" },
            { label: 'Session', sortKey: false, width: "55px" },
            { label: 'Redeem', sortKey: false, width: "55px" },
            { label: 'Reversal', sortKey: false, width: "55px" },


        ],
        // cartData: {},
        yearList: [],
        selectedYear: 2021,
        isOpenTreatmentDone: false,
        tsStaff: {},
        workPoint: 0,
        isOpenReversal: false,
        checkBoxConfirmReversal: [],
        selectedSession:"",
        selectedItemTreatmentIds:[],
        activeMenu: "treatmentdone",
    }

    componentWillMount = () => {
        this.validator = new SimpleReactValidator({
            element: message => <span className="error-message text-danger validNo fs14">{message}</span>,
            autoForceUpdate: this,
        });
        this.props.getCommonApi('treatmentdone/Year/').then((key) => {
            let { status, data } = key;
            let { yearList } = this.state;
            for (let value of data) {
                yearList.push({ value: value, label: value })
            }
            this.setState({ yearList })
        })

        this.getCart();

    }
      handleCheckboxChangeWithNormalCheckBox = (item) => {
        let newArray = [...this.state.checkBoxConfirmReversal, item.target.name];
        if (this.state.checkBoxConfirmReversal.includes(item.target.name)) {
          newArray = newArray.filter(day => day !== item.target.name);
        }
        this.setState({
          checkBoxConfirmReversal: newArray
        });
      };
    getCart = async () => {
        console.log(this.props, "sfgdfsgdfghgf")
        let { roomList, sourceList, staffList, cartData, duration, tstaffList, selectedYear } = this.state;
        let { custId = 50270 } = this.props.basicApptDetail
        this.props.getCommonApi(`treatmentdone/?year=${selectedYear}&cust_id=${custId}`).then(async(key) => {
            cartData = key;
            await this.setState({tstaffList:[]})
            tstaffList = key.data;
            this.setState({ tstaffList });
        })
    }

    handleYearChange = async ({ target: { value, name } }) => {
        let { selectedYear } = this.state;
        selectedYear = value;
        await this.setState({
            selectedYear
        })
        this.getCart();
    }

    getDataFromRes = (data) => {
        let { formFields, cartData, updateFields, postFields } = this.state;
        formFields['Item'] = data.value.Item;
        formFields['Price'] = data.value.Price;
        formFields['Room'] = data.value.Room;
        updateFields['Room'] = data.value.Room;
        formFields['Source'] = data.value.Source;
        updateFields['Source'] = data.value.Source;
        formFields['add_duration'] = data.value.add_duration;
        formFields['new_remark'] = data.value.new_remark;
        updateFields['new_remark'] = data.value.new_remark;
        postFields['times'] = data.value.times;
        postFields['work_point'] = data.value.work_point;
        this.setState({
            formFields,
            updateFields,
            postFields
        })
    }


    // getYearList = (data) => {
    //     let date = new Date().getFullYear();

    //     let { yearList } = this.state;
    //     for (let i = date; i > 1970; i--) {
    //         yearList.push({ label: i, value: i });
    //     }
    //     this.setState({
    //         yearList
    //     })
    // }

    handleSubmit = (id) => {

    }

    handleDialog = () => {
        this.setState({
            isOpenTreatmentDone: false,
            isOpenReversal: false,
            checkBoxConfirmReversal:[]
        });
        this.getCart();
    }

    handleSearch = (event) => {
        event.persist();

        if (!this.debouncedFn) {
            this.debouncedFn = _.debounce(() => {
                let searchString = event.target.value;
                this.props.getCommonApi(`custappt/?search=${searchString}`).then((key) => {

                    let { status, data } = key;
                    if (status === 200) {
                        // for (let value of data) {
                        //     customerList.push({ value: value.id, label: value.emp_name })
                        // }
                        this.setState({ customerOption: data })
                    }
                })
            }, 500);
        }
        this.debouncedFn();
    }

    handleSelectCustomer = async (data) => {
        let { formFields } = this.state;
        formFields["custId"] = data.id;
        formFields["custName"] = data.cust_name;
        this.setState({ formFields, isOpenCustomer: false, customerOption: [] });
        await this.props.updateForm('basicApptDetail', formFields)
        console.log(this.props.basicApptDetail, "sdfsadfasdf")
    }

    handleCartCreated = (data, price, id) => {
        let { basicApptDetail } = this.props;
        let { tstaffList } = this.state;
        let payload = []

        for(let key of tstaffList){
            let reverseTreatmentIds=[];
            reverseTreatmentIds= key.treatmentids.reverse();
            if(key.sel===true){
                let obj =   {
                    "cust_noid": basicApptDetail.custId,
                    "cart_date" : dateFormat(new Date(), "yyyy-mm-dd"),
                    "itemcodeid": key.stockid,  
                    "price" : key.unit_amount,
                    "item_uom" : null,
                    "treatment_account" : key.TreatmentAccountid,
                    "treatment": reverseTreatmentIds.slice(0, key.session),
                    "ori_stockid": null,
                }
                payload.push(obj);
            }
        }

        let test =payload;
        console.log("payload-data",test);
        this.props.getCommonApi(`itemcart/Check/?cart_date=${dateFormat(new Date(), "yyyy-mm-dd")}&cust_noid=${basicApptDetail.custId}`).then((res) => {
            if (res.data.length === 0) {
                this.props.commonCreateApi("itemcart/TrmtDoneCartCreate/", payload).then((res) => {
                    // this.props.handleCartCreated()
                    this.setState({ activeTab: "treatment", isOpenPriceModal: false })
                    history.push('/admin/cart');
                })
            } else {
                this.props.commonCreateApi(`itemcart/TrmtDoneCartCreate/?cart_id=${res.cart_id}`, payload).then((res) => {
                    // this.props.handleCartCreated()
                    this.setState({ activeTab: "treatment", isOpenPriceModal: false })
                    history.push('/admin/cart');
                })
            }
        })

    }

    handleCheckout = () => {
        let { isOpenPayment } = this.state;
        isOpenPayment = true;
        this.setState({ isOpenPayment });
    }

    handleChange = async ({ target: { value, name } }) => {
        let { formFields } = this.state;
        formFields[name] = value;
        await this.setState({
            formFields,
        });
        // this.props.updateForm('customerDetail', formFields)
        // await this.props.updateForm('appointmentCustomerDetail', formFields)
    };

    handlePostChange = async ({ target: { value, name } }) => {
        let { postFields } = this.state;
        postFields[name] = value;
        await this.setState({
            postFields,
        });
    }

    handleUpdateChange = async ({ target: { value, name } }) => {
        let { updateFields } = this.state;
        updateFields[name] = value;
        await this.setState({
            updateFields,
        });
        let event = { target: { value: value, name: name } }
        // this.handleUpdatestaff(event);
    }

    handleAddstaff = async (item) => {
        let { tstaffList,selectedSession,selectedItemTreatmentIds } = this.state;
        selectedSession=item.session;
        let reverseTreatmentIds=[];
            reverseTreatmentIds= item.treatmentids.reverse();

        if(selectedSession==0)
        {
            selectedSession=1;
        }
        selectedItemTreatmentIds=reverseTreatmentIds.slice(0, selectedSession);
        var unit_rate =item.unit_amount;
        var qualifiedAmount=selectedSession*unit_rate;
        this.setState({selectedSession,selectedItemTreatmentIds});
        
       /* let test=0;
        const currentParentCodeBalance = tstaffList.filter(
            (res) => res.treatment_parentcode ===  item.treatment_parentcode
          ).reduce((sum, currentValue) => {
            return  currentValue.balance;
          }, 0);
        const currentParentCodeSelectedStaffValue = tstaffList.filter(
            (res) => res.treatment_parentcode ===  item.treatment_parentcode && res.staff!=null
            ).reduce((sum, currentValue) => {
                return parseFloat((eval(sum))) + parseFloat((eval(currentValue.unit_amount)));
              }, 0);
        
        if(item.staff==null)
        {
            test=parseFloat((eval(currentParentCodeSelectedStaffValue))) + parseFloat((eval(item.unit_amount))) ;
        }
        else{
            test=parseFloat((eval(currentParentCodeSelectedStaffValue))) - parseFloat((eval(item.unit_amount))) ;
        }
        */
        
        //if (currentParentCodeBalance >= test) {
        if(item.balance>=qualifiedAmount){
          let { tstaffList, formFields, cartData, postFields } = this.state;
          await this.setState({ tsStaff: item });
          this.setState({
            isOpenTreatmentDone: true,
          });
        }
        else{
            this.handleDialog();
            alert("Insufficient balance to redeem");
        }
      };

    handleUpdatestaff = async (event, item, index) => {
        let { tstaffList, formFields, cartData, updateFields } = this.state;
        tstaffList[index][event.target.name] = event.target.value;
        this.setState({
            tstaffList
        })
        let data = {}
        if (event.target.name === "appt_fr_time") {
            data = {
                appt_fr_time: event.target.value,
                add_duration: formFields['add_duration']
            }
        }
        if (event.target.name === "add_duration") {
            data = {
                appt_fr_time: item.appt_fr_time,
                add_duration: event.target.value
            }
        }

        // if (updateFields.Source && updateFields.Room) {
        this.props.commonPatchApi(`tmpitemhelper/${item.id}/?Room_Codeid=${updateFields.Room}&Source_Codeid=${updateFields.Source}&new_remark=${updateFields.new_remark}`, data).then(() => {
            this.getCart();
        })
        // } else {
        //     this.setState({ showUpdateError: true })
        // }
    }

    handleClearLine = () => {
        this.props.commonDeleteApi(`tmpitemhelper/delete/?clear_all=0&cartid=${this.props.cartId}`).then(() => {
            this.getCart();
        })
    }

    handleClearAll = () => {
        this.props.commonDeleteApi(`tmpitemhelper/delete/?clear_all=1&cartid=${this.props.cartId}`).then(() => {
            let { formFields, postFields } = this.state;
            formFields["work_point"] = "";
            postFields['times'] = "";
            this.setState({
                formFields,
                postFields
            });
            this.getCart();

        })
    }
    handleReversalTreatmentAll = async () => {
        let treatmentIds = this.state.checkBoxConfirmReversal

        await this.setState({
            treatmentIds
        });

        this.setState({
            isOpenReversal: true,
        });
    }
    handleReversalTreatment = async (item) => {
        let reverseTreatmentIds=[];
        let { selectedSession } = this.state;
        selectedSession=item.session;

        if(selectedSession==0)
        {
            selectedSession=1;
        }
        reverseTreatmentIds= item.treatmentids.reverse().slice(0, selectedSession);
        await this.setState({
            treatmentIds:reverseTreatmentIds,
            selectedSession
        });

        this.setState({
            isOpenReversal: true,
        });
    }

    handleReverse = (item, index) => {
        let { tstaffList } = this.state;
        tstaffList[index]['rev'] = true;
        this.setState({
            tstaffList
        })
        // onClick={this.handleReversalTreatment}
    }
    changeIndexSession = (index,value) => {
        let { tstaffList } = this.state;
        tstaffList[index]['session'] = value;
        this.setState({
            tstaffList
        })
        // onClick={this.handleReversalTreatment}
    }
    toggle = tab => {
        if (this.state.activeMenu !== tab) {
          this.setState({
            activeMenu: tab,
          });
        }
      };
    render() {      
        let { tstaffList = [], selectedYear, yearList, isOpenTreatmentDone, headerDetails, tsStaff, isOpenReversal, treatmentIds,activeMenu } = this.state;
        let localtStaffList=[...tstaffList]
        let { basicApptDetail } = this.props;
        return (        
            <div className="treatmentDone-menu">
            <div className="row">
              <div className="col-10">
                <div className="beautesoft-navlink customer-detail mt-3">
                  <div className="filled-tabs">
                    <div className="tabs-block">
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeMenu === "treatmentdone",
                            })}
                            onClick={() => {
                              this.toggle("treatmentdone");
                            }}
                          >
                            Treatment Done
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeMenu === "treatmenthistory",
                            })}
                            onClick={() => {
                              this.toggle("treatmenthistory");
                            }}
                          >
                            Treatment History
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <NormalButton
                  buttonClass={"mx-2"}
                  mainbg={true}
                  className="fs-15 clear-line"
                  label="Back"
                  outline={false}
                  onClick={() => history.push(`/admin/cart`)}
                />
              </div>
            </div>
            <div className="treatment-section ml-1 p-2 pr-0">
              <TabContent activeTab={this.state.activeMenu}>
                <TabPane tabId="treatmentdone">
                  {activeMenu === "treatmentdone" ? (
            <div className="row treatment-done-new p-3">          
                <div className="col-10 header">
                    <p className="fs-18 font-700 mb-3 title">Available Treatments</p>
                    <div className="d-flex select-year">
                        <div className="pl-0 mb-2 name fs-16 py-2">
                            Select Year
                        </div>
                        <div className="input-group">
                            <NormalSelect
                                // placeholder="Enter here"
                                options={yearList}
                                value={selectedYear}
                                name="selectedYear"
                                onChange={this.handleYearChange}
                                className="selected-year mb-2 py-0"
                            />
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
                                {tstaffList.length > 0 ? tstaffList.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="position-relative status-type">
                                                <div className="d-flex align-items-center justify-content-center">{item.treatment_date}</div>
                                            </td>
                                            <td><div className="d-flex align-items-center justify-content-center">{item.course}</div></td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center">{item.transacno_ref}</div>
                                            </td>
                                            
                                            
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center">{item.unit_amount}</div>
                                            </td>
                                      
                                           
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center">{item.treatment_code}</div>
                                            </td>
                                            <td> <div className="d-flex align-items-center justify-content-center">{item.td}</div></td>
                                            <td> <div className="d-flex align-items-center justify-content-center">{item.rev}</div></td>
                                            <td> <div className="d-flex align-items-center justify-content-center">{item.open}</div></td>
                                            <td> <div className="d-flex align-items-center justify-content-center">{item.ar}</div></td>
                                            <td >
                                                <input type="text"
                                                style={{ width: "50px"}}
                                                value={item.session}
                                                onChange={(e) =>
                                                    this.changeIndexSession(index,e.target.value)
                                                }
                                                />
                                            </td>
                                            <td style={{ width:"50px"}}>
                                            <button
                                                   className="btnRedeem"
                                                 onClick={() => this.handleAddstaff(item)}
                                                  >
                                                 Select
                                                 </button>
                                            </td>
                                            <td  style={{ width:"50px"}}>
                                         
                                            {item.iscurrentloggedinsalon &&
                                            <button className="btnReversal"
                                            onClick={() => this.handleReversalTreatment(item)}>Select</button>
                                                  }
                                            
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
                        <div className="col-7 d-flex">
                            {/* <NormalButton
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
                            /> */}
                        </div>
                        <div className="col-5">
                        <div className="row">
                        <div className="col-6 text-right">

                             
                                </div>
                            <div className="col-6 text-right">

                            <NormalButton
                                buttonClass={"mx-2"}
                                mainbg={true}
                                className=" fs-15 confirm"
                                label="Confirm Treatment Done"
                                outline={false}
                                onClick={() => this.handleCartCreated()}
                            />

                        </div>
                        </div>
                        </div>
                    </div>
                </div>
                <NormalModal className={"transaction-done-reversal"} style={{ minWidth: "1160px" }} modal={isOpenReversal} handleModal={this.handleDialog}>
                    <img onClick={this.handleDialog} className="close cursor-pointer" src={closeIcon} alt="" />
                    <Reversal id={basicApptDetail.custId} treatmentId={tsStaff.id} reversalId={treatmentIds} cartId={this.props.id} handleModal={this.handleDialog}></Reversal>
                </NormalModal>
                <NormalModal className={"transaction-done-modal"} style={{ minWidth: "760px" }} modal={isOpenTreatmentDone} handleModal={this.handleDialog}>
                    <img onClick={this.handleDialog} className="close cursor-pointer" src={closeIcon} alt="" />
                    <SelectStaff 
                    id={this.state.selectedItemTreatmentIds}
                    //id={tsStaff.id} 
                    session={this.state.selectedSession}
                    cartId={basicApptDetail.cartId}  
                    handleModal={this.handleDialog}></SelectStaff>
                </NormalModal>
            </div>
             ) : null}
             </TabPane>
             <TabPane tabId="treatmenthistory">
               {activeMenu === "treatmenthistory" ? (
                 <div className="row treatment-done-new p-3">
                   <div className="table">
                     <TreatmentHistoryCart
                       customerNumber={basicApptDetail.custId}
                     />
                   </div>
                 </div>
               ) : null}
             </TabPane>
           </TabContent>
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

export const TreatmentDone = connect(mapStateToProps, mapDispatchToProps)(TreatmentDoneClass)