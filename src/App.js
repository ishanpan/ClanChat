import { Fragment } from "react";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { useSelector } from "react-redux";
import Welcome from "./Components/Welcome";
import Name from "./Components/Name";

function App() {
	let logg = useSelector((state) => state.auth.userInfo);
	return (
		<Fragment>
			<Welcome nickname={logg}></Welcome>
		</Fragment>
	);
}
export default App;
