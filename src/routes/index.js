import React, { Component } from "react";
import { Route, Router, Redirect } from "react-router-dom";
import { history } from "../helpers";

import Routers from "./routes";

import * as Layout from "../layout";
import * as Pages from "../pages";

// import { getTokenDetails } from 'redux/actions/auth'

import { NotificationContainer } from "react-notifications";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderRoute: false,
      pathname: null,
      loading: true
    };
  }

  componentDidMount() {
    // if (
    //   history.location.pathname == "/auth" ||
    //   history.location.pathname == "/auth/"
    // ) {
    //   history.push("/auth/login");
    // }
    
  }

  // componentDidMount() { }

  // componentWillReceiveProps({ userPermissionDetails }) { }

  routerGuard = () => {
    // let currentPath = history.location.pathname.split("/")[1];
    // if (currentPath === "auth") {
    // history.push("/admin/dashboard");
    // console.log("asdfgadffgdfgdfgdfgdfg")
    // getTokenDetails()
};

render() {
  return (
    <Router history={history}>
      {Routers.map(
        ({
          component,
          redirect,
          path,
          exact = false,
          // auth = true,
          childrens = []
        }) => {
          if (childrens.length > 0) {
            return (
              <Route
                path={path}
                exact={exact}
                key={path}
                render={props => {
                  if (redirect) {
                    if (props.location.pathname === path) {
                      props.history.push(redirect);
                    }
                  }

                  const LayoutComponent = Layout[component];

                  return (
                    <LayoutComponent {...props}>
                      {childrens.map(
                        ({
                          component: ChildrenComponent,
                          path: childrenPath,
                          exact = false,
                          auth = true
                        }) => {
                          this.routerGuard();
                          return (
                            <Route
                              path={path + childrenPath}
                              exact={exact}
                              key={path + childrenPath}
                              render={props => {
                                let PageComponent = Pages[ChildrenComponent];

                                return <PageComponent {...props} />;
                              }}
                            />
                          );
                        }
                      )}
                    </LayoutComponent>
                  );
                }}
              />
            );
          }

          return (
            <Route
              path={path}
              exact={exact}
              key={component}
              render={props => {
                if (component) {
                  let PageComponent = Pages[component];
                  return <PageComponent {...props} />;
                }
                if (redirect) {
                  return <Redirect to={redirect} />;
                }
                return <div></div>;
              }}
            />
          );
        }
      )}

      <NotificationContainer />
    </Router>
  );
}
}

export default Routes;
