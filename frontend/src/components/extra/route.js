import React from "react";
import * as rr from "react-redux";
import {Route, Redirect} from "react-router-dom";

export function RouteClient({ component: Component, ...rest }) {
    const users = rr.useSelector(state => state.users);
    if (users.token){
        return (
            <Route
              {...rest}
              render={routeProps => (
                  <Component {...routeProps} />
              )}
            />
          );
    }
    return (<Redirect to="/404" />);
  }

  export function RouteGuest({ component: Component, ...rest }) {
    const users = rr.useSelector(state => state.users);
    if (!users.token){
        return (
            <Route
              {...rest}
              render={routeProps => (
                  <Component {...routeProps} />
              )}
            />
          );
    }
    return (<Redirect to="/404" />);
  }
