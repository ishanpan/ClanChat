import { Fragment } from "react";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { useSelector } from "react-redux";
import Welcome from "./Components/Welcome";
import Name from "./Components/Name";
function App() {
	let logg = useSelector((state) => state.auth.loggedin);
	return (
		<Fragment>
			<Name></Name>
		</Fragment>
	);
}
export default App;
