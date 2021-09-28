import { Fragment } from "react";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { useSelector } from "react-redux";
import Welcome from "./Components/Welcome";
import Name from "./Components/Name";
import Chat from "./Components/Chat";

//Work on storing chats to firebase then later migrate it to a backend

function App() {
	let logg = useSelector((state) => state.auth.loggedin);
	return (
		<Fragment>
			<Chat></Chat>
		</Fragment>
	);
}
export default App;
