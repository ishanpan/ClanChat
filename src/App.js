import { Fragment } from "react";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { useSelector } from "react-redux";
import Welcome from "./Components/Welcome";
function App() {
	let logg = useSelector((state) => state.auth.loggedin);
	return (
		<Fragment>
			{!logg && <SignIn />}
			{logg && <Welcome />}
		</Fragment>
	);
}
export default App;
