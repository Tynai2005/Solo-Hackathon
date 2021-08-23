import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {

  const {currentUser} = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
