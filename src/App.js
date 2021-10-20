import { Fragment } from "react";
import { useSelector } from "react-redux";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Hello from "./Components/Hello";
import Name from "./Components/Name";
import Chat from "./Components/Chat";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
	let logg = useSelector((state) => state.auth.userInfo);
	return (
		<Router>
			<Switch>
				<Route path="/signup">
					<SignUp />
				</Route>
				<Route path="/nickname">
					<Name />
				</Route>
				<Route path="/signin">
					<SignIn />
				</Route>
				<Route path="/welcome">
					<Hello />
				</Route>
				<Route path="/chat">
					<Chat />
				</Route>
				<Route path="/">
					<SignUp></SignUp>
				</Route>
			</Switch>
		</Router>
	);
}
export default App;
