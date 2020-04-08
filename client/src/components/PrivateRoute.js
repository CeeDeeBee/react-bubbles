import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={() => {
				return localStorage.getItem("token") ? children : <Redirect to="/" />;
			}}
		/>
	);
};

export default PrivateRoute;
