import React, { Component } from 'react';
import { NormalInput, NormalCheckbox, NormalButton, NormalSelect } from 'component/common';
import Cookies from 'universal-cookie';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SimpleReactValidator from 'simple-react-validator';
import { login, getLoginSaloon } from 'redux/actions/auth';
import { history } from 'helpers/index';
import 'assets/scss/pages/login.scss';
import { Link } from 'react-router-dom';

const cookies = new Cookies();

export class LoginClass extends Component {
  state = {
    formFields: {
      salon: 0,
      username: '',
      password: ''
    },
    rememberme: '',
    passwordVisible: false,
    salonList: []
  };

  componentWillMount() {
    this.validator = new SimpleReactValidator({
      // validators: {
      //   password: {
      //     message: 'The :attribute must be a valid format.',
      //     rule: (val, params, validator) => {
      //       return validator.helpers.testRegex(val, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$/) && params.indexOf(val) === -1
      //     },
      //     messageReplace: (message, params) => message.replace('', this.helpers.toSentence(params)),
      //     required: true
      //   }
      // },
      element: message => <span className="error-message font-md">{message}</span>,
      autoForceUpdate: this,
    });
    /*let { salonList } = this.state;
    this.props.getLoginSaloon().then((res) => {
      for (let key of res.data) {
        salonList.push({ value: key.id, label: key.itemsite_desc })
      }
      this.setState({ salonList })
    })*/
  }
  handleChange = ({ target: { value, name } }) => {
    let formFields = Object.assign({}, this.state.formFields);

    formFields[name] = value;

    this.setState({
      formFields,
    });
  };
  handleChangeAndSubmit = ({ target: { value, name } }) => {
    let formFields = Object.assign({}, this.state.formFields);

    formFields[name] = value;

    this.setState({
      formFields,
    }, () => {
      this.handleSubmit();
    });
  };

  handleFirstLogin = event => {
    event.preventDefault();

    if (this.validator.allValid()) {
      let { formFields, rememberme,salonList} = this.state;

      this.props.login(formFields).then((res) => {
        let { status, data } = res;
         if (status === 200) {
           if(res.data.sites.length>1){
            for (let key of res.data.sites) {
              salonList.push({ value: key.id, label: key.itemsite_desc })
            }
            this.setState({ salonList })
           }
           else{
             formFields.salon=res.data.sites[0].id;
             this.handleSubmit();
           }
          
        }
      });
    } else {
      this.validator.showMessages();
    }
  };

  handleSubmit () {
   // event.preventDefault();

    if (this.validator.allValid()) {
      let { formFields, rememberme } = this.state;

      this.props.login(formFields).then((res) => {
        let { status, data } = res;
         if (status === 200) {
          history.push('/admin/dashboard');
          if (rememberme) {
            let date = new Date();
            date.setTime(date.getTime() + 48 * 60 * 60 * 1000);
            let dateString = date.toGMTString();
            cookies.set('emailId', formFields.emailId, [{ path: '/' }, { expires: dateString }]);
            cookies.set('password', formFields.password, [{ path: '/' }, { expires: dateString }]);
          }
        }
      });
    } else {
      this.validator.showMessages();
    }
  };

  toggle = key => {
    this.setState(prevState => ({
      [key]: !prevState[key],
    }));
  };

  render() {
    let { formFields, passwordVisible, rememberme, salonList } = this.state;

    let { username, password, salon } = formFields;

    return (
      <>
        <div className="login-container h-100 py-5">
          <h1 className="text-left login-heading mb-5">Sign in to access BeauteSoft</h1>
         
          <div className="form-group mb-4 pb-3">
            <div className="input-group">
              <NormalInput
                placeholder="Username"
                value={username}
                name="username"
                onChange={this.handleChange}
              />
            </div>
            {this.validator.message('Username', username, 'required|string')}
          </div>
          <div className="form-group mb-4 pb-3">
            <div className="input-group">
              <NormalInput
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                name="password"
                onChange={this.handleChange}
              />
              <div className="input-group-addon right fs-14">
                <span
                  onClick={() => this.toggle('passwordVisible')}
                  className={`icon-${passwordVisible ? "eye" : "eye-blocked"} cursor-pointer fs-24`}
                ></span>
              </div>
            </div>
            {/* {this.validator.message('Password', password, 'required|password')} */}
            {this.validator.message('Password', password, 'required')}
          </div>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="checkbox">
              <NormalCheckbox
                value=""
                label="Keep me signed in"
                name="rememberme"
                checked={rememberme}
                onChange={() => this.toggle('rememberme')}
              />
            </div>
            <Link className="d-flex align-items-center ml-2" to="/auth/forgotPassword">
              <span className="fs-13 text-right tc-primary link-text">Forgot Password</span>
            </Link>
          </div>

          <div className="form-group mb-0 p-0 d-flex justify-content-center col-12">
            <NormalButton buttonClass={"w-100"} onClick={this.handleFirstLogin} id="loginBtn" label="LOGIN" mainbg={true} className="mr-2 fs-14 col-12" />
          </div>
          <br/><br/>
          {salonList.length>1 &&
          <div className="form-group mb-4 pb-3">
            <div className="input-group">
              <NormalSelect
                placeholder="Please Select Site"
                options={salonList}
                value={salon}
                name="salon"
                onChange={this.handleChangeAndSubmit}
              />
            </div>
            {this.validator.message('salon', salon, 'required|string')}
          </div>
         }
          <center><p>Copyrights (c) Acy7lab.com. 
          </p><p> Licensed to Sequoia - Version 6.6</p>
          <br/>
          <p>Dated: 6.15</p></center>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      getLoginSaloon
    },
    dispatch,
  );
};

let component = LoginClass;

export const Login = connect(null, mapDispatchToProps)(component);
