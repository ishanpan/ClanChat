import { Fragment } from "react";

const Welcome = (props) => {
	return (
		<Fragment>
			<h1>Hello, {props.nickname} </h1>
			<h1>You are logged in!</h1>
		</Fragment>
	);
};

export default Welcome;
