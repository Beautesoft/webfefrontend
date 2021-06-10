import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Service1 from '../../../../../assets/images/service1.png';
import { Pagination } from 'component/common/Pagination/index';
import { getServices, deleteServices } from 'redux/actions/services';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import _ from 'lodash';

export class AllServicesClass extends Component {
  state = {
    currentIndex: '-1',
    active: false,
    servicesList: [],
    meta: {
      per_page: 10,
      current_page: 1,
      total: 11,
      total_pages: 2, 
    }
  }

  componentWillMount() {
        
    this.queryHandler({})
}

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

  handleOutsideClick = (e) => {
    if (this.node != null) {
      if (this.node.contains(e.target)) {
        return;
      }
    }
    this.handleClick();
  }

  
  queryHandler = (data) => {
    let { page=1, limit=10, search="" } = data
    this.props.getServices(`?page=${page}&limit=${limit}&search=${search}`).then((res) => {
        // console.log(res, "dsfdfaafg", res.data.dataList[0].images)
        this.setState({ servicesList: res.data.dataList, meta: res.data.meta.pagination })
    })
}

handlePagination = (page) => {
    console.log(page, "dsfsdfsdfsdf")
    this.queryHandler(page)
}

handlesearch = (event) => {
    console.log("sadfasdfasdf", event.target.value)
    event.persist();

    if (!this.debouncedFn) {
    this.debouncedFn =  _.debounce(() => {
        let searchString = event.target.value;
        let data = {search:searchString}
        this.queryHandler(data)
    }, 500);
    }
    this.debouncedFn();
}

handleDeleteServices = (id) => {
  this.props.deleteServices(`${id}/`).then((res) => {
  })
}

  render() {
    let { servicesList, currentIndex, meta } = this.state
    return (
      <>
        <div className="service-holder">
          <div className="close"></div>
          {servicesList && servicesList.map((data, index) => (
            <div key={index} className="services" >
              <div className="service1">
                <div className="listImage mr-4">
                 { console.log(data, "sdfsdfsdfasdf")}
                  <img className="" src={data.images ? data.images: Service1} width="128" alt=""/>
                </div>
                <div className="service-offered w-100">
                  <p className="service">{data.Course}</p>
                  <p className="pack">{data.category_name}</p>
                  <p className="price">$ {Number(data.Price).toFixed(2)}</p>
                </div>
                <div className="position-relative pt-2" ref={node => { this.node = node; }}
                  onClick={() => this.handleClick(index)}>
                  {currentIndex === index ?
                    <>
                      <div className="d-flex align-items-center justify-content-center horizontal-more-active">
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle opacity="0.2" cx="21" cy="21" r="21" fill="#023F88" />
                          <path d="M25.5 20.5C25.5 19.125 26.5125 18 27.75 18C28.9875 18 30 19.125 30 20.5C30 21.875 28.9875 23 27.75 23C26.5125 23 25.5 21.875 25.5 20.5ZM23.25 20.5C23.25 21.875 22.2375 23 21 23C19.7625 23 18.75 21.875 18.75 20.5C18.75 19.125 19.7625 18 21 18C22.2375 18 23.25 19.125 23.25 20.5ZM16.5 20.5C16.5 21.875 15.4875 23 14.25 23C13.0125 23 12 21.875 12 20.5C12 19.125 13.0125 18 14.25 18C15.4875 18 16.5 19.125 16.5 20.5Z" fill="#023F88" />
                        </svg>
                      </div>
                      <div className="option card">
                        <Link to={`/admin/service/${data.id}/serviceDetails`}><div className="d-flex align-items-center fs-16 pt-3" ><span className="icon-eye-grey px-3"></span> View </div></Link>
                        <div className="d-flex align-items-center fs-16"><Link to={`/admin/service/${data.id}/editServices`}><span className="icon-edit px-3"></span> Edit </Link></div>
                        <div className="d-flex align-items-center fs-16 pb-3" onClick={()=>this.handleDeleteServices(data.id)}><span className="icon-delete px-3"></span> Delete </div>
                      </div>
                    </>
                    :
                    <div className="d-flex align-items-center justify-content-center horizontal-more">
                      <svg width="18" height="42" viewBox="0 0 18 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 2.5C13.5 1.125 14.5125 -8.01231e-07 15.75 -8.55324e-07C16.9875 -9.09417e-07 18 1.125 18 2.5C18 3.875 16.9875 5 15.75 5C14.5125 5 13.5 3.875 13.5 2.5ZM11.25 2.5C11.25 3.875 10.2375 5 9 5C7.7625 5 6.75 3.875 6.75 2.5C6.75 1.125 7.7625 -5.06179e-07 9 -5.60272e-07C10.2375 -6.14365e-07 11.25 1.125 11.25 2.5ZM4.5 2.5C4.5 3.875 3.4875 5 2.25 5C1.0125 5 -4.91753e-08 3.875 -1.09278e-07 2.5C-1.69382e-07 1.125 1.0125 -2.11127e-07 2.25 -2.6522e-07C3.4875 -3.19313e-07 4.5 1.125 4.5 2.5Z" fill="#C4C4C4" />
                      </svg>
                    </div>
                  }
                </div>
              </div>
            </div>
          ))}
          <Pagination handlePagination={this.handlePagination} pageMeta={meta} />
        </div>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  // filter: state.dashboard
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getServices,
    deleteServices
  }, dispatch)
}

export const AllServices = connect(mapStateToProps, mapDispatchToProps)(AllServicesClass)